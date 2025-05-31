import { Button } from '@/components/ui/Button';
import { LogoText } from '@/components/ui/LogoText';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Wallet } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();

  const handleConnect = () => {
    // TODO: Implement wallet connection
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* <Image 
            source={require('@/assets/images/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          /> */}
          <LogoText size="large" color={Colors.light.text} />
          <Text style={styles.subtitle}>Share your moments on Sui</Text>
        </View>

        <View style={styles.form}>
          <Button
            title="Connect Wallet"
            onPress={handleConnect}
            style={styles.connectButton}
            icon={<Wallet size={20} color="#FFFFFF" />}
          />
          {/* <SlushWalletConnect onConnect={handleConnect} /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textLight,
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    marginBottom: 40,
  },
  connectButton: {
    backgroundColor: Colors.light.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
}); 