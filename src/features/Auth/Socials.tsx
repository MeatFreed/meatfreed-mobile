/* eslint-disable no-console */
import { useWindowDimensions } from '@lumitech/mobile-hooks';
import { useFacebook, useGoogle, useApple } from 'hooks';
import React from 'react';
import {
  hasNotch, isIOS, touchableConfig,
} from 'helpers';
import {
  Box, Colors, Images, socialShadow, Spaces,
} from 'themes';
import styled from 'styled-components/native';

const StyledButton = styled.TouchableOpacity`
  width: ${Spaces['3xl']}px;
  height: ${Spaces['3xl']}px;
  margin: 0px ${Spaces.md}px
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.basic_100};
  ${socialShadow}
`;

interface SocialsProps {
  referralCode?: string;
}

export const Socials: React.FC<SocialsProps> = ({ referralCode = '' }) => {
  const { onFacebookSignIn } = useFacebook();
  const { onGoogleSignIn } = useGoogle();
  const { onAppleSignIn } = useApple();

  const { width } = useWindowDimensions();

  return (
    <Box ai="center" m={[Spaces.xl, 0, hasNotch ? 0 : Spaces.md]}>
      <Box fd="row" ai="center" jc="center" w={`${width - Spaces['7xl']}px`}>
        <StyledButton {...touchableConfig} onPress={() => onGoogleSignIn(referralCode)}>
          <Images.Google width={Spaces.xl} height={Spaces.xl} />
        </StyledButton>

        {isIOS && (
          <StyledButton {...touchableConfig} onPress={() => onAppleSignIn(referralCode)}>
            <Images.Apple width={Spaces.xl} height={Spaces.xl} />
          </StyledButton>
        )}

        <StyledButton {...touchableConfig} onPress={() => onFacebookSignIn(referralCode)}>
          <Images.Facebook width={Spaces['3xl']} height={Spaces['3xl']} color={Colors.white} />
        </StyledButton>
      </Box>
    </Box>
  );
};
