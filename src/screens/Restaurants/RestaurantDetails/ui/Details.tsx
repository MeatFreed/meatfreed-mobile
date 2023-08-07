import React from 'react';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Icon } from 'ui';
import { Restaurant } from 'api';
import { useGetRestaurantFavoriteActions } from 'hooks';
import { PriceLevel } from './PriceLevel';

interface DetailsProps {
  name?: string;
  rating?: number;
  totalRatings?: number;
  level?: number;
  restaurant: Restaurant;
}

const StyledLayout = styled(Box)`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const StyledButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export const Details: React.FC<DetailsProps> = ({
  name = '', rating = 0, totalRatings = 0, level, restaurant,
}) => {
  const { isAlreadyFavorite, onRestaurantFavorite } = useGetRestaurantFavoriteActions(restaurant);

  return (
    <StyledLayout mt={-8} p={[16, 16, 0]} bgc={Colors.basic_100}>
      <Box fd="row" ai="flex-start" jc="space-between">
        <Text fs={20} color={Colors.basic_800} fnw="700" ff={FontFamily.PoppinsBold}>{name}</Text>

        <StyledButton onPress={onRestaurantFavorite}>
          <Icon size={24} color={isAlreadyFavorite ? Colors.primary_500 : Colors.basic_800} name={isAlreadyFavorite ? 'heart' : 'heart-outline'} />
        </StyledButton>
      </Box>

      <Box m={[4, 0]} fd="row" ai="center">

        <Box fd="row" ai="center">
          <Icon name="star" size={16} color={Colors.warning_600} />

          <Text
            ml={6}
            fs={13}
            color={Colors.tabBarInactiveTintColor}
            ff={FontFamily.PoppinsMedium}
          >
            <Text fs={13} color={Colors.tabBarInactiveTintColor} fnw="500" ff={FontFamily.PoppinsSemiMedium}>{rating}</Text>

            <Text fs={13} color={Colors.tabBarInactiveTintColor}>{` (${totalRatings})`}</Text>
          </Text>
        </Box>

        {!!level && <PriceLevel level={level} />}
      </Box>

      <Box mt={16} w="100%" h="1px" bgc={Colors.basic_400} />
    </StyledLayout>
  );
};
