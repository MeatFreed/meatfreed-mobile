import React from 'react';
import { SignUpConfirmation, Welcome } from 'screens';
import { isIOS } from 'helpers';
import { Colors, FontFamily } from 'themes';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { NativeStack, Stack as BasicStack, welcomeOptions } from './NavigationOptions';

const Stack = isIOS ? BasicStack : NativeStack;

export const AuthNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={welcomeOptions}>
      <Stack.Screen
        name={Routes.WELCOME}
        component={Welcome}
        options={{
          headerTitle: t('screens.membership'),
          headerTitleStyle: {
            fontSize: 28,
            fontFamily: FontFamily.PoppinsSemiMedium,
            fontWeight: '600',
            color: Colors.basic_100,
          },
        }}
      />

      <Stack.Screen
        name={Routes.SIGN_UP_CONFIRMATION}
        component={SignUpConfirmation}
        options={{
          headerLeft: () => null,
          headerTitle: t('screens.membership'),
          headerTitleStyle: {
            fontSize: 28,
            fontFamily: FontFamily.PoppinsSemiMedium,
            fontWeight: '600',
            color: Colors.basic_100,
          },
        }}
      />
    </Stack.Navigator>
  );
};
