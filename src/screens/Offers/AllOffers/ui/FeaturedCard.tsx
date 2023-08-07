/* eslint-disable camelcase */
import { Offer, OfferType } from 'api';
import dayjs from 'dayjs';
import { AnyType, isImage } from 'helpers';
import { useGetOfferByUID } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

interface FeaturedCardProps {
  isFirst: boolean;
  offer: Offer;
  onPress: () => void;
}

const { width } = Dimensions.get('window');

const StyledImage = styled(FastImage as AnyType)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

const StyledVideo = styled(Video as AnyType)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  isFirst, offer, onPress,
}) => {
  const { t } = useTranslation();

  const {
    assets, offer_type, end_date, title, subtitle,
  } = offer.content;

  const { photos } = offer.placeDetails;

  const source = assets?.[0]?.filename || `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photos?.[0].photo_reference}&maxwidth=500&key=${Config.GOOGLE_API_KEY}`;

  const isVideo = !isImage(source);

  const isVoucher = offer_type === OfferType.VOUCHER;

  const { totalEntries } = useGetOfferByUID(offer.uuid);

  const diff = dayjs(end_date).diff(dayjs(), 'hours');

  const days = Math.floor(diff / 24);

  return (
    <TouchableOpacity onPress={onPress}>
      <Box m={[10, 16, 0, isFirst ? 16 : 0]} br="8px" h="100px" w={`${width - 48}px`}>
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

        <Box f={1} z={1} bgc={Colors.basic_transparent_80} br="8px" p={16}>
          <Text numberOfLines={2} fs={18} lh={24} fnw="500" ff={FontFamily.PoppinsSemiMedium} color={Colors.basic_100}>{title}</Text>

          <Box fd="row" ai="center">
            {!isVoucher && !!totalEntries && (
              <Box h="20px" p={[0, 8]} mr={8} ai="center" jc="center" br="20px" bgc={Colors.primary_100}>
                <Text fnw="500" ff={FontFamily.PoppinsSemiMedium} lh={14} fs={10} color={Colors.primary_500}>{t('offers.total-entries', { totalEntries })}</Text>
              </Box>
            )}

            <Text fs={12} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_100}>
              {isVoucher ? subtitle : t('offers.closes-in', { days })}
            </Text>
          </Box>
        </Box>

      </Box>
    </TouchableOpacity>
  );
};
