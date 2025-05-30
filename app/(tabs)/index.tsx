import { EmptyState } from '@/components/EmptyState';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { PhotoCard } from '@/components/PhotoCard';
import { Colors } from '@/constants/Colors';
import { usePhotos } from '@/hooks/usePhotos';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const { photos, loading, error, fetchPhotos } = usePhotos();
  const [refreshing, setRefreshing] = React.useState(false);
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPhotos();
    setRefreshing(false);
  };
  
  const handleCapture = () => {
    // router.push('/capture');
    alert('capture');
  };
  
  const renderEmptyState = () => {
    if (loading) return <LoadingIndicator fullScreen message="Loading your photos..." />;
    
    return (
      <EmptyState
        title="No Photos Yet"
        description="Capture your first photo with SuiSnap to create immutable evidence on the blockchain."
        buttonText="Take a Photo"
        onButtonPress={handleCapture}
        imageUrl="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop"
      />
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>SuiSnap</Text>
        <Text style={styles.subtitle}>Immutable Photo Evidence</Text>
      </View>
      
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PhotoCard photo={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.light.primary]}
            tintColor={Colors.light.primary}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textLight,
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
    flexGrow: 1,
  },
});