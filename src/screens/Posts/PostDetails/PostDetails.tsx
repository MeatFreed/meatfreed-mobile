import { AnyType, isDev, isImage } from 'helpers';
import React from 'react';
import styled from 'styled-components/native';
import Video from 'react-native-video';
import {
  Box, Colors, FontFamily, FontSizes, Text,
} from 'themes';
import { Dimensions, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PostDetailsProp } from 'navigation';
import { ActivityIndicator, StatusBar } from 'ui';
import { useGetPostByUID } from 'hooks';
import RenderHtml from 'react-native-render-html';
import FastImage from 'react-native-fast-image';
import { Emoji, ShareContent } from 'features';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import Config from 'react-native-config';

const { height } = Dimensions.get('window');

const { POST_ASSET_URL } = Config;

const VIDEO_HEIGHT = height / 3;

const StyledVideo = styled(Video as AnyType)`
  width: 100%;
  height: ${VIDEO_HEIGHT}px;
`;

const StyledImage = styled(FastImage as AnyType)`
  width: 100%;
  height: ${VIDEO_HEIGHT}px;
`;

export const PostDetails: React.FC = () => {
  const { params } = useRoute<PostDetailsProp>();

  const { post } = useGetPostByUID(params.contentId);

  const userId = useTypedSelector(userSelectors.userId);

  if (!post) {
    return <ActivityIndicator isVisible />;
  }

  if (isDev) {
    const { content } = post;

    return (
      <Box f={1} bgc={Colors.basic_100}>
        <StatusBar />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {content?.assets?.[0].filename && !isImage(content?.assets?.[0].filename) && (
            <StyledVideo
              controls
              paused
              resizeMode="cover"
              source={{ uri: content?.assets?.[0].filename }}
              poster="https://iili.io/HOckdkg.png"
              posterResizeMode="cover"
            />
          )}

          {content?.assets?.[0].filename && isImage(content?.assets?.[0].filename) && (
            <StyledImage resizeMode="cover" source={{ uri: content?.assets?.[0].filename }} />
          )}

          <Box ai="center" fd="row" p={[8, 12]}>
            <Emoji contentId={params.contentId} />

            {userId && (
              <ShareContent
                title={content.title}
                contentId={params.contentId}
              />
            )}
          </Box>

          <Box p={[16, 16, 0]}>
            {content.title && (
              <Text fs={FontSizes.lg} fnw="600" ff={FontFamily.PoppinsBold} color={Colors.basic_800}>{content.title}</Text>
            )}

            {content.description && (
              <Text mt={8} fs={FontSizes.sm} color={Colors.basic_600}>{content.description}</Text>
            )}
          </Box>
        </ScrollView>
      </Box>
    );
  }

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <StatusBar />
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
          />
        )}

        {post?.images?.length && (
          <StyledImage resizeMode="cover" source={{ uri: `${POST_ASSET_URL}${encodeURIComponent(post?.images?.[0])}` }} />
        )}

        <Box p={[16, 16, 0]}>
          {post.title && (
            <Text fs={FontSizes.xl} fnw="700" ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>{post.title}</Text>
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
