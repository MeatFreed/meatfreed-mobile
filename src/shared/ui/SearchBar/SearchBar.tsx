import { AnyType, EventTypes } from 'helpers';
import React, { Dispatch, SetStateAction, forwardRef } from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { useWindowDimensions } from '@lumitech/mobile-hooks';
import { Box, Colors } from 'themes';
import Config from 'react-native-config';
import { useTypedDispatch } from 'stores';
import { setSelectLocation } from 'stores/place';
import { useAnalytics } from 'hooks';
import { Icon } from 'ui';
import { RouteService } from 'services';
import { Routes } from 'navigation';

interface SearchBarProps extends TextInputProps {
  onReset: () => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isShowFavorite?: boolean
}

const StyledLayout = styled(Box)`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
`;

const StyledFavorite = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 0px 0px;
`;

const StyledButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 15px;
`;

const SearchIcon = styled(StyledButton)`
  left: 20px;
  z-index: 2;
`;

const CloseIcon = styled(StyledButton)`
  right: 20px;
  z-index: 2;
`;

const StyledInput = styled(GooglePlacesAutocomplete as AnyType)`
  font-size: 14px;
  color: ${Colors.basic_800};
`;

export const SearchBar = forwardRef<AnyType, SearchBarProps>(({
  onReset,
  searchQuery,
  setSearchQuery,
  isShowFavorite,
  ...rest
}, ref) => {
  const { onLogEvent } = useAnalytics();

  const { width } = useWindowDimensions();

  const LAYOUT_WIDTH = width - 50;

  const WRAPPER_WIDTH = LAYOUT_WIDTH - 40;

  const dispatch = useTypedDispatch();

  const onSelectLocation = (data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
    setSearchQuery(data.description);

    onLogEvent(EventTypes.LOCATION_SEARCHED, { name: data.description });

    dispatch(setSelectLocation({
      latitude: detail?.geometry?.location?.lat || 0,
      longitude: detail?.geometry?.location?.lng || 0,
    }));
  };

  return (
    <StyledLayout z={9999} bgc={Colors.basic_100} fd="row">
      <Box bgc={Colors.basic_100} z={9999} w={`${isShowFavorite ? `${LAYOUT_WIDTH}px` : `${width}px`}`}>
        <SearchIcon disabled>
          <Icon name="search-outline" size={24} color={Colors.basic_700} />
        </SearchIcon>

        <StyledInput
          {...rest}
          ref={ref}
          GooglePlacesDetailsQuery={{ fields: 'geometry' }}
          query={{
            key: Config.MAP_API_KEY,
            lenguage: 'en',
            types: ['cities|cafe|restaurant'],
          }}
          listViewDisplayed
          textInputProps={{
            placeholderTextColor: Colors.basic_600,
            color: Colors.basic_800,
            value: searchQuery,
            onChangeText: (value: string) => setSearchQuery(value),
            clearButtonMode: 'never',
          }}
          onPress={onSelectLocation}
          renderRightButton={() => {}}
          styles={{
            textInputContainer: {
              height: 48,
              overflow: 'hidden',
              color: Colors.basic_600,
              margin: 12,
              borderRadius: 0,
              backgroundColor: Colors.basic_100,
            },
            textInput: {
              borderRadius: 8,
              height: 48,
              overflow: 'hidden',
              paddingHorizontal: 48,
              color: Colors.basic_800,
              backgroundColor: Colors.basic_200,
            },
            listView: {
              width: WRAPPER_WIDTH,
              marginBottom: 5,
            },
            description: {
              color: Colors.basic_800,
            },
          }}
          fetchDetails
          enablePoweredByContainer={false}
          debounce={500}
        />

        {!!searchQuery && (
          <CloseIcon onPress={onReset}>
            <Icon name="close" size={24} color={Colors.basic_700} />
          </CloseIcon>
        )}
      </Box>

      {isShowFavorite && (
        <StyledFavorite onPress={() => RouteService.navigate(Routes.RESTAURANT_FAVORITES)}>
          <Icon size={24} color={Colors.basic_800} name="heart-outline" />
        </StyledFavorite>
      )}

    </StyledLayout>
  );
});
