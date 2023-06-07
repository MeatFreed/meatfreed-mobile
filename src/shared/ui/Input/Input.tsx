import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';
import {
  Box, Colors, Spaces, FontSizes,
} from 'themes';
import {
  AnyType, touchableConfig,
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

const constructIconOffset = (withLabel?: boolean) => {
  if (withLabel) {
    return '12px';
  }

  return '0px';
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

const StyledInput = styled.TextInput<StyledInputProps>`
  height: 48px;
  border: 1px solid ${
  ({
    isFocused, isError, accent,
  }) => constructBorderColor(isFocused, isError, accent)
};
  background-color: ${({ isWhite }) => constructBackgroundColor(isWhite)};
  border-top-left-radius: 10px;
  border-top-right-radius: ${({ isRemoveRightRounded }) => (isRemoveRightRounded ? '0px' : '10px')};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: ${({ isRemoveRightRounded }) => (isRemoveRightRounded ? '0px' : '10px')};
  padding-left: ${({ isLeftIconShown }) => (isLeftIconShown ? '48px' : '16px')};
  padding-right:  ${({ isRightIconShown }) => (isRightIconShown ? '48px' : '16px')};
  color: ${({ accent }) => constructColor(accent)};
  font-size: ${FontSizes.md}px;
`;

const LeftIconBox = styled.View<{withLabel?: boolean }>`
  position: absolute;
  top: ${({ withLabel }) => constructIconOffset(withLabel)};
  left: 16px;
  z-index: 999;
`;

const RightIconBox = styled.TouchableOpacity<{withLabel?: boolean }>`
  position: absolute;
  top: ${({ withLabel }) => constructIconOffset(withLabel)};
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
          <LeftIconBox withLabel={!!label}>
            {LeftIcon}
          </LeftIconBox>
        )}

        {!!RightIcon && (
          <RightIconBox
            withLabel={!!label}
            onPress={onRightPress}
            {...touchableConfig}
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
          autoCapitalize="none"
        />
      </Box>

      {isError && <ErrorMessage accent={accent} error={error} />}
    </Box>
  );
});
