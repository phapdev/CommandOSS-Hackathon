import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ArrowLeft, Info, Share2 } from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showShare?: boolean;
  showInfo?: boolean;
  onShare?: () => void;
  onInfo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  showShare = false,
  showInfo = false,
  onShare,
  onInfo,
}) => {
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
            <ArrowLeft size={24} color={Colors.light.text} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {showInfo && (
          <TouchableOpacity onPress={onInfo} style={styles.iconButton}>
            <Info size={22} color={Colors.light.text} />
          </TouchableOpacity>
        )}
        
        {showShare && (
          <TouchableOpacity onPress={onShare} style={styles.iconButton}>
            <Share2 size={22} color={Colors.light.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.light.background,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      },
    }),
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'center',
  },
  iconButton: {
    padding: 8,
  },
});