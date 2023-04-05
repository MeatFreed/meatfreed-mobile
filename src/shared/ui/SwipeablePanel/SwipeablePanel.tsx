import BottomSheet, { BottomSheetProps, BottomSheetBackdrop, BottomSheetHandle } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/src/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnyType } from 'helpers';
import { Box, Colors } from 'themes';

interface SwipeablePanelProps extends BottomSheetProps {
  isShowHandleIndicator?: boolean;
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: Colors.white,
  },
});

export const SwipeablePanel = React.forwardRef<BottomSheetMethods, SwipeablePanelProps>(
  ({ children, isShowHandleIndicator = false, ...rest }, ref) => {
    const { top: topSafeArea } = useSafeAreaInsets();

    const renderBackdrop = useCallback(
      (props: AnyType) => <BottomSheetBackdrop {...props} pressBehavior="collapse" />,
      [],
    );

    const handleComponent = useCallback(
      (props: AnyType) => (isShowHandleIndicator ? <BottomSheetHandle {...props} /> : null),
      [isShowHandleIndicator],
    );

    return (
      <Portal>
        <BottomSheet
          ref={ref}
          snapPoints={rest.snapPoints}
          backgroundStyle={styles.backgroundStyle}
          topInset={topSafeArea}
          backdropComponent={renderBackdrop}
          handleHeight={isShowHandleIndicator ? 2 : 0}
          handleIndicatorStyle={undefined}
          handleComponent={handleComponent}
          animateOnMount
        >
          <Box f={1} p={[0, 10, 30]}>{children}</Box>
        </BottomSheet>
      </Portal>
    );
  },
);
