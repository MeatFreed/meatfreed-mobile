import React from 'react';
import { Posts } from 'screens';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { Stack, headerOptions } from './NavigationOptions';

export const PostsNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Routes.POSTS}
        component={Posts}
        options={{ headerTitle: t('screens.posts'), headerShown: false }}
      />
    </Stack.Navigator>
  );
};
