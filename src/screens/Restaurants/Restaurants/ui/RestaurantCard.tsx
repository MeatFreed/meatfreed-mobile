import { Restaurant, useGetRestaurantByIDQuery } from 'api';
import {
  AnyType, touchableConfig, getDistanceToPlace, getHours,
} from 'helpers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Icon } from 'ui';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (contentId: string) => void;
}

const StyledButton = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

const StyledImage = styled(FastImage as AnyType)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onPress,
}) => {
  const { t } = useTranslation();

  const { content } = restaurant;

  const { data: details } = useGetRestaurantByIDQuery(restaurant?.placeDetails?.place_id);

  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const hours = getHours(details?.opening_hours);

  const distance = getDistanceToPlace(
    {
      latitude: Number(currentLocation?.latitude || 0),
      longitude: Number(currentLocation?.longitude || 0),
    },
    {
      latitude: Number(details?.geometry?.location?.lat),
      longitude: Number(details?.geometry?.location?.lng),
    },
  );

  return (
    <StyledButton {...touchableConfig} onPress={onPress}>
      <Box fd="row" br="10px" ai="center" bw="1px" bc={Colors.basic_400} bgc={Colors.basic_100}>
        <Box w="100px" h="100px">
          <StyledImage
            source={{
              uri: `https://meatfreeds3.s3.eu-west-2.amazonaws.com/restaurant+logos/${content.google_place_id}.png`,
            }}
            resizeMode="contain"
          />
        </Box>

        <Box f={1} p={[16, 12]}>
          <Text fnw="500" ff={FontFamily.PoppinsSemiMedium}>{details?.name}</Text>

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

            <Text fs={13} color={Colors.basic_600}>{`${hours ? '  •  ' : ''}${distance}`}</Text>
          </Box>
        </Box>
      </Box>
    </StyledButton>
  );
};
