import { AnyType, getGooglePhoto } from 'helpers';
import React from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

interface CarouselPhotoProps {
  reference: string;
}

const { width } = Dimensions.get('window');

const StyledImage = styled(FastImage as AnyType)`
  width: ${width}px;
  height: 300px;
`;

export const CarouselPhoto: React.FC<CarouselPhotoProps> = ({ reference }) => {
  const source = { uri: getGooglePhoto(reference) };

  return (
    <StyledImage source={source} />
  );
};
