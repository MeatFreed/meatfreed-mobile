import { AnyType } from 'helpers';
import React from 'react';
import styled from 'styled-components/native';
import Video from 'react-native-video';
import {
  Box, Colors, FontFamily, FontSizes, Text,
} from 'themes';
import RenderHtml from 'react-native-render-html';
import { Dimensions, ScrollView } from 'react-native';
import Config from 'react-native-config';
import { useRoute } from '@react-navigation/native';
import { LearnDetailsProp } from 'navigation';
import { ActivityIndicator } from 'ui';
import { useGetMomentByUID } from 'hooks';

const { width } = Dimensions.get('window');

const VIDEO_HEIGHT = width / 2;

const { POST_ASSET_URL } = Config;

const StyledVideo = styled(Video as AnyType)`
  width: 100%;
  height: ${VIDEO_HEIGHT}px;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: ${VIDEO_HEIGHT}px;
`;

export const LearnDetails: React.FC = () => {
  const { params } = useRoute<LearnDetailsProp>();

  const { post, onUpdatePlayCount } = useGetMomentByUID(params.uid);

  if (!post) {
    return <ActivityIndicator isVisible />;
  }

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {post?.video && (
          <StyledVideo
            controls
            paused
            resizeMode="cover"
            source={{ uri: `${POST_ASSET_URL}${encodeURIComponent(post.video)}` }}
            poster="https://iili.io/HOckdkg.png"
            posterResizeMode="cover"
            onPlaybackStateChanged={({ isPlaying }: AnyType) => {
              if (isPlaying) {
                onUpdatePlayCount();
              }
            }}
          />
        )}

        {post?.images?.length && (
          <StyledImage resizeMode="cover" source={{ uri: `${POST_ASSET_URL}${encodeURIComponent(post?.images?.[0])}` }} />
        )}

        <Box p={[16, 16, 0]}>
          {post.title && (
            <Text fs={FontSizes.xl} fnw="700" ff={FontFamily.Bold} color={Colors.basic_800}>{post.title}</Text>
          )}

          {post.subtitle && (
            <Text mt={8} fs={FontSizes.sm} color={Colors.basic_600}>{post.subtitle}</Text>
          )}
        </Box>

        {post.body && (
          <Box p={[16, 16, 0]}>
            <RenderHtml
              contentWidth={Dimensions.get('window').width}
              source={{ html: post.body }}
              tagsStyles={{
                p: {
                  fontSize: FontSizes.sm,
                  color: Colors.basic_600,
                  marginVertical: 0,
                  marginTop: 8,
                },
              }}
            />
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};
