import { useGetPosts } from 'hooks';
import React, { useCallback, useState } from 'react';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Loader, StatusBar } from 'ui';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { PostCard, EmptyState, FeaturedPosts } from './ui';

const ITEM_HEIGHT = 620;

export const Posts: React.FC = () => {
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  const [isMuted, setIsMuted] = useState(true);

  const [focusedIndex, setFocusedIndex] = useState(0);

  const safe = useSafeAreaInsets();

  const { results } = useGetPosts();

  const handleScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset: { y } } = nativeEvent;

    const offset = Math.round(y / ITEM_HEIGHT);

    setFocusedIndex(Math.abs(offset || 0));
  }, [setFocusedIndex]);

  return (
    <Box f={1} bgc={Colors.basic_150} pt={safe.top || 10}>
      <StatusBar />

      <FlashList
        data={results}
        keyExtractor={({ uuid }) => uuid}
        onScroll={handleScroll}
        estimatedItemSize={ITEM_HEIGHT}
        ListHeaderComponent={(
          <>
            <FeaturedPosts />

            <Text
              fnw="600"
              ff={FontFamily.PoppinsSemiMedium}
              m={[0, 16, 4]}
            >
              {t('posts.browse-all')}
            </Text>
          </>
          )}
        ListEmptyComponent={!results.length ? (
          <EmptyState />
        ) : (
          <Box f={1} ai="center" jc="center">
            <Loader color={Colors.primary_500} size="large" />
          </Box>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: post, index }) => (
          <PostCard
            {...post}
            isMuted={isMuted}
            isAutoPlay={isFocused && focusedIndex === index}
            onChangeVolume={() => setIsMuted(!isMuted)}
          />
        )}
      />
    </Box>
  );
};
