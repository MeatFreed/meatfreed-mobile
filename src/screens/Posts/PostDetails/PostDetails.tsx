import { AnyType, isImage } from 'helpers';
import React from 'react';
import styled from 'styled-components/native';
import Video from 'react-native-video';
import {
  Box, Colors, FontFamily, FontSizes, Text,
} from 'themes';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PostDetailsProp } from 'navigation';
import { ActivityIndicator, StatusBar } from 'ui';
import { useGetPostByUID } from 'hooks';
import FastImage from 'react-native-fast-image';
import { Emoji, ShareContent } from 'features';
import { useTypedSelector } from 'stores';
import Gradient from 'react-native-linear-gradient';
import { userSelectors } from 'stores/user';

const VIDEO_HEIGHT = 620;

const StyledVideo = styled(Video as AnyType)`
  width: 100%;
  height: ${VIDEO_HEIGHT}px;
`;

const StyledImage = styled(FastImage as AnyType)`
  width: 100%;
  height: ${VIDEO_HEIGHT}px;
`;

const StyledTopGradient = styled(Gradient as AnyType)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 8px;
  width: 100%;
  height: 140px;
  z-index: 2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const PostDetails: React.FC = () => {
  const { params } = useRoute<PostDetailsProp>();

  const { post } = useGetPostByUID(params.contentId);

  const userId = useTypedSelector(userSelectors.userId);

  if (!post) {
    return <ActivityIndicator isVisible />;
  }

  const { content } = post;

  return (
    <>
      <StatusBar />

      <StyledTopGradient
        colors={['rgba(0, 0, 0, .5)', 'rgba(0, 0, 0, .2)', 'rgba(0, 0, 0, .01)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.9 }}
        locations={[0, 0.7, 0.9]}
      />

      <Box f={1} bgc={Colors.basic_100}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {content?.assets?.[0].filename && !isImage(content?.assets?.[0].filename) && (
            <StyledVideo
              controls
              repeat
              resizeMode="cover"
              source={{ uri: content?.assets?.[0].filename }}
              poster={content?.assets?.[0].filename}
              posterResizeMode="cover"
            />
          )}

          {content?.assets?.[0].filename && isImage(content?.assets?.[0].filename) && (
            <StyledImage resizeMode="cover" source={{ uri: content?.assets?.[0].filename }} />
          )}

          {!content?.assets?.length && <StyledImage resizeMode="cover" source={{ uri: 'https://iili.io/HOckdkg.png' }} />}

          <Box ai="center" fd="row" p={[8, 12]}>
            <Emoji contentId={params.contentId} color={Colors.basic_600} />

            {userId && (
              <ShareContent
                title={content.title}
                contentId={params.contentId}
                color={Colors.basic_600}
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
    </>

  );
};
