import { AnyType, touchableConfig } from 'helpers';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInputProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useWindowDimensions } from '@lumitech/mobile-hooks';
import { Box, Colors, Images } from 'themes';
import Config from 'react-native-config';
import { useAnalytics } from 'hooks';
import { useTypedDispatch } from 'stores';
import { setCurrentLocation } from 'stores/place';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';

interface GoogleSearchBarProps extends TextInputProps {
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
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  align-items: center;
  background-color: ${Colors.basic_100};
  justify-content: center;
`;

const StyledIcon = styled(FastImage as AnyType)`
  height: 14px;
  width: 14px;
`;

const StyledInput = styled(GooglePlacesAutocomplete as AnyType)`
  padding: 0px 16px;
  font-size: 14px;
  color: ${Colors.basic_800};
`;

const styles = StyleSheet.create({
  layout: {
    width: 40,
    zIndex: 2,
    borderRadius: 20,
    position: 'absolute',
    flexDirection: 'row',
  },
  wrapper: {
    width: 1,
    overflow: 'hidden',
  },
  btn: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,

    overflow: 'hidden',
  },
});

export const GoogleSearchBar: React.FC<GoogleSearchBarProps> = ({
  fullWidth,
  label,
  ...rest
}) => {
  const isFocused = useIsFocused();

  const { onLogEvent } = useAnalytics();

  const [isActive, setIsActive] = useState(false);

  const animationWidth = useSharedValue(0);
  const animationPosition = useSharedValue(0);

  const dispatch = useTypedDispatch();

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
    const width = interpolate(animationWidth.value, [0, 1], [0, LAYOUT_WIDTH], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      width: withTiming(width, {
        duration: 500,
      }),
    };
  });

  const animatedPositionStyle = useAnimatedStyle(() => {
    const position = interpolate(animationPosition.value, [0, 1], [0, WRAPPER_WIDTH], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    const radius = interpolate(animationPosition.value, [0, 1], [20, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      left: withTiming(position, {
        duration: 500,
      }),
      borderBottomLeftRadius: withTiming(radius, {
        duration: 1,
      }),
      borderTopLeftRadius: withTiming(radius, {
        duration: 1,
      }),
    };
  });

  useEffect(() => {
    animationWidth.value = isActive ? 1 : 0;
    animationPosition.value = isActive ? 1 : 0;

    if (!isActive && rest?.onChangeText) {
      rest?.onChangeText('');
    }
  }, [isActive, rest?.onChangeText]);

  useEffect(() => {
    if (isFocused) {
      rest?.onChangeText?.('');
      animationWidth.value = 0;
      animationPosition.value = 0;
    }
  }, [isFocused, rest?.onChangeText]);

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
          <StyledInput
            {...rest}
            GooglePlacesDetailsQuery={{ fields: 'geometry' }}
            query={{
              key: Config.MAP_API_KEY,
              lenguage: 'en',
              types: ['cities'],
            }}
            listViewDisplayed
            textInputProps={{
              placeholderTextColor: Colors.basic_600,
              color: Colors.basic_800,
            }}
            onPress={(data: AnyType, details: AnyType) => {
              onLogEvent('location_searched', { name: data.description });

              dispatch(setCurrentLocation({
                coords: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                } as AnyType,
                timestamp: 0,
              }));
            }}
            styles={{
              textInputContainer: {
                borderRadius: 20,
                height: 40,
                overflow: 'hidden',
                marginBottom: 10,
                color: Colors.basic_600,
              },
              textInput: {
                borderRadius: 20,
                height: 40,
                paddingLeft: 16,
                paddingRight: 40,
                overflow: 'hidden',
                color: Colors.basic_800,
              },
              listView: {
                marginTop: 10,
              },
              description: {
                color: Colors.basic_800,
              },
            }}
            fetchDetails
            enablePoweredByContainer={false}
            debounce={500}
          />
        </Animated.View>

        <Animated.View style={[[styles.btn, animatedPositionStyle]]}>
          <StyledButton {...touchableConfig} onPress={() => setIsActive(!isActive)}>
            <StyledIcon source={Images.Find} />
          </StyledButton>
        </Animated.View>
      </Animated.View>
    </Box>
  );
};
