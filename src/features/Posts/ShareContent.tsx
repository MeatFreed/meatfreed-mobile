import React from 'react';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { touchableConfig } from 'helpers';
import { Colors } from 'themes';
import { useSharePostLink } from 'hooks';

const StyledButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

interface ShareContentProps {
  contentId: string;
  title: string;
  color?: string;
}

export const ShareContent: React.FC<ShareContentProps> = ({
  contentId, title, color = Colors.basic_100,
}) => {
  const { onShareLink } = useSharePostLink();

  return (
    <StyledButton {...touchableConfig} onPress={() => onShareLink(contentId, title)}>
      <FontAwesome size={18} name="send" color={color} />
    </StyledButton>
  );
};
