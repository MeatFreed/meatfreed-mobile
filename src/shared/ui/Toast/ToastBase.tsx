import React, { FC } from 'react';
import { Dimensions } from 'react-native';
import { ToastService } from 'services';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, shadow, Text, Spaces,
} from 'themes';
import { Icon } from 'ui';
import type { ToastTypes } from './ToastMessage';

interface ToastBaseProps {
  type: ToastTypes;
  title?: string;
}

const { width } = Dimensions.get('window');

const iconNames = {
  success: 'checkmark',
  danger: 'alert-triangle',
  warning: 'info',
  info: 'info',
};

const colorNames = {
  success: Colors.success_600,
  danger: Colors.danger_600,
  warning: Colors.warning_600,
  info: Colors.info_600,
};

const ToastLayout = styled.View`
  width: ${width - 24}px;
  min-height: 48px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.white};
  ${{ shadow }};
`;

const StyledButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

const StyledLine = styled(Box)`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const ToastBase: FC<ToastBaseProps> = ({ type, title }) => (
  <ToastLayout>
    <StyledLine w="8px" h="100%" bgc={colorNames[type] as string} />

    <Box f={1} fd="row" ai="center" p={[Spaces['2xs'], 0, Spaces['2xs'], 12]}>
      <Box mr={14}>
        <Icon name={iconNames[type] as string} size={20} color={colorNames[type] as string} />
      </Box>

      <Box f={1}>
        {!!title && (
          <Text
            ff={FontFamily.PoppinsRegular}
            fs={16}
            color={Colors.basic_800}
          >
            {title}
          </Text>
        )}
      </Box>

      <StyledButton onPress={ToastService.onHide}>
        <Icon name="close" size={20} color={Colors.basic_800} />
      </StyledButton>
    </Box>
  </ToastLayout>
);
