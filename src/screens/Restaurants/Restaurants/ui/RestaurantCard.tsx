import { Restaurant, useGetRestaurantByIDQuery } from 'api';
import { touchableConfig, getDistanceToPlace, getHours } from 'helpers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Icon } from 'ui';
import { CarouselAsset } from './CarourelAsset';
import { CarouselPhoto } from './CarouselPhoto';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (contentId: string) => void;
}

const StyledButton = styled.TouchableOpacity`
  margin: 0px 16px 10px;
`;

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onPress,
}) => {
  const { t } = useTranslation();

  const { content, placeDetails } = restaurant;

  const { data: details } = useGetRestaurantByIDQuery(placeDetails?.place_id);

  const hours = getHours(details?.opening_hours);

  const distance = getDistanceToPlace(restaurant?.distance);

  const photos = details?.photos?.map((photo) => photo.photo_reference);

  const assets = content?.assets?.map((asset) => asset.filename);

  return (
    <StyledButton {...touchableConfig} onPress={onPress}>
      <Box fd="row" br="10px" ai="center" bw="1px" bc={Colors.basic_400} bgc={Colors.basic_100}>
        <Box w="100px" h="100px">
          {assets?.length ? (
            <CarouselAsset reference={assets[0]} />
          ) : (
            <CarouselPhoto reference={photos?.[0] || ''} />
          )}
        </Box>

        <Box f={1} p={[0, 12]}>
          <Text fnw="500" ff={FontFamily.PoppinsSemiMedium}>{content?.title}</Text>

          <Box m={[4, 0]} fd="row" ai="center">
            <Icon name="star" size={16} color={Colors.warning_600} />

            <Text
              ml={6}
              fs={13}
              color={Colors.tabBarInactiveTintColor}
              ff={FontFamily.PoppinsMedium}
            >
              {`${details?.rating || 0} ${`(${details?.user_ratings_total || 0} ${t('home.reviews')})`}`}
            </Text>
          </Box>

          <Box fd="row">
            {!!hours && (
              <Text fs={13} ff={FontFamily.PoppinsMedium} color={Colors.basic_700}>{hours}</Text>
            )}

            {!!restaurant?.distance && (
              <Text fs={13} color={Colors.basic_600}>{`${hours ? '  •  ' : ''}${distance}`}</Text>
            )}
          </Box>
        </Box>
      </Box>
    </StyledButton>
  );
};
