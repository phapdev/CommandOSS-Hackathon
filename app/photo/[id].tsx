import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { Calendar, Check, Cloud, ExternalLink, MapPin } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Linking, Platform, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoadingIndicator } from '@/components/LoadingIndicator';
import { Map } from '@/components/capture/Map';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Colors } from '@/constants/Colors';
import { Photo } from '@/types';
import { verifyOnBlockchain } from '@/utils/blockchain';
import { getPhotoById } from '@/utils/storage';

export default function PhotoDetailScreen() {
  const { id } = useLocalSearchParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  
  useEffect(() => {
    const loadPhoto = async () => {
      if (typeof id !== 'string') return;
      
      try {
        setLoading(true);
        const photoData = await getPhotoById(id);
        setPhoto(photoData);
      } catch (error) {
        console.error('Error loading photo:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPhoto();
  }, [id]);
  
  const handleShare = async () => {
    if (!photo) return;
    
    try {
      const message = `Check out this verified photo: ${photo.caption}\n\nTimestamp: ${new Date(photo.timestamp).toLocaleString()}\n\nVerified on blockchain: ${photo.transactionHash}`;
      
      await Share.share({
        message,
        url: photo.uri,
        title: 'SnapProof Verified Photo',
      });
    } catch (error) {
      console.error('Error sharing photo:', error);
    }
  };
  
  const handleVerify = async () => {
    if (!photo || !photo.transactionHash) return;
    
    try {
      setVerifying(true);
      const isVerified = await verifyOnBlockchain(photo.transactionHash);
      
      if (isVerified) {
        // In a real app, we would update the photo in storage
        setPhoto(prev => prev ? { ...prev, verified: true } : null);
      }
    } catch (error) {
      console.error('Error verifying photo:', error);
    } finally {
      setVerifying(false);
    }
  };
  
  const handleViewOnBlockchain = () => {
    if (!photo || !photo.transactionHash) return;
    
    // In a real app, this would open the transaction on a blockchain explorer
    const url = `https://explorer.sui.io/txblock/${photo.transactionHash}`;
    Linking.openURL(url);
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Photo Details" />
        <LoadingIndicator fullScreen message="Loading photo details..." />
      </SafeAreaView>
    );
  }
  
  if (!photo) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Photo Details" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Photo not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header 
        title="Photo Details" 
        showShare 
        onShare={handleShare}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: photo.uri }}
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>{photo.caption}</Text>
          
          {photo.verified && (
            <View style={styles.verifiedBadge}>
              <Check size={14} color="#FFFFFF" />
              <Text style={styles.verifiedText}>Verified on Blockchain</Text>
            </View>
          )}
        </View>
        
        <View style={styles.metadataContainer}>
          <View style={styles.metadataItem}>
            <Calendar size={18} color={Colors.light.text} />
            <Text style={styles.metadataText}>{formatDate(photo.timestamp)}</Text>
          </View>
          
          {photo.location && (
            <>
              <View style={styles.metadataItem}>
                <MapPin size={18} color={Colors.light.text} />
                <Text style={styles.metadataText}>
                  {photo.location.address || `${photo.location.latitude.toFixed(6)}, ${photo.location.longitude.toFixed(6)}`}
                </Text>
              </View>
              
              <Map 
                latitude={photo.location.latitude} 
                longitude={photo.location.longitude}
                height={180}
                interactive
              />
            </>
          )}
          
          {photo.weather && (
            <View style={styles.metadataItem}>
              <Cloud size={18} color={Colors.light.text} />
              <Text style={styles.metadataText}>
                {photo.weather.condition}
                {photo.weather.temperature !== undefined && `, ${photo.weather.temperature}°C`}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.blockchainContainer}>
          <Text style={styles.blockchainTitle}>Blockchain Information</Text>
          
          {photo.ipfsHash && (
            <View style={styles.blockchainItem}>
              <Text style={styles.blockchainLabel}>IPFS Hash:</Text>
              <Text style={styles.blockchainValue} selectable>{photo.ipfsHash}</Text>
            </View>
          )}
          
          {photo.transactionHash && (
            <View style={styles.blockchainItem}>
              <Text style={styles.blockchainLabel}>Transaction Hash:</Text>
              <Text style={styles.blockchainValue} selectable>{photo.transactionHash}</Text>
            </View>
          )}
          
          <View style={styles.buttonContainer}>
            {photo.transactionHash && !photo.verified && (
              <Button
                title="Verify on Blockchain"
                onPress={handleVerify}
                loading={verifying}
                style={styles.verifyButton}
              />
            )}
            
            {photo.transactionHash && (
              <Button
                title="View on Explorer"
                onPress={handleViewOnBlockchain}
                variant="outline"
                icon={<ExternalLink size={16} color={Colors.light.primary} />}
                style={styles.explorerButton}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 330,
    borderRadius: 36,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  captionContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 8,
  },
  caption: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    flex: 1,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.success,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  metadataContainer: {
    marginTop: 24,
    gap: 16,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metadataText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  blockchainContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
  },
  blockchainTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  blockchainItem: {
    marginBottom: 12,
  },
  blockchainLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  blockchainValue: {
    fontSize: 14,
    color: Colors.light.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  buttonContainer: {
    marginTop: 16,
    gap: 12,
  },
  verifyButton: {
    marginBottom: 8,
  },
  explorerButton: {},
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.light.text,
  },
});