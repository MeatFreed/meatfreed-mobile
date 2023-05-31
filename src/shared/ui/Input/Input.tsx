import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';
import {
  Box, Colors, FontFamily, Spaces, FontSizes,
} from 'themes';
import {
  AnyType, isIOS, touchableConfig,
} from 'helpers';
import { Label } from '../Label/Label';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

interface InputProps extends TextInputProps {
  label?: string;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  accent?: boolean;
  onRightPress?: () => void;
  onFocusLost?: () => void;
  onFocusReceive?: () => void;
  isError?: boolean;
  error?: string;
  fullWidth?: boolean;
  withBoldLabel?: boolean;
  isSmall?: boolean;
  isSearch?: boolean;
  isMultiline?: boolean;
  withBottomOffset?: boolean;
  isWhite?: boolean;
  isImportant?: boolean;
  description?: string;
  isWhiteLabel?: boolean;
  isRemoveRightRounded?: boolean;
}

interface StyledInputProps {
  isLeftIconShown: boolean;
  isRightIconShown: boolean;
  accent?: boolean;
  isFocused: boolean;
  isError?: boolean;
  isMultiline?: boolean;
  value?: string;
  isSmall?: boolean;
  isSearch?: boolean;
  isWhite?: boolean;
  isRemoveRightRounded?: boolean;
}

const constructBorderColor = (
  isFocused: boolean,
  isError?: boolean,
  accent?: boolean,
) => {
  if (accent) {
    return Colors.white;
  }

  if (isError) {
    return Colors.danger_500;
  }

  return isFocused ? Colors.purple : Colors.basic_400;
};

const constructInputHeight = (isMultiline?: boolean, isSmall?: boolean, isSearch?: boolean) => {
  if (isMultiline) {
    return '72px';
  }

  if (isSearch) {
    return isIOS ? '34px' : '38px';
  }

  return isSmall ? '34px' : '48px';
};

const constructIconOffset = (withLabel?: boolean, isSmall?: boolean, isSearch?: boolean) => {
  if (withLabel) {
    return '12px';
  }

  if (isSearch) {
    return '9px';
  }

  return isSmall ? '9px' : '10px';
};

const constructBackgroundColor = (
  isWhite?: boolean,
) => {
  if (isWhite) {
    return Colors.white;
  }

  return Colors.basic_200;
};

const constructColor = (
  accent?: boolean,
) => (accent ? Colors.white : Colors.basic_800);

const paddingTop = isIOS ? '1px' : '10px';

const StyledInput = styled.TextInput<StyledInputProps>`
  height: ${({ isMultiline, isSmall, isSearch }) => constructInputHeight(isMultiline, isSmall, isSearch)};
  border: 1px solid ${
  ({
    isFocused, isError, accent,
  }) => constructBorderColor(isFocused, isError, accent)
};
  font-family: ${FontFamily.PoppinsRegular};
  border-top-left-radius: 10px;
  border-top-right-radius: ${({ isRemoveRightRounded }) => (isRemoveRightRounded ? '0px' : '10px')};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: ${({ isRemoveRightRounded }) => (isRemoveRightRounded ? '0px' : '10px')};
  background-color: ${({ isWhite }) => constructBackgroundColor(isWhite)};
  font-size: ${FontSizes.md}px;
  padding-top: ${({ isMultiline }) => (isMultiline ? '10px' : paddingTop)};
  color: ${({ accent }) => constructColor(accent)};
  padding-left: ${({ isLeftIconShown }) => (isLeftIconShown ? '48px' : '16px')};
  padding-right:  ${({ isRightIconShown }) => (isRightIconShown ? '48px' : '16px')};
`;

const LeftIconBox = styled.View<{withLabel?: boolean, isSmall?: boolean, isSearch?: boolean }>`
  position: absolute;
  top: ${({ withLabel, isSmall, isSearch }) => constructIconOffset(withLabel, isSmall, isSearch)};
  left: 16px;
  z-index: 999;
`;

const RightIconBox = styled.TouchableOpacity<{withLabel?: boolean, isSmall?: boolean, isSearch?: boolean }>`
  position: absolute;
  top: ${({ withLabel, isSmall, isSearch }) => constructIconOffset(withLabel, isSmall, isSearch)};
  right: 16px;
  z-index: 999;
`;

export const Input = React.forwardRef<TextInput | undefined, InputProps>(({
  label,
  accent,
  LeftIcon,
  isSearch,
  onFocusReceive,
  onFocusLost,
  RightIcon,
  isError,
  error,
  onRightPress,
  fullWidth,
  isSmall,
  withBottomOffset,
  isWhite,
  isWhiteLabel,
  ...rest
}, ref) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <Box w={fullWidth ? '100%' : 'auto'} mb={withBottomOffset ? Spaces.md : 0}>
      <Label label={label} isError={isError} isWhiteLabel={isWhiteLabel} />

      <Box>
        {!!LeftIcon && (
          <LeftIconBox withLabel={!!label} isSmall={isSmall} isSearch={isSearch}>
            {LeftIcon}
          </LeftIconBox>
        )}

        {!!RightIcon && (
          <RightIconBox
            withLabel={!!label}
            onPress={onRightPress}
            {...touchableConfig}
            isSearch={isSearch}
          >
            {RightIcon}
          </RightIconBox>
        )}

        <StyledInput
          {...rest}
          ref={ref}
          onFocus={() => {
            onFocusReceive?.();
            setFocused(true);
          }}
          onBlur={(e: AnyType) => {
            onFocusLost?.();
            setFocused(false);
            rest.onBlur?.(e);
          }}
          value={rest.value}
          isWhite={isWhite}
          isSmall={isSmall}
          placeholderTextColor={Colors.basic_600}
          isFocused={isFocused}
          isError={isError}
          isLeftIconShown={!!LeftIcon}
          isRightIconShown={!!RightIcon}
          isSearch={isSearch}
          style={{ textAlignVertical: 'center' }}
          autoCapitalize="none"
        />
      </Box>

      {isError && <ErrorMessage accent={accent} error={error} />}
    </Box>
  );
});
