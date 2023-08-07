/* eslint-disable react/jsx-no-useless-fragment */
import { AnyType } from 'helpers';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {
  Box, Colors, Images, shadow,
} from 'themes';
import { Icon, Loader } from 'ui';

type AvatarSize = 'xs' | 's' | 'm' | 'l';

interface AvatarProps {
  uri?: string | null;
  size?: AvatarSize;
  onPress?: () => Promise<void>;
  isLoading?: boolean;
}

const avatarSizes: Record<string, number> = {
  xs: 40,
  s: 128,
  m: 164,
  l: 200,
};

const avatarRadiuses: Record<string, number> = {
  xs: 50,
  s: 64,
  m: 82,
  l: 100,
};

const buttonSizes: Record<string, number> = {
  s: 32,
  m: 40,
  l: 54,
};

const buttonRadiuses: Record<string, number> = {
  s: 16,
  m: 20,
  l: 27,
};

const StyledImage = styled(FastImage as AnyType)<{ size: AvatarSize }>`
  height: ${({ size }) => `${avatarSizes[size] - 3}px`};
  width: ${({ size }) => `${avatarSizes[size] - 3}px`};
  border-radius: ${({ size }) => `${avatarRadiuses[size]}px`};
  background-color: ${Colors.primary_500};
  ${{ shadow }};
`;

const StyledButton = styled.TouchableOpacity<{ br: string }>`
  border-radius: ${({ br }) => br};
  border: 1px solid ${Colors.primary_500};
`;

const StyledView = styled(Box)`
  position: absolute;
  z-index: 9999;
  bottom: 0px;
  right: 0px;
`;

const StyledEdit = styled.TouchableOpacity<{ w: string, h: string, br: string }>`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  border-radius: ${({ br }) => br};
  background-color: ${Colors.primary_500};
  border: 1px solid ${Colors.basic_100};
  align-items: center;
  justify-content: center;
  ${{ shadow }};
`;

const StyledWrapper = styled(Box)`
  position: absolute;
`;

export const Avatar: React.FC<AvatarProps> = ({
  size = 's',
  uri,
  onPress,
  isLoading,
}) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  return (
    <Box>
      <StyledButton disabled={uri} br={`${avatarRadiuses[size]}px`} onPress={onPress}>
        <Box ai="center" jc="center" bgc={Colors.primary_500} w={`${avatarSizes[size]}px`} bw="2px" bc={Colors.basic_100} h={`${avatarSizes[size]}px`} br={`${avatarRadiuses[size]}px`}>
          {isLoading ? (
            <Loader size="large" color={Colors.basic_100} />
          ) : (
            <>
              {uri ? (
                <>
                  {isLoadingImage && (
                    <StyledWrapper>
                      <Loader size="large" color={Colors.purple} />
                    </StyledWrapper>
                  )}

                  <StyledImage
                    size={size}
                    source={{ uri }}
                    onLoadEnd={() => setIsLoadingImage(false)}
                  />
                </>
              ) : (
                <Box ai="center">
                  <Icon name="image-2" size={60} color={Colors.basic_100} />
                </Box>
              )}
            </>
          )}
        </Box>
      </StyledButton>

      {uri && (
        <StyledView>
          <StyledEdit w={`${buttonSizes[size]}px`} h={`${buttonSizes[size]}px`} br={`${buttonRadiuses[size]}px`} onPress={onPress}>
            <Images.Pencil width={15} height={15} />
          </StyledEdit>
        </StyledView>
      )}
    </Box>
  );
};
