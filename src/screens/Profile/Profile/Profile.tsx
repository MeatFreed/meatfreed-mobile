import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import {
  Box, Colors, FontFamily, Images, Spaces, Text,
} from 'themes';
import { Avatar, Button, StatusBar } from 'ui';
import { useUploadPhoto } from 'hooks';
import { useTranslation } from 'react-i18next';
import { touchableConfig } from 'helpers';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Statistics } from './ui';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: Spaces['2xl'],
  },
});

const StyledButton = styled.TouchableOpacity`
  height: 55px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${Colors.basic_400};
  background-color: ${Colors.basic_100};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Profile: React.FC = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const user = useTypedSelector(userSelectors.user);

  const { onUploadPhoto, isLoading } = useUploadPhoto();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box fd="row">
          <Button
            type="icon"
            iconName="settings"
            iconColor={Colors.basic_700}
            onPress={() => RouteService.navigate(Routes.SETTINGS)}
          />
        </Box>
      ),
    });
  }, [navigation]);

  return (
    <>
      <StatusBar />

      <Box f={1} bgc={Colors.basic_150}>
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          <Box p={Spaces.md} ai="center" jc="center" bgc={Colors.basic_100}>
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
              <Text fs={22} lh={32} fnw="500" ff={FontFamily.PoppinsSemiMedium} color={Colors.basic_800}>{`${user?.firstName || ''} ${user?.lastName || ''}`}</Text>

              {!!user?.email && (
                <Text lh={32} color={Colors.basic_600}>{user?.email}</Text>
              )}
            </Box>
          </Box>

          <Box f={1} ai="center" p={Spaces.md}>
            <Text fs={18} lh={22} color={Colors.basic_800} ff={FontFamily.PoppinsMedium} ta="center">{t('profile.title')}</Text>

            <Text mt={4} lh={22} ta="center" color={Colors.basic_650}>{t('profile.description')}</Text>

            <Statistics />

            <StyledButton
              {...touchableConfig}
              onPress={() => RouteService.navigate(Routes.REFERRAL)}
            >
              <Images.ShareCode width={20} height={20} />

              <Text m={[2, 0, 0, 10]} ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>{t('buttons.share-referral-code')}</Text>
            </StyledButton>

          </Box>
        </ScrollView>
      </Box>
    </>
  );
};
