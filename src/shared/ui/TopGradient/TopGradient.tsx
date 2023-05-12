import { AnyType } from 'helpers';
import React from 'react';
import Gradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

const StyledTopGradient = styled(Gradient as AnyType)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 8px;
  width: 100%;
  height: 140px;
  z-index: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const TopGradient: React.FC = () => (
  <StyledTopGradient
    colors={['rgba(0, 0, 0, .5)', 'rgba(0, 0, 0, .2)', 'rgba(0, 0, 0, .01)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 0.9 }}
    locations={[0, 0.7, 0.9]}
  />
);
