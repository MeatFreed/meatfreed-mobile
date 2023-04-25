import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { Box, Images } from 'themes';
import { Dimensions } from 'react-native';
import { Button, StatusBar } from 'ui';
import { RouteService } from 'services';
import { Routes } from 'navigation';

const { width } = Dimensions.get('window');

const Navigation = styled(Box)`
  position: absolute;
  bottom: 60px;
`;

const BUTTON_WIDTH = (width - 60) / 2;

export const Welcome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box f={1} p={[10, 20, 0]}>
      <StatusBar />

      <Box f={1} ai="center" jc="center" mb={100}>
        <Images.LogoMain />
      </Box>

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
