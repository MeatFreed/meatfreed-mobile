import { PostContent } from 'api';
import { AnyType, isImage, touchableConfig } from 'helpers';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import Video from 'react-native-video';
import { Box, Colors, Images } from 'themes';
import FastImage from 'react-native-fast-image';
import Gradient from 'react-native-linear-gradient';
import { Emoji, ShareContent } from 'features';
import { Icon, Loader } from 'ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Description } from './Description';

interface PostCardProps {
  isAutoPlay: boolean
  contentId: string;
  post: PostContent;
  isMuted: boolean;
  onChangeVolume: () => void;
  isFirst: boolean;
}

const StyledVideo = styled(Video as AnyType)`
  width: 100%;
  height: 620px;
  position: absolute;
  border-radius: 10px;
`;

const StyledImage = styled(FastImage as AnyType)`
  width: 100%;
  height: 620px;
  position: absolute;
  border-radius: 10px;
`;

const StyledTopGradient = styled(Gradient as AnyType)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 8px;
  width: 100%;
  height: 140px;
  z-index: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const StyledBottomGradient = styled(Gradient as AnyType)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 8px;
  width: 100%;
  height: 130px;
  z-index: 1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const StyledVolume = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.basic_transparent_32};
`;

const StyledWrapper = styled(Box)`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 620px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;

export const PostCard: React.FC<PostCardProps> = ({
  post, contentId, isAutoPlay, isMuted, onChangeVolume, isFirst,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { assets, description, title } = post;

  const [isShowFullDescription, setIsShowFullDescription] = useState(false);

  const isVideo = isImage(assets?.[0]?.filename);

  const safe = useSafeAreaInsets();

  const marginTop = (safe.top || 10) + 8;

  return (
    <Box m={[isFirst ? marginTop : 8, 20, 8]} h="620px" bgc={Colors.basic_100} br="10px" bw="1px" bc={Colors.basic_500}>
      {isLoading && (
        <StyledWrapper>
          <Loader size="large" color={Colors.purple} />
        </StyledWrapper>
      )}

      {assets?.[0]?.filename && !isVideo && (
        <StyledVideo
          paused={!isAutoPlay}
          resizeMode="cover"
          repeat
          source={{ uri: assets?.[0]?.filename }}
          poster={assets?.[0]?.filename}
          muted={isMuted}
          ignoreSilentSwitch="ignore"
          onLoad={() => setIsLoading(false)}
          posterResizeMode="cover"
        />
      )}

      {assets?.[0]?.filename && isVideo && (
        <StyledImage
          source={{ uri: assets?.[0]?.filename }}
          resizeMode={FastImage.resizeMode.cover}
          onLoadEnd={() => setIsLoading(false)}
        />
      )}

      {!assets?.length && <StyledImage resizeMode="cover" source={{ uri: 'https://iili.io/HOckdkg.png' }} onLoadEnd={() => setIsLoading(false)} />}

      <Box br="10px" z={2} f={1} bgc={isShowFullDescription ? Colors.basic_transparent_72 : 'transparent'}>
        {!isLoading && (
          <StyledTopGradient
            colors={['rgba(0, 0, 0, .5)', 'rgba(0, 0, 0, .2)', 'rgba(0, 0, 0, .01)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.75 }}
            locations={[0, 0.7, 0.9]}
          />
        )}

        <Box z={1} p={[8, 12, 16]} fd="row" jc="space-between" ai="center">
          <Images.PostLogo />

          {assets?.[0]?.filename && !isVideo && !isLoading && (
            <StyledVolume {...touchableConfig} onPress={onChangeVolume}>
              <Icon name={isMuted ? 'volume-off-outline' : 'volume-up-outline'} color={Colors.basic_100} />
            </StyledVolume>
          )}
        </Box>

        <Box f={1} />

        {!!description && (
          <Description
            description={description}
            isShowFullDescription={isShowFullDescription}
            onPress={() => setIsShowFullDescription(!isShowFullDescription)}
          />
        )}

        <Box z={2} w="auto" m={[0, 12]} h="1px" bgc={Colors.basic_500} />

        <Box z={2} ai="center" fd="row" p={[8, 12]}>
          <Emoji contentId={contentId} />

          <ShareContent title={title} contentId={contentId} />
        </Box>

        {!isLoading && (
          <StyledBottomGradient
            colors={['rgba(0, 0, 0, .5)', 'rgba(0, 0, 0, .15)', 'rgba(0, 0, 0, .01)']}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 0, y: 0 }}
            locations={[0, 0.7, 0.9]}
          />
        )}
      </Box>
    </Box>
  );
};
