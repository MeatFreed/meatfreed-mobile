import { Offer } from 'api';
import React, { useMemo } from 'react';
import {
  Box, Colors, FontFamily, Images, Text,
} from 'themes';
import { AnyType, touchableConfig } from 'helpers';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';

interface RegularOfferCardProps {
  offer: Offer;
  onPress?: () => void;
}

const StyledImage = styled(FastImage as AnyType)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const RegularOfferCard: React.FC<RegularOfferCardProps> = ({ offer, onPress }) => {
  const { t } = useTranslation();

  const source = useMemo(() => {
    if (offer?.place_id) {
      return {
        uri: `https://meatfreeds3.s3.eu-west-2.amazonaws.com/restaurant+logos/${offer.place_id}.png`,
      };
    }

    if (offer?.image) {
      return {
        uri: `https://meatfreeds3.s3.eu-west-2.amazonaws.com/global+offers/${offer.image}`,
      };
    }

    return Images.Logo;
  }, [offer]);

  return (
    <TouchableOpacity {...touchableConfig} onPress={onPress}>
      <Box p={[4, 16, 8]} fd="row">
        <StyledImage
          source={source}
          resizeMode={FastImage.resizeMode.contain}
        />

        {!offer?.place_id && !offer?.image}

        <Box jc="center" ml={16} f={1}>
          <Text fs={18} fnw="600" ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>{offer.description}</Text>

          {offer.expires && (
            <Text mt={8} color={Colors.purple} fs={12} fnw="500">{t('offers.valid', { expires: offer.expires })}</Text>
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
