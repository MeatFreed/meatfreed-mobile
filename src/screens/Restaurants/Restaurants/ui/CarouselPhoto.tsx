import { AnyType } from 'helpers';
import React from 'react';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

interface CarouselPhotoProps {
  reference: string;
}

const { GOOGLE_API_KEY } = Config;

const StyledImage = styled(FastImage as AnyType)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const CarouselPhoto: React.FC<CarouselPhotoProps> = ({ reference }) => {
  const source = { uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${reference}&maxwidth=500&key=${GOOGLE_API_KEY}` };

  return (
    <StyledImage source={source} resizeMode={FastImage.resizeMode.stretch} />
  );
};
