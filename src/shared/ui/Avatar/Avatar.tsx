/* eslint-disable react/jsx-no-useless-fragment */
import { AnyType, touchableConfig } from 'helpers';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, shadow, Spaces, Text,
} from 'themes';
import { Icon, Loader } from 'ui';

type AvatarSize = 'xs' | 's' | 'm' | 'l';

interface AvatarProps {
  type?: 'default' | 'thumbnail' | 'add-photo' | 'anonymous' | 'mini-profile';
  displayName?: string;
  uri?: string | null;
  size?: AvatarSize;
  title?: string;
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
  s: 12,
  m: 12,
  l: 12,
};

const StyledImage = styled(FastImage as AnyType)<{ size: AvatarSize }>`
  height: ${({ size }) => `${avatarSizes[size]}px`};
  width: ${({ size }) => `${avatarSizes[size]}px`};
  border-radius: ${({ size }) => `${avatarRadiuses[size]}px`};
  background-color: ${Colors.primary_100};
  ${{ shadow }};
`;

const StyledButton = styled.TouchableOpacity<{ br: string }>`
  border-radius: ${({ br }) => br};
`;

const StyledView = styled(Box)`
  position: absolute;
  zIndex: 9999;
  bottom: 0px;
  right: 0px;
`;

const StyledEdit = styled.TouchableOpacity<{ w: string, h: string, br: string }>`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  border-radius: ${({ br }) => br};
  background-color: ${Colors.basic_100};
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
  const { t } = useTranslation();

  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const isLarge = size === 'l';

  return (
    <Box>
      <StyledButton disabled={uri} {...touchableConfig} br={`${avatarRadiuses[size]}px`} onPress={onPress}>
        <Box ai="center" jc="center" w={`${avatarSizes[size]}px`} h={`${avatarSizes[size]}px`} br={`${avatarRadiuses[size]}px`} bgc={Colors.primary_100}>
          {isLoading ? (
            <Loader size="large" color={Colors.purple} />
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
                  <Icon name="image-2" size={40} color={Colors.purple} />

                  <Text mt={isLarge ? Spaces.sm : Spaces['2xs']} ff={FontFamily.DMSansMedium} color={Colors.primary_800}>{t('profile.add-photo')}</Text>
                </Box>
              )}
            </>
          )}
        </Box>
      </StyledButton>

      {uri && (
        <StyledView>
          <StyledEdit {...touchableConfig} w={`${buttonSizes[size]}px`} h={`${buttonSizes[size]}px`} br={`${buttonRadiuses[size]}px`} onPress={onPress}>
            <Icon name="edit-outline" size={24} color={Colors.purple} />
          </StyledEdit>
        </StyledView>
      )}
    </Box>
  );
};
