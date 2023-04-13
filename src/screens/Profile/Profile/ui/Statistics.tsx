import { useWindowDimensions } from '@lumitech/mobile-hooks';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'stores';
import firestore from '@react-native-firebase/firestore';
import { Box, Colors } from 'themes';
import { userSelectors } from 'stores/user';
import { EventTypes } from 'helpers';
import { StatisticItem } from './StatisticItem';

export const Statistics: React.FC = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const isFocused = useIsFocused();

  const [values, setValues] = useState({
    shared: 0,
    members: 0,
  });

  const user = useTypedSelector(userSelectors.user);

  const getReferences = async () => {
    const [code, link] = await Promise.all([
      firestore().collection('events').where('userId', '==', user.uid).where('event', '==', EventTypes.REFERRAL_CODE_SHARED)
        .get(),
      firestore().collection('events').where('userId', '==', user.uid).where('event', '==', EventTypes.REFERRAL_LINK_SHARED)
        .get(),
    ]);

    setValues({
      shared: code.size + link.size,
      members: user.referralsCount,
    });
  };

  useEffect(() => {
    if (isFocused) {
      getReferences();
    }
  }, [isFocused]);

  return (
    <Box
      m={[24, 0]}
      fd="row"
      jc="space-between"
      ai="flex-start"
      w={`${width / 1.5}px`}
    >
      <StatisticItem color={Colors.primary_500} value={values.members} title={t('count.members')} />

      <StatisticItem color={Colors.info_600} value={values.shared} title={t('count.shared')} />
    </Box>
  );
};
