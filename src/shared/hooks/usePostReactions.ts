/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTypedSelector } from 'stores';
import firestore from '@react-native-firebase/firestore';
import { userSelectors } from 'stores/user';
import { useEffect, useState } from 'react';
import { PostReaction, adaptPostReaction } from 'api';
import { RouteService, ToastService } from 'services';
import { useTranslation } from 'react-i18next';
import { AnyType } from 'helpers';
import { Routes } from 'navigation';

export const usePostReactions = (contentId: string) => {
  const { t } = useTranslation();

  const [reactions, setReactions] = useState<PostReaction[]>([]);

  const userId = useTypedSelector(userSelectors.userId);

  const onAddReaction = async (id: string, content: string) => {
    if (!userId) {
      RouteService.navigate(Routes.WELCOME);

      return;
    }

    try {
      await firestore().collection('reactions').add({
        user_id: userId,
        content_id: contentId,
        reaction_type_id: id,
        reaction_content: content,
      });
    } catch (error: AnyType) {
      const message = error?.message?.split?.('] ');

      ToastService.onDanger({ title: message?.[1] || error?.message || t('errors.server-unable') });
    }
  };

  const onDeleteReaction = async (uid: string) => {
    if (!userId) {
      RouteService.navigate(Routes.WELCOME);

      return;
    }

    try {
      await firestore().collection('reactions').doc(uid).delete();
    } catch (error: AnyType) {
      const message = error?.message?.split?.('] ');

      ToastService.onDanger({ title: message?.[1] || error?.message || t('errors.server-unable') });
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('reactions')
      .where('content_id', '==', contentId)
      .onSnapshot((documentSnapshot) => {
        setReactions([...adaptPostReaction(documentSnapshot) as PostReaction[]]);
      });

    return () => subscriber();
  }, [contentId]);

  return {
    reactions,
    onAddReaction,
    onDeleteReaction,
  };
};
