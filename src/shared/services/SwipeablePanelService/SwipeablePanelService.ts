import type { BottomSheetMethods } from '@gorhom/bottom-sheet/src/types';
import { createRef } from 'react';

const panelRef = createRef<BottomSheetMethods>();

const onOpenToTop = () => {
  panelRef.current?.expand();
};

const onCloseToDefaultState = () => {
  panelRef.current?.collapse();
};

const onHide = () => {
  panelRef.current?.close();
};

export const SwipeablePanelService = {
  panelRef,
  onOpenToTop,
  onHide,
  onCloseToDefaultState,
};
