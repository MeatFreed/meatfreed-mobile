/* eslint-disable camelcase */
import { OfferCard as Card, OfferType } from 'api';
import dayjs from 'dayjs';
import hexToRgba from 'hex-to-rgba';
import { AnyType, parseToLocalTime } from 'helpers';
import { useGetNotificationActions, useGetOfferByUID } from 'hooks';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import { useTypedSelector } from 'stores';
import { notificationsSelectors } from 'stores/notifications';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Images, Text,
} from 'themes';

interface OfferCardProps extends Card {
  onPress: () => void;
}

const StyledImage = styled(FastImage as AnyType)`
  width: 98px;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: ${hexToRgba(Colors.primary_500, 0.33)};
`;

const Badge = styled(Box)`
  position: absolute;
  right: 15px;
  top: 15px;
`;

export const OfferCard: React.FC<OfferCardProps> = ({
  assets, offer_type, end_date, title, subtitle, photos, onPress, uuid,
}) => {
  const notifications = useTypedSelector(notificationsSelectors.notifications);

  const source = assets?.[0]?.filename || `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photos?.[0].photo_reference}&maxwidth=500&key=${Config.GOOGLE_API_KEY}`;

  const isVoucher = offer_type === OfferType.VOUCHER;

  const { isWonOffer, isPendingOffer } = useGetOfferByUID(uuid);

  const dayDiff = Math.max(parseToLocalTime(end_date).diff(dayjs(), 'days', true), 0);

  const days = Math.floor(dayDiff);

  const { onReadNotification } = useGetNotificationActions();

  const notification = notifications.find((notification) => notification.orderId === uuid);

  const navigateToOfferDetails = () => {
    onPress();

    if (notification) {
      onReadNotification(notification.uuid);
    }
  };

  return (
    <Box m={[0, 16, 10]}>
      <TouchableOpacity onPress={navigateToOfferDetails}>
        {notification && <Badge bgc={Colors.primary_500} h="10px" w="10px" br="100px" z={1000} />}

        <Box fd="row" br="10px" ai="center" bw={notification ? '2px' : '1px'} bc={notification ? Colors.primary_500 : Colors.basic_400} bgc={Colors.basic_100}>
          <Box w="98px" h="100px">
            {source && (
              <StyledImage
                source={{ uri: source }}
                resizeMode={FastImage.resizeMode.stretch}
              />
            )}
          </Box>

          <Box f={1} p={[10]} jc="center">
            <Text fs={16} mr={20} fnw="700" numberOfLines={2} ff={FontFamily.PoppinsSemiMedium} color={Colors.basic_800}>{title}</Text>

            <Box w="auto">
              {!isVoucher && isWonOffer && (
                <Box mt={4} ai="center" fd="row" br="100px" p={[2, 8]} bgc={Colors.primary_150}>
                  <Images.Winner />

                  <Text ml={4} fs={11} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.primary_500}>You’re a winner!</Text>
                </Box>
              )}

              {!isVoucher && isPendingOffer && (
                <Box mt={4} fd="row" ai="center">
                  <Box ai="center" fd="row" br="100px" p={[2, 8]} bgc={Colors.primary_150}>
                    <Images.Pending />

                    <Text ml={4} fs={11} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.primary_500}>Raffle Entered</Text>
                  </Box>

                  <Text ml={8} fs={11} color={Colors.basic_600}>{days ? `Results in ${days} days` : 'Results will available soon'}</Text>
                </Box>
              )}

              {isVoucher && (
                <Text fs={13} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_600}>{subtitle}</Text>
              )}
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};
