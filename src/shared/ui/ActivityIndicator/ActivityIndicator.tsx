import React from 'react';
import Modal from 'react-native-modal';
import { ActivityIndicator as Indicator } from 'react-native';
import { Box, Colors } from 'themes';

interface ActivityIndicatorProps {
  isVisible: boolean
}

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ isVisible }) => (
  <Modal
    backdropOpacity={0.4}
    backdropColor="#000"
    isVisible={isVisible}
    animationIn="fadeIn"
    animationOut="fadeOut"
  >
    <Box f={1} jc="center" ai="center">
      <Indicator size="large" color={Colors.purple} />
    </Box>
  </Modal>
);
