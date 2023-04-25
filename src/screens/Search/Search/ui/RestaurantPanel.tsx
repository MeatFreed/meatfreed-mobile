import React, { useMemo } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Box, Colors, Text } from 'themes';
import { SwipeablePanel } from 'ui';
import { SwipeablePanelService } from 'services';
import { AnyType, isIOS } from 'helpers';
import { RestaurantInformation } from 'api';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import MarqueView from 'react-native-marquee';
import Config from 'react-native-config';
import { useRestaurantActions } from 'hooks';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { FlashList } from '@shopify/flash-list';
import { ActionButton } from './ActionButton';
import { UserInfo } from './UserInfo';
import { PlaceInfo } from './PlaceInfo';

interface RestaurantPanelProps {
  details: RestaurantInformation;
  placeId: string;
}

const styles = StyleSheet.create({
  list: {
    overflow: 'visible',
    flexGrow: 1,
  },
});

const StyledMarque = styled(MarqueView as AnyType)`
  height: 150px;
  font-size: 24px;
`;

const MarqueCard = styled(FastImage as AnyType)`
  width: 200px;
  height: 133px;
  border-radius: 10px;
  margin-right: 10px;
`;

export const RestaurantPanel: React.FC<RestaurantPanelProps> = ({
  placeId, details,
}) => {
  const snapPoints = useMemo(() => [0.1, '96%'], []);

  const user = useTypedSelector(userSelectors.user);

  const { t } = useTranslation();

  const { onWebsite } = useRestaurantActions();

  const onOpen = () => {
    if (isIOS) {
      Linking.openURL(`https://maps.apple.com/?daddr=${encodeURIComponent(`${details?.geometry?.location?.lat},${details.geometry.location.lng}`)}`);

      return;
    }

    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(details?.name)}&destination_place_id=${placeId}`);
  };

  return (
    <SwipeablePanel
      ref={SwipeablePanelService.panelRef}
      snapPoints={snapPoints}
      index={0}
    >
      <BottomSheetScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
      >
        <Box p={[0, 10, 50]}>

          <PlaceInfo
            placeId={placeId}
            rating={details?.rating}
            name={details?.name}
            onOpen={onOpen}
            userRatingsTotal={details?.user_ratings_total}
            weekdays={details?.opening_hours?.weekday_text}
          />

          <UserInfo photoURL={user?.photoURL} name={user?.name} email={user?.email} />

          <Text fs={14} fnw="600" color={Colors.purple} m={[10, 0, 16]} ta="center">{t('offers.refer')}</Text>

          <StyledMarque
            speed={0.25}
            marqueeOnStart
            loop
            delay={2000}
          >
            <FlashList
              data={details?.photos}
              keyExtractor={(_, index) => index.toString()}
              estimatedItemSize={200}
              renderItem={({ item: photo }) => (
                <MarqueCard source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photo.photo_reference}&maxwidth=500&key=${Config.GOOGLE_API_KEY}` }} />
              )}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </StyledMarque>

          <Text ta="center" fs={14} fnw="600" color={Colors.purple} mb={20}>{details?.name}</Text>

          <ActionButton
            iconName="pin-outline"
            label={details?.formatted_address}
            onPress={onOpen}
          />

          {details?.website && (
            <ActionButton
              iconName="globe"
              label={details?.website}
              onPress={() => {
                onWebsite(placeId);
                Linking.openURL(details.website);
              }}
            />
          )}

          {details?.international_phone_number && (
            <ActionButton
              iconName="phone"
              label={details?.international_phone_number}
              onPress={() => Linking.openURL(`tel:${details?.international_phone_number}`)}
            />
          )}
        </Box>
      </BottomSheetScrollView>
    </SwipeablePanel>
  );
};
