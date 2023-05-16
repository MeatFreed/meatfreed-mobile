/* eslint-disable camelcase */
import { Offer, OfferType } from 'api';
import {
  AnyType, getBasicDateFormat, isImage, touchableConfig,
} from 'helpers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

interface OfferCardProps {
  offer: Offer;
  onPress: () => void;
}

const StyledImage = styled(FastImage as AnyType)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const StyledVideo = styled(Video as AnyType)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const OfferCard: React.FC<OfferCardProps> = ({ offer, onPress }) => {
  const { t } = useTranslation();

  const {
    assets, offer_type, end_date, title,
  } = offer.content;

  const { photos } = offer.placeDetails;

  const source = assets?.[0]?.filename || `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photos?.[0].photo_reference}&maxwidth=500&key=${Config.GOOGLE_API_KEY}`;

  const isVideo = !isImage(source);

  const isVoucher = offer_type === OfferType.VOUCHER;

  return (
    <Box m={[0, 16, 10]}>
      <TouchableOpacity {...touchableConfig} onPress={onPress}>
        <Box fd="row" br="10px" ai="center" bw="1px" bc={Colors.basic_400} bgc={Colors.basic_100}>
          <Box w="100px" h="100px">
            {isVideo ? (
              <StyledVideo
                controls={false}
                paused
                source={{ uri: source }}
                poster={source}
                posterResizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <StyledImage
                source={{ uri: source }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          </Box>

          <Box f={1} p={[10]} jc="center">
            <Text fs={16} fnw="700" ff={FontFamily.PoppinsSemiMedium} color={Colors.basic_800}>{title}</Text>

            <Text fs={13} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_600}>
              {isVoucher ? t('offers.can-redeemed-once') : t('offers.draw-closes-in', { date: getBasicDateFormat(end_date) })}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};
