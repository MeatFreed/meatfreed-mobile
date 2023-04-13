import { Offer } from 'api';
import React from 'react';
import {
  Box, Colors, FontFamily, Images, Text,
} from 'themes';
import { AnyType, touchableConfig } from 'helpers';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';

interface GlobalOfferCardProps {
  offer: Offer;
  onPress?: () => void;
}

const StyledImage = styled(FastImage as AnyType)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const GlobalOfferCard: React.FC<GlobalOfferCardProps> = ({ offer, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity {...touchableConfig} onPress={onPress}>
      <Box p={[4, 16, 8]} fd="row">
        <StyledImage source={Images.Logo} resizeMode={FastImage.resizeMode.contain} />

        <Box jc="center" ml={16} f={1}>
          <Text fs={18} fnw="600" ff={FontFamily.DMSansMedium} color={Colors.basic_800}>{offer.description}</Text>

          {offer.expires && (
            <Text>{t('offers.valid', { expires: offer.expires })}</Text>
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
