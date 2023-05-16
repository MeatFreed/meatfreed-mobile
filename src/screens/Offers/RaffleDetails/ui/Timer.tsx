import { useGetRaffleTimer } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

interface TimerProps {
  endDate: string;
}

const { width } = Dimensions.get('window');

const ITEM_WIDTH = (width - 48) / 4;

export const Timer: React.FC<TimerProps> = ({ endDate }) => {
  const { t } = useTranslation();

  const { time } = useGetRaffleTimer(endDate);

  if (!time) {
    return null;
  }

  return (
    <Box fd="row" m={[10, 16, 0]} jc="space-between">
      <Box ai="center" jc="center" h="90px" w={`${ITEM_WIDTH}px`} br="16px" bgc={Colors.primary_100}>
        <Text lh={32} fs={32} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.primary_500}>{time.days()}</Text>

        <Text color={Colors.primary_500} fnw="500" ff={FontFamily.PoppinsMedium} mt={-4}>{t('offers.days')}</Text>
      </Box>

      <Box ai="center" jc="center" h="90px" w={`${ITEM_WIDTH}px`} br="16px" bgc={Colors.primary_100}>
        <Text lh={32} fs={32} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.primary_500}>{time.hours()}</Text>

        <Text color={Colors.primary_500} fnw="500" ff={FontFamily.PoppinsMedium} mt={-4}>{t('offers.hrs')}</Text>
      </Box>

      <Box ai="center" jc="center" h="90px" w={`${ITEM_WIDTH}px`} br="16px" bgc={Colors.primary_100}>
        <Text lh={32} fs={32} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.primary_500}>{time.minutes()}</Text>

        <Text color={Colors.primary_500} fnw="500" ff={FontFamily.PoppinsMedium} mt={-4}>{t('offers.mins')}</Text>
      </Box>

      <Box ai="center" jc="center" h="90px" w={`${ITEM_WIDTH}px`} br="16px" bgc={Colors.primary_100}>
        <Text lh={32} fs={32} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.primary_500}>{time.seconds()}</Text>

        <Text color={Colors.primary_500} fnw="500" ff={FontFamily.PoppinsMedium} mt={-4}>{t('offers.secs')}</Text>
      </Box>
    </Box>
  );
};
