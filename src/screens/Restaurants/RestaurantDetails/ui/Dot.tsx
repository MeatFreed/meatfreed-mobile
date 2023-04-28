import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from 'themes';

interface DotProps {
  isActive: boolean;
}

export const Dot: React.FC<DotProps> = ({ isActive }) => {
  const animationColor = useSharedValue(0);

  const colorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      animationColor.value,
      [0, 1],
      [Colors.basic_reversed_48, Colors.basic_100],
    );

    return {
      backgroundColor: withTiming(color, {
        duration: 500,
      }),
    };
  });

  useEffect(() => {
    animationColor.value = isActive ? 1 : 0;
  }, [isActive]);

  return (
    <Animated.View style={[styles.layout, colorStyle]} />
  );
};

const styles = StyleSheet.create({
  layout: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2.5,
    backgroundColor: Colors.basic_100,
  },
});
