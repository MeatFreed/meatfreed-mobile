import { Restaurant, useGetRestaurantByIDQuery } from 'api';
import { getDistanceToPlace, getHours } from 'helpers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Icon } from 'ui';
import hexToRgba from 'hex-to-rgba';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { useGetRestaurantFavoriteActions } from 'hooks';
import { CarouselAsset } from './CarouselAsset';
import { CarouselPhoto } from './CarouselPhoto';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (contentId: string) => void;
}

const StyledButton = styled.TouchableOpacity`
  margin: 0px 16px 10px;
`;

const StyledFavorite = styled.TouchableOpacity<{ isActive: boolean }>`
  position: absolute;
  z-index: 9999;
  left: 5px;
  top: 5px;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${({ isActive }) => (isActive ? hexToRgba(Colors.primary_500, 0.9) : hexToRgba(Colors.basic_500, 0.9))};
`;

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onPress,
}) => {
  const { t } = useTranslation();

  const userId = useTypedSelector(userSelectors.userId);

  const { content, placeDetails } = restaurant;

  const { data: details } = useGetRestaurantByIDQuery(placeDetails?.place_id, {
    skip: !placeDetails?.place_id,
  });

  const { isAlreadyFavorite, onRestaurantFavorite } = useGetRestaurantFavoriteActions(restaurant);

  const hours = getHours(details?.opening_hours);

  const distance = getDistanceToPlace(restaurant?.distance);

  const detailsPhoto = details?.photos || placeDetails.photos;

  const photos = detailsPhoto?.map((photo) => photo.photo_reference);

  const assets = content?.assets?.map((asset) => asset.filename);

  const rating = details?.rating || placeDetails?.rating || 0;
  const totalRating = details?.user_ratings_total || placeDetails?.user_ratings_total || 0;

  return (
    <StyledButton onPress={onPress}>
      <Box fd="row" br="10px" ai="center" bw="1px" bc={Colors.basic_400} bgc={Colors.basic_100}>
        <Box w="100px" h="100px">
          {!!userId && (
            <StyledFavorite isActive={isAlreadyFavorite} onPress={onRestaurantFavorite}>
              <Icon size={20} color={isAlreadyFavorite ? Colors.basic_550 : Colors.basic_100} name={isAlreadyFavorite ? 'heart' : 'heart-outline'} />
            </StyledFavorite>
          )}

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
              {`${rating} ${`(${totalRating} ${t('home.reviews')})`}`}
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
