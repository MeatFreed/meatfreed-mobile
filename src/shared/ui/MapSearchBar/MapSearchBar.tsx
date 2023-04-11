import { AnyType, touchableConfig } from 'helpers';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
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
import { useTypedDispatch } from 'stores';
import { setCurrentLocation } from 'stores/place';
import { useAnalytics } from 'hooks';
import FastImage from 'react-native-fast-image';

interface MapSearchBarProps extends TextInputProps {
  fullWidth?: boolean;
  label?: string
}

const StyledButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  align-items: center;
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
    borderRadius: 25,
    flexDirection: 'row',
    zIndex: 999,
  },
  wrapper: {
    width: 0,
  },
  btn: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
});

export const MapSearchBar: React.FC<MapSearchBarProps> = ({
  fullWidth,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);

  const { onLogEvent } = useAnalytics();

  const animationWidth = useSharedValue(0);
  const animationPosition = useSharedValue(0);

  const { width } = useWindowDimensions();

  const LAYOUT_WIDTH = width - 50;

  const WRAPPER_WIDTH = LAYOUT_WIDTH - 40;

  const dispatch = useTypedDispatch();

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

  const animatedPositionStyle = useAnimatedStyle(() => {
    const position = interpolate(animationPosition.value, [0, 1], [0, WRAPPER_WIDTH], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    const radius = interpolate(animationPosition.value, [0, 1], [25, 0], {
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

    if (!isActive && rest?.onChangeText) {
      rest?.onChangeText('');
    }
  }, [isActive]);

  return (
    <Box w={fullWidth ? '100%' : 'auto'} bgc={Colors.basic_100} shadowed br="25px">
      <Animated.View style={[styles.layout, animatedLayoutStyle]}>
        <Animated.View style={[[styles.btn, animatedPositionStyle]]}>
          <StyledButton {...touchableConfig} onPress={() => setIsActive(!isActive)}>
            <StyledIcon source={Images.Find} />
          </StyledButton>
        </Animated.View>

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
                color: Colors.basic_600,
                marginLeft: 40,
              },
              textInput: {
                borderRadius: 20,
                height: 40,
                paddingRight: 40,
                overflow: 'hidden',
              },
              listView: {
                width: WRAPPER_WIDTH,
              },
            }}
            fetchDetails
            enablePoweredByContainer={false}
            debounce={500}
          />
        </Animated.View>
      </Animated.View>
    </Box>
  );
};
