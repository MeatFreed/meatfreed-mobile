import { FirebasePost } from 'api';
import { AnyType, touchableConfig } from 'helpers';
import React from 'react';
import styled from 'styled-components/native';
import Video from 'react-native-video';
import { BlurView } from '@react-native-community/blur';
import {
  Box, Colors, FontFamily, FontSizes, Spaces, Text, shadow,
} from 'themes';
import { Dimensions } from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import { Icon } from 'ui';
import { Routes } from 'navigation';
import { RouteService } from 'services';

const { width } = Dimensions.get('window');

const VIDEO_HEIGHT = width / 2;

const { POST_ASSET_URL } = Config;

interface FirebasePostCardProps {
  post: FirebasePost;
}

const StyledButton = styled.TouchableOpacity`
  background-color: ${Colors.primary_light};
  border-radius: 24px;
  ${shadow};
`;

const StyledVideo = styled(Video as AnyType)`
  width: 100%;
  height: ${VIDEO_HEIGHT}px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

const StyledImage = styled(FastImage as AnyType)`
  width: 100%;
  height: ${VIDEO_HEIGHT}px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

const Title = styled(Box)`
  width: 100%;
  min-height: 60px;
  overflow: hidden;
  position: absolute;
  z-index: 9999;
  bottom: 0px;
`;

const StyledBlur = styled(BlurView)`
  width: 100%;
  padding: 8px 0px;
  flex-direction: row;
  position: absolute;
  z-index: 9999;
  bottom: 0px;
  background-color: ${Colors.basic_transparent_24};
`;

const Layout = styled(Box)`
  border-radius: 24px;
  overflow: hidden;
`;

export const FirebasePostCard: React.FC<FirebasePostCardProps> = ({ post }) => (
  <Box p={[8, 16]}>
    <StyledButton
      {...touchableConfig}
      onPress={() => RouteService.navigate(Routes.POST_DETAILS, { contentId: post.uid })}
    >
      <Layout>
        <Box>
          {post?.video && (
            <StyledVideo
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

          {post.title && (
            <Title>
              <StyledBlur>
                <Box p={[0, 12]} f={1} fd="row" ai="center">
                  <Box f={1}>
                    <Text mr={8} numberOfLines={2} fnw="700" ff={FontFamily.PoppinsMedium} color={Colors.basic_100}>{post.title}</Text>
                  </Box>

                  <Icon name="arrow-forward" size={24} color={Colors.white} />
                </Box>
              </StyledBlur>
            </Title>
          )}
        </Box>

        {post.subtitle && (
          <Box bgc={Colors.basic_100} fd="row" ai="center" p={[Spaces.sm, 0]}>
            <Text numberOfLines={1} w={`${width - 100}px`} ml={Spaces.sm} fs={FontSizes.xs} color={Colors.basic_600}>
              {post.subtitle}
            </Text>
          </Box>
        )}
      </Layout>
    </StyledButton>
  </Box>
);
