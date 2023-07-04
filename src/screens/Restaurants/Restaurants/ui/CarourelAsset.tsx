import { AnyType, isImage } from 'helpers';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import styled from 'styled-components/native';

interface CarouselAssetProps {
  reference: string;
}

const StyledImage = styled(FastImage as AnyType)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const StyledVideo = styled(Video as AnyType)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const CarouselAsset: React.FC<CarouselAssetProps> = ({ reference }) => {
  const isVideo = !isImage(reference);

  if (isVideo) {
    return (
      <StyledVideo
        controls
        source={{ uri: reference }}
        poster={reference}
        posterResizeMode={FastImage.resizeMode.stretch}
      />
    );
  }

  return (
    <StyledImage source={{ uri: reference }} resizeMode={FastImage.resizeMode.stretch} />
  );
};
