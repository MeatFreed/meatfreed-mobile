import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

interface RaffleTitleProps {
  title?: string;
  subtitle?: string;
  totalEntries: number;
  isHideEntries?: boolean;
}

export const RaffleTitle: React.FC<RaffleTitleProps> = ({
  title, totalEntries, subtitle, isHideEntries = false,
}) => {
  const { t } = useTranslation();

  const description = subtitle || t('offers.draw-closes');

  return (
    <Box p={[16, 16, 0]}>
      <Text fs={20} color={Colors.basic_800} fnw="700" ff={FontFamily.PoppinsBold}>{title}</Text>

      <Box mt={10} fd="row" ai="center" jc="space-between">
        <Text fs={13} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_600}>
          {description}
        </Text>

        {!isHideEntries && (
          <Box p={[4, 8]} br="20px" bgc={Colors.primary_100}>
            <Text fnw="500" ff={FontFamily.PoppinsSemiMedium} fs={10} color={Colors.primary_500}>{t('offers.total-entries', { totalEntries })}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
