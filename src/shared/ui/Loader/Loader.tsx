import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { Colors } from 'themes';

const LoaderContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

interface LoaderProps {
  color?: string;
  size?: 'small' | 'large';
}

export const Loader: React.FC<LoaderProps> = ({ color = Colors.purple, size = 'small' }) => (
  <LoaderContainer>
    <ActivityIndicator color={color} size={size} />
  </LoaderContainer>
);
