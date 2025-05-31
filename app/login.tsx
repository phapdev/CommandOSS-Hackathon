import { Button } from '@/components/ui/Button';
import { LogoText } from '@/components/ui/LogoText';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ArrowDown } from "lucide-react-native";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
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
          <Text style={styles.subtitle}>Share your moments</Text>
        </View>

        <View style={styles.form}>
          <Button
            title="Login with Google"
            onPress={handleGoogleLogin}
            style={styles.googleButton}
            icon={
            //   <Image 
            //     source={require('@/assets/images/google-icon.png')} 
            //     style={styles.googleIcon}
            //   />
            <ArrowDown />
            }
          />
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
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.light.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
}); 