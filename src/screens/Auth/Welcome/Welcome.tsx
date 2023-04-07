import { AnyType } from 'helpers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import Lottie from 'lottie-react-native';
import { Animations, Box } from 'themes';
import { Dimensions } from 'react-native';
import { Button, StatusBar } from 'ui';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const StyledAnimation = styled(Lottie as AnyType)`
  width: ${width}px;
  height: ${height}px;
  align-self: center;
`;

const Navigation = styled(Box)`
  position: absolute;
  bottom: 60px;
`;

const BUTTON_WIDTH = (width - 60) / 2;

export const Welcome: React.FC = () => {
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  return (
    <Box f={1} p={[10, 20, 0]}>
      <StatusBar />

      <StyledAnimation
        source={Animations.Third}
        loop={false}
        autoPlay={isFocused}
      />

      <Navigation m={[0, 20]} w="100%" fd="row" jc="space-between">
        <Box w={`${BUTTON_WIDTH}px`}>
          <Button
            type="border"
            title={t('buttons.sign-in').toUpperCase()}
            onPress={() => RouteService.navigate(Routes.SIGN_IN)}
          />
        </Box>

        <Box w={`${BUTTON_WIDTH}px`}>
          <Button
            title={t('buttons.register').toUpperCase()}
            onPress={() => RouteService.navigate(Routes.SIGN_UP)}
          />
        </Box>
      </Navigation>
    </Box>
  );
};
