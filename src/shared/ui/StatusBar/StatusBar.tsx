import { useInterval } from '@lumitech/mobile-hooks';
import { useIsFocused } from '@react-navigation/native';
import { getStatusBar } from 'helpers';
import { Routes } from 'navigation';
import React, { useLayoutEffect, useState } from 'react';
import { StatusBar as Bar } from 'react-native';
import { RouteService } from 'services';

export const StatusBar = React.memo(() => {
  const isFocused = useIsFocused();
  const [isChangeStatusBar, setIsChangeStatusBar] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useInterval(() => {
    setIsReady(RouteService.navigationRef?.isReady());
  }, isReady ? null : 1);

  useLayoutEffect(() => {
    if (isFocused && isReady) {
      const status = getStatusBar(
        RouteService?.navigationRef?.getCurrentRoute?.()?.name as Routes,
      );

      setIsChangeStatusBar(status);
    }
  }, [isFocused, isReady]);

  return (
    <Bar
      barStyle={isChangeStatusBar ? 'light-content' : 'dark-content'}
      backgroundColor="transparent"
      translucent
    />
  );
});
