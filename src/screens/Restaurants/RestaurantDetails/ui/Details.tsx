import React from 'react';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Icon } from 'ui';
import { PriceLevel } from './PriceLevel';

interface DetailsProps {
  name?: string;
  rating?: number;
  totalRatings?: number;
  level?: number;
}

const StyledLayout = styled(Box)`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const Details: React.FC<DetailsProps> = ({
  name = '', rating = 0, totalRatings = 0, level,
}) => (
  <StyledLayout mt={-8} p={[16, 16, 0]} bgc={Colors.basic_100}>
    <Text fs={20} color={Colors.basic_800} fnw="700" ff={FontFamily.PoppinsBold}>{name}</Text>

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
