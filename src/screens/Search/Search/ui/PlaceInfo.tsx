/* eslint-disable camelcase */
import dayjs from 'dayjs';
import { AnyType, touchableConfig } from 'helpers';
import React, { useState } from 'react';
import { Rating } from 'react-native-ratings';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Images, Text,
} from 'themes';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'ui';

interface PlaceInfoProps {
  placeId: string;
  rating?: number;
  name: string;
  userRatingsTotal?: number;
  weekdays?: string[];
  onOpen: () => void;
}

const StyledImage = styled(FastImage as AnyType)`
  width: 60px;
  height: 60px;
`;

const StyledButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const Direction = styled(FastImage as AnyType)`
  width: 17px;
  height: 17px;
`;

const today = dayjs().day() - 1;

export const PlaceInfo: React.FC<PlaceInfoProps> = ({
  placeId,
  name,
  rating = 0,
  weekdays = [],
  userRatingsTotal = 0,
  onOpen,
}) => {
  const [isShowSchedule, setIsShoSchedule] = useState(false);

  const { t } = useTranslation();

  return (
    <Box fd="row">
      <StyledImage
        source={{
          uri: `https://meatfreeds3.s3.eu-west-2.amazonaws.com/restaurant+logos/${placeId}.png`,
        }}
      />

      <Box ml={16} f={1}>
        <Text fnw="bold" ff={FontFamily.PoppinsBold} color={Colors.basic_800}>{name}</Text>

        <Box ai="center" f={1} jc="space-between" fd="row">
          <Box ai="center" fd="row">
            <Text color={Colors.warning_600} mt={4}>{rating || 0}</Text>

            <Rating
              style={{
                alignSelf: 'flex-start',
                marginTop: 6,
                left: 5,
              }}
              startingValue={rating}
              ratingCount={5}
              imageSize={16}
            />

            <Text fs={16} m={[4, 0, 0, 12]} color={Colors.warning_600}>{`(${userRatingsTotal})`}</Text>
          </Box>

          <StyledButton {...touchableConfig} onPress={onOpen}>
            <Box w="30px" h="30px" br="15px" bgc={Colors.dark} ai="center" jc="center">
              <Direction
                source={Images.Direction}
                resizeMode={FastImage.resizeMode.contain}
              />
            </Box>

            <Text fs={12} mt={8}>{t('search.directions')}</Text>
          </StyledButton>
        </Box>

        <Box mt={10} />

        {weekdays?.length && (
          <TouchableOpacity
            {...touchableConfig}
            onPress={() => setIsShoSchedule(!isShowSchedule)}
          >
            <Box fd="row">
              <Box>
                {!isShowSchedule && (
                <Text mb={8} fs={12} color={Colors.basic_800}>
                  {weekdays[today]}
                </Text>
                )}

                {isShowSchedule && weekdays.map((day) => (
                  <Text mb={8} fs={12} color={Colors.basic_800} key={day}>{day}</Text>
                ))}
              </Box>

              <Icon name={isShowSchedule ? 'chevron-up' : 'chevron-down'} style={{ marginTop: -5 }} size={24} color={Colors.basic_800} />
            </Box>
          </TouchableOpacity>
        )}
      </Box>

    </Box>
  );
};
