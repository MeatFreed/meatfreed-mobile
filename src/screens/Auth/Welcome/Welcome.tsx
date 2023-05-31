import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, FontFamily, Images, Text,
} from 'themes';
import { StatusBar } from 'ui';
import { AnyType, hasNotch } from 'helpers';
import Gradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { WelcomeProp } from 'navigation';
import { Dimensions, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { Socials } from './ui';

const { width } = Dimensions.get('window');

const Navigation = styled(Box)`
  bottom: 0px;
  position: absolute;
  left: 0px;
`;

const StyledTopGradient = styled(Gradient as AnyType)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 8px;
  width: 100%;
  height: 140px;
  z-index: 1;
`;

const StyledBottomGradient = styled(Gradient as AnyType)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 140px;
  z-index: 1;
`;

export const Welcome: React.FC = () => {
  const { t } = useTranslation();

  const { params } = useRoute<WelcomeProp>();

  return (
    <Box f={1} bgc={Colors.primary_500}>
      <StatusBar />

      <Box f={1} ai="center">
        <ImageBackground style={{ width, height: width }} source={Images.WelcomeBackground}>

          <StyledTopGradient
            colors={['#714ED8', 'rgba(113, 78, 216, .01)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.9 }}
          />

          <Box ai="center" jc="space-between" m={[hasNotch ? 60 : 90, 0, 0]} style={{ zIndex: 2 }}>
            <Box mt={50}>
              <Images.WelcomeInfo width={hasNotch ? width : width / 1.5} />
            </Box>
          </Box>

          <StyledBottomGradient
            colors={['#714ED8', 'rgba(113, 78, 216, .01)']}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 0, y: 0 }}
          />
        </ImageBackground>

      </Box>

      <Navigation ai="center" jc="center">
        <Text fs={34} fnw="bold" ff={FontFamily.PoppinsBold} lh={44} color={Colors.basic_100} ta="center" m={[0, 32, 8]}>{t('welcome.title')}</Text>

        <Text lh={24} fs={18} color={Colors.basic_100} ta="center" m={[0, 32]}>{t('welcome.description')}</Text>

        <Socials referralCode={params?.code} />
      </Navigation>
    </Box>
  );
};
