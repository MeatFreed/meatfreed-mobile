import { PostContent } from 'api';
import { AnyType, isImage, touchableConfig } from 'helpers';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import Video from 'react-native-video';
import { Box, Colors } from 'themes';
import FastImage from 'react-native-fast-image';
import Gradient from 'react-native-linear-gradient';
import { Loader } from 'ui';
import { Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface FeaturedCardProps {
  post: PostContent;
  isFirst: boolean;
  onPress?: () => void;
}

const ITEM_WIDTH = width / 3;

const ITEM_HEIGHT = width / 2;

const StyledVideo = styled(Video as AnyType)`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
  position: absolute;
  border-radius: 10px;
`;

const StyledImage = styled(FastImage as AnyType)`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
  position: absolute;
  border-radius: 10px;
`;

const StyledTopGradient = styled(Gradient as AnyType)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 8px;
  width: 100%;
  height: 30px;
  z-index: 1;
  border-radius: 10px;
`;

const StyledBottomGradient = styled(Gradient as AnyType)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 8px;
  width: 100%;
  height: 30px;
  z-index: 1;
  border-radius: 10px;
`;

const StyledWrapper = styled(Box)`
  position: absolute;
  z-index: 10;
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;

const StyledButton = styled.TouchableOpacity<{ isFirst: boolean }>`
  border-radius: 10px;
  border: 1px solid ${Colors.basic_500};
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
  margin: ${({ isFirst }) => `10px 16px 0px ${isFirst ? '16px' : '0px'}`};
`;

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  post, isFirst, onPress,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { assets } = post;

  const isVideo = isImage(assets?.[0]?.filename);

  const isFocused = useIsFocused();

  return (
    <StyledButton {...touchableConfig} isFirst={isFirst} onPress={onPress}>
      {isLoading && (
        <StyledWrapper>
          <Loader size="large" color={Colors.purple} />
        </StyledWrapper>
      )}

      {assets?.[0]?.filename && !isVideo && (
        <StyledVideo
          repeat
          resizeMode="cover"
          muted
          paused={!isFocused}
          source={{ uri: assets?.[0]?.filename }}
          poster={assets?.[0]?.filename || 'https://iili.io/HOckdkg.png'}
          ignoreSilentSwitch="ignore"
          onLoad={() => setIsLoading(false)}
          selectedVideoTrack={{
            type: 'resolution',
            value: 360,
          }}
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

      <Box br="10px" z={2} f={1} bgc="transparent">
        {!isLoading && (
          <StyledTopGradient
            colors={['rgba(0, 0, 0, .5)', 'rgba(0, 0, 0, .2)', 'rgba(0, 0, 0, .01)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.75 }}
            locations={[0, 0.7, 0.9]}
          />
        )}

        {!isLoading && (
          <StyledBottomGradient
            colors={['rgba(0, 0, 0, .5)', 'rgba(0, 0, 0, .15)', 'rgba(0, 0, 0, .01)']}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 0, y: 0 }}
            locations={[0, 0.7, 0.9]}
          />
        )}
      </Box>
    </StyledButton>
  );
};
