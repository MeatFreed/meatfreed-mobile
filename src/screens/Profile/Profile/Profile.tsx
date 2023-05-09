import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AnyType, openLink } from 'helpers';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import { SwipeablePanelService } from 'services';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import {
  Box, Colors, FontFamily, Spaces, Text,
} from 'themes';
import { Avatar, Button, StatusBar } from 'ui';
import { useLogout, useUploadPhoto } from 'hooks';
import {
  DeleteAccountModal,
  Information, MenuItem, MenuPanel, Statistics,
} from './ui';
import { menuItems } from './constants';

const { LIVE_CHAT_URL, LIVE_CHAT_LICENSE } = Config as AnyType;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: Spaces['2xl'],
  },
});

export const Profile: React.FC = () => {
  const [isShowDeleteAccountModal, setIsShowDeleteAccountModal] = useState(false);

  const user = useTypedSelector(userSelectors.user);

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const { onUploadPhoto, isLoading } = useUploadPhoto();

  const { onLogout } = useLogout();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box fd="row">
          <Box mr={6}>
            <Button
              type="icon"
              iconName="message-circle-outline"
              iconColor={Colors.basic_800}
              onPress={() => openLink(`${LIVE_CHAT_URL}=${LIVE_CHAT_LICENSE}`)}
            />
          </Box>

          <Box mr={6}>
            <Button
              type="icon"
              iconName="more-vertical"
              iconColor={Colors.basic_800}
              onPress={() => SwipeablePanelService.onOpenToTop()}
            />
          </Box>
        </Box>
      ),
    });
  }, [navigation]);

  const onDelete = () => {
    SwipeablePanelService.onHide();

    setIsShowDeleteAccountModal(true);
  };

  return (
    <>
      <StatusBar />

      <Box f={1} bgc={Colors.basic_150}>
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          <Box p={[Spaces.md, Spaces.md, 0]} ai="center" jc="center">
            <Box>
              <Avatar
                type="add-photo"
                size="s"
                uri={user?.photoURL}
                isLoading={isLoading}
                onPress={onUploadPhoto}
              />
            </Box>

            <Box ai="center" mt={Spaces.md}>
              <Text fs={18} fnw="700" ff={FontFamily.PoppinsBold} color={Colors.basic_800}>{`${user?.firstName || ''} ${user?.lastName || ''}`}</Text>
            </Box>

            <Statistics />

            {!!user?.email && (
              <Box mt={-Spaces.lg}>
                <Information
                  iconName="email-outline"
                  description={user?.email}
                  size="s"
                />
              </Box>
            )}

            <Box f={1}>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.title}
                  iconName={item.iconName}
                  title={item.title}
                  onPress={item.onPress}
                />
              ))}
            </Box>
          </Box>
        </ScrollView>
      </Box>

      {isFocused && (
        <MenuPanel
          onDelete={onDelete}
          onLogout={onLogout}
        />
      )}

      <DeleteAccountModal
        isModalVisible={isShowDeleteAccountModal}
        onModalClose={() => setIsShowDeleteAccountModal(false)}
      />
    </>
  );
};
