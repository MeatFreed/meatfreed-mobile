import { useWindowDimensions } from '@lumitech/mobile-hooks';
import { useFacebook, useGoogle, useApple } from 'hooks';
import React from 'react';
import { isIOS } from 'helpers';
import {
  Box, Colors, FontFamily, Images, Spaces, Text,
} from 'themes';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Dimensions, TouchableOpacity } from 'react-native';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import { ActivityIndicator } from 'ui';

const { width } = Dimensions.get('window');

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

interface SocialsProps {
  referralCode?: string;
}

export const Socials: React.FC<SocialsProps> = ({ referralCode = '' }) => {
  const { t } = useTranslation();

  const { onFacebookSignIn, isLoading: isFacebookLoading } = useFacebook();
  const { onGoogleSignIn, isLoading: isGoogleLoading } = useGoogle();
  const { onAppleSignIn, isLoading: isAppleLoading } = useApple();

  const isLoading = isFacebookLoading || isGoogleLoading || isAppleLoading;

  const { width } = useWindowDimensions();

  return (
    <Box ai="center" w={`${width}px`} p={[Spaces.xl, 16]}>
      <ActivityIndicator isVisible={isLoading} />

      <Box ai="center" jc="center" w={`${width - Spaces['7xl']}px`}>
        <StyledButton isWhite onPress={() => onGoogleSignIn(referralCode)}>
          <Images.Google width={Spaces.xl} height={Spaces.xl} />

          <Box f={1} ai="center">
            <Text fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>{t('buttons.google')}</Text>
          </Box>
        </StyledButton>

        {isIOS && (
          <StyledButton isWhite onPress={() => onAppleSignIn(referralCode)}>
            <Images.Apple width={Spaces.xl} height={Spaces.xl} />

            <Box f={1} ai="center">
              <Text fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>{t('buttons.apple')}</Text>
            </Box>
          </StyledButton>
        )}

        <StyledButton isWhite onPress={() => onFacebookSignIn(referralCode)}>
          <Images.Facebook width={Spaces.xl} height={Spaces.xl} color={Colors.white} />

          <Box f={1} ai="center">
            <Text fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>{t('buttons.facebook')}</Text>
          </Box>
        </StyledButton>

        <StyledButton
          isWhite={false}
          onPress={() => RouteService.navigate(Routes.SIGN_UP, { code: referralCode })}
        >
          <Images.Email width={Spaces.xl} height={Spaces.xl} color={Colors.white} />

          <Box f={1} ai="center">
            <Text fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>{t('buttons.email')}</Text>
          </Box>
        </StyledButton>

        <Box fd="row">
          <Text color={Colors.basic_100}>{t('welcome.has-account')}</Text>

          <TouchableOpacity
            onPress={() => RouteService.navigate(Routes.SIGN_IN)}
          >
            <Text fnw="500" ttd="underline" ttds="solid" ttdc={Colors.basic_100} ff={FontFamily.PoppinsMedium} color={Colors.basic_100}>{t('buttons.login')}</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};
