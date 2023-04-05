import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Colors, Text } from 'themes';
import { SearchBar } from 'ui';

export const Learn: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <Box bgc={Colors.basic_150} shadowed>
        <Text ta="center" p={[10, 0]} fs={14} color={Colors.watermelon}>{t('learn.description')}</Text>

        <Box m={[0, 25, 16]}>
          <SearchBar label={t('labels.restaurant')} placeholder={t('placeholders.search-restaurant')} />
        </Box>
      </Box>
    </Box>
  );
};
