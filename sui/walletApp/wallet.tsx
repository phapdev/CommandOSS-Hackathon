import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SlushWalletConnect from './SlushWalletConnect';

export default function WalletScreen() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = (address: string) => {
    setWalletAddress(address);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kết nối ví</Text>
      
      {walletAddress ? (
        <View style={styles.connectedContainer}>
          <Text style={styles.connectedText}>Đã kết nối với ví Slush</Text>
          <Text style={styles.addressText}>{walletAddress}</Text>
        </View>
      ) : (
        <SlushWalletConnect onConnect={() => {}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  connectedContainer: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
  },
  connectedText: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
}); 