import React from 'react';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Box, Colors, FontFamily, Text, shadow,
} from 'themes';
import { AnyType } from 'helpers';

interface UserInfoProps {
  photoURL?: string;
  name?: string;
  email?: string;
}

const Picture = styled(Box)`
  position: absolute;
  top: 15px;
  left: -10px;
  zIndex: 999;
  border-radius: 5px;
  margin: 0px 2px;
`;

const Meat = styled(Box)`
  position: absolute;
  bottom: -10px;
  right: -10px;
`;

const StyledGradient = styled(LinearGradient as AnyType)<{mt: string}>`
  marginTop: ${({ mt }) => mt};
  border-radius: 14px;
  padding: 20px;
  ${shadow};
`;

export const UserInfo: React.FC<UserInfoProps> = ({ photoURL = '', email = '', name = '' }) => {
  const { t } = useTranslation();

  return (
    <Box>
      {photoURL && (
      <Picture>
        <FastImage
          source={{ uri: photoURL }}
          style={{
            width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.basic_200,
          }}
        />

        <Meat ai="center" jc="center" br="20px" bgc={Colors.basic_100} w="40px" h="40px" shadowed>
          <Text fs={10} color={Colors.purple} fnw="700">{'meat\nfread'}</Text>
        </Meat>
      </Picture>
      )}

      <StyledGradient
        mt={photoURL ? '56px' : '10px'}
        locations={[0.46, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[Colors.gradient_100, Colors.gradient_200]}
      >
        <Box>
          <Box ai="center">
            <Text fnw="bold" color={Colors.basic_100}>{t('offers.member')}</Text>
            <Text mt={4} fs={12} fnw="500" color={Colors.basic_100}>{t('offers.status', { tier: 'Tier 4' })}</Text>
          </Box>

          {name && (
            <Box fd="row" ai="center" jc="flex-start">
              <Text fs={12} mb={-1} color={Colors.basic_100}>{`${t('labels.name')}: `}</Text>
              <Text fs={13} fnw="600" ff={FontFamily.PoppinsMedium} color={Colors.basic_100}>{name}</Text>
            </Box>
          )}

          {email && (
            <Box mt={4} fd="row" ai="center" jc="flex-start">
              <Text fs={12} mb={-1} color={Colors.basic_100}>{`${t('labels.email')}: `}</Text>
              <Text fs={13} fnw="600" ff={FontFamily.PoppinsMedium} color={Colors.basic_100}>{email}</Text>
            </Box>
          )}
        </Box>
      </StyledGradient>
    </Box>
  );
};
