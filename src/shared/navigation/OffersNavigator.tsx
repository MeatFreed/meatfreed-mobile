import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, Images, Spaces, Text,
} from 'themes';
import styled from 'styled-components/native';
import { isIOS } from 'helpers';
import { useTypedSelector } from 'stores';
import { notificationsSelectors } from 'stores/notifications';
import { RouteService } from 'services';
import { Routes } from './Routes';
import { OffersTopTabNavigator } from './tabs/OffersTopTabNavigator';
import { Stack, headerOptions } from './NavigationOptions';

const IconButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const Badge = styled(Box)`
  position: absolute;
  right: 2.5px;
  top: 2.5px;
  min-height: 15px;
  min-width: 15px;
  border-radius: 100px;
`;

export const OffersNavigator: React.FC = () => {
  const { t } = useTranslation();

  const notifications = useTypedSelector(notificationsSelectors.notifications);

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Routes.OFFERS_TOP_TAB_NAVIGATOR}
        component={OffersTopTabNavigator}
        options={{
          headerTitle: t('screens.offers'),
          headerRight: () => (
            <Box fd="row" mr={isIOS ? Spaces.xs : -Spaces.xs}>
              <IconButton onPress={() => RouteService.navigate(Routes.BOTTOM_TAB_BAR_NAVIGATOR, {
                screen: Routes.MY_WALLET_NAVIGATOR,
              })}
              >
                {!!notifications.length && (
                  <Badge bw="1px" bc={Colors.basic_100} ai="center" jc="center" bgc={Colors.primary_500}>
                    <Text fs={10} lh={14} fnw="bold" color={Colors.basic_100}>{notifications.length}</Text>
                  </Badge>
                )}

                <Images.Wallet />
              </IconButton>
            </Box>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
