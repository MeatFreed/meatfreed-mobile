import { AnyType, touchableConfig } from 'helpers';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInputProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useWindowDimensions } from '@lumitech/mobile-hooks';
import { Box, Colors, Images } from 'themes';

interface SearchBarProps extends TextInputProps {
  fullWidth?: boolean;
  label?: string
}

const StyledGradient = styled(LinearGradient as AnyType)`
  height: 40px;
  border-radius: 25px;
  opacity: 0.3
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;

const StyledButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.Image`
  height: 14px;
  width: 14px;
`;

const StyledInput = styled.TextInput`
  height: 40px;
  padding: 0px 16px;
  font-size: 14px;
  color: ${Colors.basic_800};
`;

const styles = StyleSheet.create({
  layout: {
    width: 40,
    height: 40,
    zIndex: 2,
    borderRadius: 25,
    backgroundColor: Colors.basic_100,
    position: 'absolute',
    flexDirection: 'row',
  },
  wrapper: {
    width: 0,
    height: 40,
  },
});

export const SearchBar: React.FC<SearchBarProps> = ({
  fullWidth,
  label,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);

  const animationWidth = useSharedValue(0);

  const { width } = useWindowDimensions();

  const LAYOUT_WIDTH = width - 50;

  const WRAPPER_WIDTH = LAYOUT_WIDTH - 40;

  const animatedLayoutStyle = useAnimatedStyle(() => {
    const width = interpolate(animationWidth.value, [0, 1], [40, LAYOUT_WIDTH], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      width: withTiming(width, {
        duration: 500,
      }),
    };
  });

  const animatedWrapperStyle = useAnimatedStyle(() => {
    const width = interpolate(animationWidth.value, [0, 1], [0, WRAPPER_WIDTH], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      width: withTiming(width, {
        duration: 500,
      }),
    };
  });

  useEffect(() => {
    animationWidth.value = isActive ? 1 : 0;
  }, [isActive]);

  return (
    <Box w={fullWidth ? '100%' : 'auto'} bgc={Colors.basic_100} shadowed br="25px">
      {label && (
        <StyledGradient
          locations={[0.46, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[Colors.gradient_100, Colors.gradient_200]}
        />
      )}

      {label && (
        <Box h="40px" z={1} ai="center" jc="center">
          <Text>{label}</Text>
        </Box>
      )}

      <Animated.View style={[styles.layout, animatedLayoutStyle]}>
        <Animated.View style={[styles.wrapper, animatedWrapperStyle]}>
          <StyledInput {...rest} placeholderTextColor={Colors.basic_500} />
        </Animated.View>

        <StyledButton {...touchableConfig} onPress={() => setIsActive(!isActive)}>
          <StyledIcon source={Images.Find} />
        </StyledButton>
      </Animated.View>
    </Box>
  );
};
