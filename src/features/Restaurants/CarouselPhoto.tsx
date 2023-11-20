import { AnyType, getGooglePhoto } from 'helpers';
import hexToRgba from 'hex-to-rgba';
import React from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { Colors } from 'themes';

interface CarouselPhotoProps {
  reference: string;
}

const StyledImage = styled(FastImage as AnyType)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: ${hexToRgba(Colors.primary_500, 0.33)};
`;

export const CarouselPhoto: React.FC<CarouselPhotoProps> = ({ reference }) => {
  const source = { uri: getGooglePhoto(reference) };

  return (
    <StyledImage source={source} resizeMode={FastImage.resizeMode.stretch} />
  );
};
