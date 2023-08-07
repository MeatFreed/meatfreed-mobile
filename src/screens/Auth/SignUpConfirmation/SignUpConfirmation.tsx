import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, FontFamily, Images, Spaces, Text,
} from 'themes';
import { Icon, StatusBar } from 'ui';
import { AnyType } from 'helpers';
import Gradient from 'react-native-linear-gradient';
import { Dimensions, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { RouteService } from 'services';
import { Routes } from 'navigation';

const { width } = Dimensions.get('window');

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

const Navigation = styled(Box)`
  bottom: 20px;
  position: absolute;
  left: 0px;
`;

const StyledButton = styled.TouchableOpacity<{ isWhite?: boolean; }>`
  width: ${width - 32}px;
  height: 48px;
  margin: 0px ${Spaces.md}px 16px;
  padding: 0px ${Spaces.xl}px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ isWhite }) => (isWhite ? Colors.basic_100 : Colors.pink)};
`;

export const SignUpConfirmation: React.FC = () => {
  const { t } = useTranslation();
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

          <Box ai="center" jc="space-between" m={[width / 2, 0, 0]} style={{ zIndex: 2 }}>
            <Box mt={50}>
              <Images.SignUpConfirm width={width} />
            </Box>
          </Box>

          <StyledBottomGradient
            colors={['#714ED8', 'rgba(113, 78, 216, .01)']}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 0, y: 0 }}
          />
        </ImageBackground>

        <Navigation ai="center" jc="center">
          <StyledButton
            isWhite={false}
            onPress={() => RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR)}
          >
            <Box f={1} ai="center">
              <Text fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>{t('buttons.continue')}</Text>
            </Box>

            <Icon name="arrow-forward" size={20} color={Colors.basic_800} />
          </StyledButton>
        </Navigation>
      </Box>
    </Box>
  );
};
