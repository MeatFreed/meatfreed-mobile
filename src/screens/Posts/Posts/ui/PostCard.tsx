import { PostContent } from 'api';
import { AnyType, isImage, touchableConfig } from 'helpers';
import React from 'react';
import styled from 'styled-components/native';
import Video from 'react-native-video';
import { Box, Colors, Images } from 'themes';
import FastImage from 'react-native-fast-image';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { TouchableOpacity } from 'react-native';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import { Emoji, ShareContent } from 'features';
import { Description } from './Description';

interface PostCardProps {
  contentId: string;
  post: PostContent;
}

const StyledVideo = styled(Video as AnyType)`
  width: 100%;
  height: 200px;
`;

const StyledImage = styled(FastImage as AnyType)`
  width: 100%;
  height: 200px;
`;

export const PostCard: React.FC<PostCardProps> = ({ post, contentId }) => {
  const { assets, description, title } = post;

  const desc = description.trim();

  const userId = useTypedSelector(userSelectors.userId);

  const onNavigate = () => {
    if (userId) {
      RouteService.navigate(Routes.POST_DETAILS, { contentId });

      return;
    }

    RouteService.navigate(Routes.WELCOME);
  };

  return (
    <Box m={[8, 20]} bgc={Colors.basic_100} br="10px" bw="1px" bc={Colors.basic_500}>
      <TouchableOpacity {...touchableConfig} onPress={onNavigate}>
        <Box p={[8, 12]}>
          <Images.PostLogo />
        </Box>

        {assets?.[0]?.filename && !isImage(assets?.[0]?.filename) && (
          <StyledVideo
            paused
            resizeMode="cover"
            source={{ uri: assets?.[0]?.filename }}
            poster={assets?.[0]?.filename}
            posterResizeMode="cover"
          />
        )}

        {assets?.[0]?.filename && isImage(assets?.[0]?.filename) && (
          <StyledImage
            source={{ uri: assets?.[0]?.filename }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}

        {!!desc.length && <Description description={desc} /> }

        <Box f={1} m={[0, 12]} h="1px" bgc={Colors.basic_500} />

        <Box ai="center" fd="row" p={[8, 12]}>
          <Emoji contentId={contentId} />

          {userId && (
            <ShareContent title={title} description={description} contentId={contentId} />
          )}
        </Box>
      </TouchableOpacity>
    </Box>
  );
};
