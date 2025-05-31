import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SlushWalletConnectProps {
  onConnect?: () => void;
}

const SlushWalletConnect: React.FC<SlushWalletConnectProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      
      // Tạo URL để mở ví Slush với các tham số cần thiết
      const params = new URLSearchParams({
        action: 'connect',
        appName: 'SuiSnap',
        callback: 'myapp://wallet/callback'
      });
      
      const url = `slush://`;
      
      // Kiểm tra xem có thể mở URL không
      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        // Mở ví Slush
        const result = await WebBrowser.openAuthSessionAsync(url, 'myapp://wallet/callback');
        
        if (result.type === 'success') {
          // Xử lý kết quả từ ví Slush
          const { url: responseUrl } = result;
          const responseParams = new URLSearchParams(responseUrl.split('?')[1]);
          
          const address = responseParams.get('address');
          const status = responseParams.get('status');
          
          if (status === 'success' && address && onConnect) {
            onConnect();
            Alert.alert('Thành công', 'Đã kết nối với ví Slush thành công!');
          } else {
            Alert.alert('Lỗi', 'Không thể kết nối với ví Slush. Vui lòng thử lại.');
          }
        } else {
          Alert.alert('Hủy', 'Đã hủy kết nối với ví Slush.');
        }
      } else {
        Alert.alert(
          'Lỗi',
          'Không thể mở ví Slush. Vui lòng đảm bảo đã cài đặt ứng dụng Slush trên thiết bị của bạn.',
          [
            {
              text: 'Cài đặt Slush',
              onPress: () => {
                // Mở App Store hoặc Play Store để cài đặt Slush
                const storeUrl = Platform.select({
                  ios: 'https://apps.apple.com/app/slush-wallet/id123456789',
                  android: 'https://play.google.com/store/apps/details?id=com.slush.wallet'
                });
                if (storeUrl) {
                  Linking.openURL(storeUrl);
                }
              }
            },
            {
              text: 'Đóng',
              style: 'cancel'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Lỗi khi kết nối với ví Slush:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi kết nối với ví Slush. Vui lòng thử lại.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, isConnecting && styles.buttonDisabled]} 
        onPress={handleConnect}
        disabled={isConnecting}
      >
        <Text style={styles.buttonText}>
          {isConnecting ? 'Đang kết nối...' : 'Kết nối với ví Slush'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999999',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SlushWalletConnect; 