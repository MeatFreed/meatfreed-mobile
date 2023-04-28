import { AnyType } from 'helpers';
import React from 'react';
import { Dimensions } from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

interface CarouselItemProps {
  reference: string;
}

const { width } = Dimensions.get('window');

const { GOOGLE_API_KEY } = Config;

const StyledImage = styled(FastImage as AnyType)`
  width: ${width}px;
  height: 300px;
`;

export const CarouselItem: React.FC<CarouselItemProps> = ({ reference }) => {
  const source = { uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${reference}&maxwidth=500&key=${GOOGLE_API_KEY}` };

  return (
    <StyledImage source={source} />
  );
};
