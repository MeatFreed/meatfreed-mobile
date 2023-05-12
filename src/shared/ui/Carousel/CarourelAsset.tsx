import { AnyType, isImage } from 'helpers';
import React from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import styled from 'styled-components/native';

interface CarouselAssetProps {
  reference: string;
}

const { width } = Dimensions.get('window');

const StyledImage = styled(FastImage as AnyType)`
  width: ${width}px;
  height: 300px;
`;

const StyledVideo = styled(Video as AnyType)`
  width: ${width}px;
  height: 300px;
`;

export const CarouselAsset: React.FC<CarouselAssetProps> = ({ reference }) => {
  const isVideo = !isImage(reference);

  if (isVideo) {
    return (
      <StyledVideo
        controls
        source={{ uri: reference }}
        poster={reference}
        posterResizeMode={FastImage.resizeMode.cover}
      />
    );
  }

  return (
    <StyledImage source={{ uri: reference }} resizeMode={FastImage.resizeMode.cover} />
  );
};
