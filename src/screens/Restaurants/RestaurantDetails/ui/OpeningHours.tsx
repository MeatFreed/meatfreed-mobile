import { RestaurantOpeningHours } from 'api';
import dayjs from 'dayjs';
import { getHours, touchableConfig } from 'helpers';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Icon } from 'ui';

interface ActionProps {
  openingHours: RestaurantOpeningHours
}

const today = dayjs().day() - 1;

const StyledButton = styled.TouchableOpacity`
  padding: 16px 16px 0px;
`;

export const OpeningHours: React.FC<ActionProps> = ({ openingHours }) => {
  const { t } = useTranslation();

  const [isShowSchedule, setIsShowSchedule] = useState(false);

  const weekdays = openingHours?.weekday_text || [];

  const hours = getHours(openingHours);

  return (
    <StyledButton {...touchableConfig} onPress={() => setIsShowSchedule(!isShowSchedule)}>
      <Box fd="row" ai="center">
        <Icon name="open-hours" size={20} color={Colors.primary_500} />

        <Box f={1}>
          <Text ml={12} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>
            {hours}
          </Text>
        </Box>

        <Box>
          <Icon size={20} color={Colors.basic_800} name={isShowSchedule ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} />
        </Box>
      </Box>

      {isShowSchedule && (
        <Box m={[10, 0, 0, 32]} p={10} br="16px" bgc={Colors.weekday}>
          {weekdays.map((weekday, index) => {
            const data = weekday.split(': ');

            const isToday = index === today;

            return (
              <Box mb={16} fd="row" ai="center" jc="space-between">
                <Box fd="row" ai="center">
                  <Text fs={13} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>{data?.[0]}</Text>

                  {isToday && (
                    <Box ml={12} p={[2, 4]} bgc={Colors.basic_100} br="20px">
                      <Text fs={13} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.primary_500}>{t('restaurant-details.current-day')}</Text>
                    </Box>
                  )}
                </Box>

                <Text fs={13} fnw="500" ff={FontFamily.PoppinsMedium} color={isToday ? Colors.basic_700 : Colors.basic_600}>{data?.[1]}</Text>
              </Box>
            );
          })}
        </Box>
      )}

      <Box mt={16} w="100%" h="1px" bgc={Colors.basic_400} />
    </StyledButton>
  );
};
