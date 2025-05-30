import { Colors } from '@/constants/Colors';
import { Photo } from '@/types/index';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Calendar, Check, Cloud, MapPin, Share2 } from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PhotoCardProps {
  photo: Photo;
  onShare?: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onShare }) => {
  const router = useRouter();
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  const handlePress = () => {
    // router.push(`/photo/${photo.id}`);
    alert('photo');
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: photo.uri }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.caption}>{photo.caption}</Text>
          {photo.verified && (
            <View style={styles.verifiedBadge}>
              <Check size={12} color="#FFFFFF" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>
        
        <View style={styles.metadataContainer}>
          {photo.timestamp && (
            <View style={styles.metadataItem}>
              <Calendar size={14} color={Colors.light.textLight} />
              <Text style={styles.metadataText}>{formatDate(photo.timestamp)}</Text>
            </View>
          )}
          
          {photo.location && (
            <View style={styles.metadataItem}>
              <MapPin size={14} color={Colors.light.textLight} />
              <Text style={styles.metadataText} numberOfLines={1}>
                {photo.location.address || `${photo.location.latitude.toFixed(4)}, ${photo.location.longitude.toFixed(4)}`}
              </Text>
            </View>
          )}
          
          {photo.weather && photo.weather.condition && (
            <View style={styles.metadataItem}>
              <Cloud size={14} color={Colors.light.textLight} />
              <Text style={styles.metadataText}>
                {photo.weather.condition}
                {photo.weather.temperature !== undefined && `, ${photo.weather.temperature}°C`}
              </Text>
            </View>
          )}
        </View>
        
        {onShare && (
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Share2 size={16} color={Colors.light.primary} />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  image: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  caption: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    flex: 1,
    marginRight: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  metadataContainer: {
    gap: 8,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metadataText: {
    fontSize: 13,
    color: Colors.light.textLight,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    alignSelf: 'flex-end',
    gap: 4,
  },
  shareText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
  },
});