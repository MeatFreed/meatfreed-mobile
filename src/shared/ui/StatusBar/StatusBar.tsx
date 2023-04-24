import { useIsFocused } from '@react-navigation/native';
import { getStatusBar } from 'helpers';
import { Routes } from 'navigation';
import React, { useLayoutEffect, useState } from 'react';
import { StatusBar as Bar } from 'react-native';
import { RouteService } from 'services';

export const StatusBar = React.memo(() => {
  const isFocused = useIsFocused();
  const [isChangeStatusBar, setIsChangeStatusBar] = useState(false);

  useLayoutEffect(() => {
    if (isFocused && RouteService.navigationRef?.isReady()) {
      const status = getStatusBar(
        RouteService?.navigationRef?.getCurrentRoute?.()?.name as Routes,
      );

      setIsChangeStatusBar(status);
    }
  }, [isFocused]);

  return isFocused ? (
    <Bar
      barStyle={isChangeStatusBar ? 'dark-content' : 'dark-content'}
      backgroundColor="transparent"
      translucent
    />
  ) : null;
});
