import { AnyType } from 'helpers';
import React from 'react';
import styled from 'styled-components/native';
import { Colors, FontFamily, Text } from 'themes';

interface ActionProps {
  Icon: AnyType;
  title: string;
  onPress?: () => void;
}

const StyledButton = styled.TouchableOpacity`
  height: 55px;
  width: 100%;
  border-radius: 8px;
  margin-top: 10px;
  border: 1px solid ${Colors.basic_400};
  background-color: ${Colors.basic_100};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Action: React.FC<ActionProps> = ({
  Icon, title, onPress,
}) => (
  <StyledButton
    onPress={onPress}
  >
    {Icon || null}

    <Text m={[2, 0, 0, 10]} ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>{title}</Text>
  </StyledButton>
);
