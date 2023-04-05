import React, { ReactNode } from 'react';
import RNModal from 'react-native-modal';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { touchableConfig } from 'helpers';
import { Box, Colors } from 'themes';

interface ModalProps {
  children: ReactNode | ReactNode[];
  isModalVisible: boolean;
  isHideCloseIcon?: boolean;
  hasKeyboardSpace?: boolean;
  onModalClose: () => void;
  onBackdropPress?: () => void;
}

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 999;
`;

const Modal: React.FC<ModalProps> = ({
  children,
  isModalVisible,
  onBackdropPress,
  onModalClose,
  hasKeyboardSpace,
  isHideCloseIcon = false,
  ...rest
}) => (
  <RNModal
    {...rest}
    isVisible={isModalVisible}
    onBackdropPress={onBackdropPress}
    backdropTransitionOutTiming={0}
    animationIn="zoomIn"
    animationOut="fadeOut"
  >
    <Box bgc={Colors.white} mb={hasKeyboardSpace ? 100 : 0} p={24} br="22px">
      {!isHideCloseIcon && (
        <CloseButton {...touchableConfig} onPress={onModalClose}>
          <AntDesign name="close" size={24} color={Colors.basic_800} />
        </CloseButton>
      )}

      {children}
    </Box>
  </RNModal>
);

export { Modal };
