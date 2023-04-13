import React, { useMemo, useState } from 'react';
import {
  FlatList, Linking, StyleSheet, TouchableOpacity,
} from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  Box, Colors, FontFamily, Images, Text, shadow,
} from 'themes';
import { Icon, SwipeablePanel } from 'ui';
import { SwipeablePanelService } from 'services';
import { AnyType, isIOS, touchableConfig } from 'helpers';
import { Rating } from 'react-native-ratings';
import { RestaurantInformation } from 'api';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import MarqueView from 'react-native-marquee';
import Config from 'react-native-config';
import { useRestaurantActions } from 'hooks';
import { ActionButton } from './ActionButton';

interface RestaurantPanelProps {
  details: RestaurantInformation;
  placeId: string;
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    overflow: 'visible',
    flexGrow: 1,
  },
  list: {
    flex: 1,
  },
});

const StyledImage = styled(FastImage as AnyType)`
  width: 60px;
  height: 60px;
`;

const StyledButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const Direction = styled(FastImage as AnyType)`
  width: 17px;
  height: 17px;
`;

const Picture = styled(Box)`
  position: absolute;
  top: 15px;
  left: -10px;
  zIndex: 999px;
  border-radius: 5px;
  margin: 0px 2px;
`;

const Meat = styled(Box)`
  position: absolute;
  bottom: -10px;
  right: -10px;
`;

const StyledGradient = styled(LinearGradient as AnyType)<{mt: string}>`
  marginTop: ${({ mt }) => mt};
  border-radius: 14px;
  padding: 20px;
  ${shadow};
`;

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

export const RestaurantPanel: React.FC<RestaurantPanelProps> = ({ placeId, details }) => {
  const snapPoints = useMemo(() => [0.1, '80%'], []);

  const [isShowSchedule, setIsShoSchedule] = useState(false);

  const user = useTypedSelector(userSelectors.user);

  const { t } = useTranslation();

  const today = new Date().getDay();

  const { onWebsite } = useRestaurantActions();

  const onOpen = () => {
    if (isIOS) {
      Linking.openURL(`https://maps.apple.com/?daddr=${encodeURIComponent(`${details.geometry.location.lat},${details.geometry.location.lng}`)}`);

      return;
    }

    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(details?.name)}&destination_place_id=${placeId}`);
  };

  return (
    <SwipeablePanel
      ref={SwipeablePanelService.panelRef}
      snapPoints={snapPoints}
    >
      <BottomSheetScrollView
        style={styles.list}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Box f={1} p={[0, 10, 50]}>
          <Box fd="row">
            <StyledImage
              source={{
                uri: `https://meatfreeds3.s3.eu-west-2.amazonaws.com/restaurant+logos/${placeId}.png`,
              }}
            />

            <Box ml={16} f={1}>
              <Text fnw="bold" ff={FontFamily.DMSansBold} color={Colors.basic_800}>{details.name}</Text>

              <Box ai="center" f={1} jc="space-between" fd="row">
                <Box ai="center" fd="row">
                  <Text color={Colors.warning_600} mt={4}>{details?.rating || 0}</Text>

                  <Rating
                    style={{
                      alignSelf: 'flex-start',
                      marginTop: 6,
                      left: 5,
                    }}
                    startingValue={details?.rating}
                    ratingCount={5}
                    imageSize={16}
                  />

                  <Text fs={16} m={[4, 0, 0, 12]} color={Colors.warning_600}>{`(${details?.user_ratings_total})`}</Text>
                </Box>

                <StyledButton {...touchableConfig} onPress={onOpen}>
                  <Box w="30px" h="30px" br="15px" bgc={Colors.dark} ai="center" jc="center">
                    <Direction
                      source={Images.Direction}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </Box>

                  <Text fs={12} mt={8}>{t('search.directions')}</Text>
                </StyledButton>
              </Box>

              <Box mt={10} />

              <TouchableOpacity
                {...touchableConfig}
                onPress={() => setIsShoSchedule(!isShowSchedule)}
              >
                <Box fd="row">
                  <Box>
                    {!isShowSchedule && (
                      <Text mb={8} fs={12} color={Colors.basic_800}>
                        {details?.opening_hours.weekday_text[today]}
                      </Text>
                    )}

                    {isShowSchedule && details.opening_hours.weekday_text.map((day) => (
                      <Text mb={8} fs={12} color={Colors.basic_800} key={day}>{day}</Text>
                    ))}
                  </Box>

                  <Icon name={isShowSchedule ? 'chevron-up' : 'chevron-down'} style={{ marginTop: -5 }} size={24} color={Colors.basic_800} />
                </Box>
              </TouchableOpacity>
            </Box>

          </Box>

          <Box>
            {user?.photoURL && (
              <Picture>
                <FastImage
                  source={{ uri: user?.photoURL }}
                  style={{
                    width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.basic_200,
                  }}
                />

                <Meat ai="center" jc="center" br="20px" bgc={Colors.basic_100} w="40px" h="40px" shadowed>
                  <Text fs={10} color={Colors.purple} fnw="700">{'meat\nfread'}</Text>
                </Meat>
              </Picture>
            )}

            <StyledGradient
              mt={user?.photoURL ? '56px' : '10px'}
              locations={[0.46, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[Colors.gradient_100, Colors.gradient_200]}
            >
              <Box>
                <Box ai="center">
                  <Text fnw="bold" color={Colors.basic_100}>{t('offers.member')}</Text>
                  <Text mt={4} fs={12} fnw="500" color={Colors.basic_100}>{t('offers.status', { tier: 'Tier 4' })}</Text>
                </Box>

                {user?.name && (
                  <Box fd="row" jc="center">
                    <Text fs={12} color={Colors.basic_100}>{`${t('labels.name')}: `}</Text>
                    <Text fs={14} fnw="bold" color={Colors.basic_100}>{user?.name}</Text>
                  </Box>
                )}

                {user?.email && (
                  <Box mt={4} fd="row" jc="center">
                    <Text fs={12} color={Colors.basic_100}>{`${t('labels.email')}: `}</Text>
                    <Text fs={14} fnw="bold" color={Colors.basic_100}>{user?.email}</Text>
                  </Box>
                )}
              </Box>
            </StyledGradient>
          </Box>

          <Text fs={14} fnw="600" color={Colors.purple} m={[10, 0, 16]} ta="center">{t('offers.refer')}</Text>

          <StyledMarque
            speed={1}
            marqueeOnStart
            loop
            delay={2000}
          >
            <FlatList
              data={details.photos}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item: photo }) => (
                <MarqueCard source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photo.photo_reference}&maxwidth=500&key=${Config.GOOGLE_API_KEY}` }} />
              )}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </StyledMarque>

          <Text ta="center" fs={20} color={Colors.purple} fnw="600" mb={20}>{details?.name}</Text>

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
