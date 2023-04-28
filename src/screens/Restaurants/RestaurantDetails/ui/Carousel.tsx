import { RestaurantPhoto } from 'api';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import {
  interpolate,
} from 'react-native-reanimated';
import RNCarousel from 'react-native-reanimated-carousel';
import { Box } from 'themes';
import { CarouselItem } from './CarouselItem';
import { Pagination } from './Pagination';

interface CarouselProps {
  photos?: RestaurantPhoto[]
}

const { width } = Dimensions.get('window');

export const Carousel: React.FC<CarouselProps> = ({
  photos = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const animationStyle = React.useCallback(
    (value: number) => {
      'worklet';

      const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
      const translateX = interpolate(
        value,
        [-2, 0, 1],
        [-width, 0, width],
      );

      return {
        transform: [{ translateX }],
        zIndex,
      };
    },
    [],
  );

  return (
    <Box h="300px" ai="center">
      <RNCarousel
        loop
        style={{ width, height: 300 }}
        width={width}
        data={photos}
        onSnapToItem={(index: number) => setActiveIndex(index)}
        renderItem={({ item: photo }) => (
          <CarouselItem
            reference={photo.photo_reference}
          />
        )}
        customAnimation={animationStyle}
        scrollAnimationDuration={1200}
      />

      <Pagination steps={photos.length} activeIndex={activeIndex} />
    </Box>
  );
};
