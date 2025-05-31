import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Share your moments',
    description: 'Share your favorite moments with the community',
    image: require('@/assets/images/onboarding-1.png'),
  },
  {
    id: 2,
    title: 'Your photos are secure and stored on sui blockchain',
    description: 'Your photos are securely stored on tusky in sui blockchain',
    image: require('@/assets/images/onboarding-2.png'),
  },
  {
    id: 3,
    title: 'Connect with community',
    description: 'Join the community of photographers',
    image: require('@/assets/images/onboarding-3.png'),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      router.replace('/login');
    } else {
      carouselRef.current?.next();
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      carouselRef.current?.prev();
    }
  };

  const renderItem = ({ item }: { item: typeof slides[number] }) => (
    <View style={styles.slide}>
      <Image 
        source={item.image} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop={false}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        data={slides}
        renderItem={renderItem}
        onSnapToItem={setActiveIndex}
      />

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity 
          style={[styles.navButton, activeIndex === 0 && styles.navButtonDisabled]} 
          onPress={handlePrev}
          disabled={activeIndex === 0}
        >
          <ChevronLeft size={24} color={activeIndex === 0 ? Colors.light.border : Colors.light.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton} 
          onPress={handleNext}
        >
          <ChevronRight size={24} color={Colors.light.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
    width: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
}); 