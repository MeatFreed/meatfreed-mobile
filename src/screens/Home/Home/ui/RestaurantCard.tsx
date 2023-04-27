import { Restaurant, useGetRestaurantByIDQuery } from 'api';
import dayjs from 'dayjs';
import { AnyType } from 'helpers';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Icon } from 'ui';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const StyledImage = styled(FastImage as AnyType)`
  width: 100px;
  height: 100px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const today = dayjs().day() - 1;

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
}) => {
  const { t } = useTranslation();

  const { data: details } = useGetRestaurantByIDQuery(restaurant.place_id);

  const date = useMemo(() => (
    details?.opening_hours?.weekday_text?.[today]?.split(': ')
  ), [details?.opening_hours?.weekday_text]);

  return (
    <Box fd="row" br="10px" mb={10} bw="1px" bc={Colors.basic_400} bgc={Colors.basic_100}>
      <StyledImage
        source={{
          uri: `https://meatfreeds3.s3.eu-west-2.amazonaws.com/restaurant+logos/${restaurant.place_id}.png`,
        }}
        resizeMode="stretch"
      />

      <Box f={1} p={[16, 12]}>
        <Text fnw="500" ff={FontFamily.PoppinsSemiMedium}>{details?.name}</Text>

        <Box m={[4, 0]} fd="row" ai="center">
          <Icon name="star" size={16} color={Colors.warning_600} />

          <Text ml={6} fs={13} color={Colors.tabBarInactiveTintColor} ff={FontFamily.PoppinsMedium}>
            {`${details?.rating || 0} ${`(${details?.user_ratings_total || 0} ${t('home.reviews')})`}`}
          </Text>
        </Box>

        {!!date?.[1] && (
          <Text fs={13} ff={FontFamily.PoppinsMedium} color={Colors.basic_600}>
            {`${t('home.today')} ${date?.[1]}`}
          </Text>
        )}
      </Box>
    </Box>
  );
};
