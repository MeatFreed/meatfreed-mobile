import React from 'react';
import Modal from 'react-native-modal';
import { Dimensions, ActivityIndicator as Indicator } from 'react-native';
import { Box, Colors } from 'themes';

interface ActivityIndicatorProps {
  isVisible: boolean
}

const { width, height } = Dimensions.get('screen');

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ isVisible }) => (
  <Modal
    statusBarTranslucent
    backdropOpacity={0.4}
    backdropColor="#000"
    isVisible={isVisible}
    animationIn="fadeIn"
    animationOut="fadeOut"
    deviceHeight={height}
    deviceWidth={width}
  >
    <Box f={1} jc="center" ai="center">
      <Indicator size="large" color={Colors.primary_500} />
    </Box>
  </Modal>
);
