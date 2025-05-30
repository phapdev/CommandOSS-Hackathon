import { Colors } from '@/constants/Colors';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

interface CaptureButtonProps {
  onPress: () => void;
  isRecording?: boolean;
}

export const CaptureButton: React.FC<CaptureButtonProps> = ({ 
  onPress, 
  isRecording = false 
}) => {

  const animation = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      animation.setValue(0);
    }
  }, [isRecording]);
  
  const outerRingStyle = {
    borderColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.light.primary, Colors.light.error],
    }),
  };
  
  const innerCircleStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.light.primary, Colors.light.error],
    }),
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.8],
        }),
      },
    ],
  };
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={[styles.outerRing, outerRingStyle]}>
        <Animated.View style={[styles.innerCircle, innerCircleStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.primary,
  },
});