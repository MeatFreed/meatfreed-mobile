import { AnyType, EventTypes, touchableConfig } from 'helpers';
import React, { useRef, useState } from 'react';
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

interface SearchBarProps extends TextInputProps {
  getCurrentLocation: () => void;
}

const StyledLayout = styled(Box)`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
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

export const SearchBar: React.FC<SearchBarProps> = ({
  getCurrentLocation,
  ...rest
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { onLogEvent } = useAnalytics();

  const { width } = useWindowDimensions();
  const ref = useRef<AnyType>();

  const LAYOUT_WIDTH = width - 50;

  const WRAPPER_WIDTH = LAYOUT_WIDTH - 40;

  const dispatch = useTypedDispatch();

  const onReset = () => {
    getCurrentLocation();
    ref?.current?.setAddressText?.('');
    setSearchQuery('');
  };

  const onSelectLocation = (data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
    setSearchQuery(data.description);

    onLogEvent(EventTypes.LOCATION_SEARCHED, { name: data.description });

    dispatch(setSelectLocation({
      latitude: detail?.geometry?.location?.lat || 0,
      longitude: detail?.geometry?.location?.lng || 0,
    }));
  };

  return (
    <StyledLayout z={9999} bgc={Colors.basic_100}>
      <Box w="auto" bgc={Colors.basic_100} z={9999}>
        <SearchIcon {...touchableConfig} disabled>
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
          }}
          onPress={onSelectLocation}
          renderRightButton={() => null}
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
          <CloseIcon {...touchableConfig} onPress={onReset}>
            <Icon name="close" size={24} color={Colors.basic_700} />
          </CloseIcon>
        )}
      </Box>
    </StyledLayout>
  );
};
