import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  interpolate,
} from 'react-native-reanimated';
import RNCarousel from 'react-native-reanimated-carousel';
import { Box } from 'themes';
import { CarouselRenderItem } from 'react-native-reanimated-carousel/lib/typescript/types';
import { CarouselPhoto } from './CarouselPhoto';
import { Pagination } from './Pagination';
import { CarouselAsset } from './CarourelAsset';

interface CarouselProps {
  photos?: string[]
  assets?: string[];
  hasAssets?: boolean;
}

const { width } = Dimensions.get('window');

export const Carousel: React.FC<CarouselProps> = ({
  photos = [],
  assets = [],
  hasAssets = false,
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

  const renderItem: CarouselRenderItem<string> = useCallback(({ item: photo }) => {
    if (hasAssets) {
      return <CarouselAsset reference={photo} />;
    }

    return <CarouselPhoto reference={photo} />;
  }, [hasAssets]);

  const steps = hasAssets ? assets.length : photos.length;

  const hasPagination = steps > 1;

  return (
    <Box h="300px" ai="center">
      <RNCarousel
        loop={hasPagination}
        autoPlayInterval={5000}
        style={{ width, height: 300 }}
        width={width}
        autoPlay={hasPagination}
        enabled={hasPagination}
        data={hasAssets ? assets : photos}
        onSnapToItem={(index: number) => setActiveIndex(index)}
        renderItem={renderItem}
        customAnimation={animationStyle}
        scrollAnimationDuration={1200}
      />

      {hasPagination && <Pagination steps={steps} activeIndex={activeIndex} /> }
    </Box>
  );
};
