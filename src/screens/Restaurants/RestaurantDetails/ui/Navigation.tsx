import { useWindowDimensions } from '@lumitech/mobile-hooks';
import { hasNotch } from 'helpers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { Box, Colors } from 'themes';
import { Button } from 'ui';

const StyledLayout = styled(Box)`
  position: absolute;
  bottom: 0px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border: 1px solid ${Colors.basic_400};
`;

interface NavigationProps {
  hasPhoneNumber: boolean;
  onDirection: () => void;
  onCall: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ hasPhoneNumber, onDirection, onCall }) => {
  const { t } = useTranslation();

  const { width } = useWindowDimensions();

  const BUTTON_WIDTH = (width - 60) / 2;

  return (
    <StyledLayout w="100%" fd="row" p={[20, 20, hasNotch ? 32 : 20]} jc="space-between" bgc={Colors.basic_100}>
      <Box w={hasPhoneNumber ? `${BUTTON_WIDTH}px` : `${width - 40}px`}>
        <Button iconName="position" title={t('buttons.directions')} onPress={onDirection} />
      </Box>

      {hasPhoneNumber && (
        <Box w={`${BUTTON_WIDTH}px`}>
          <Button iconName="position" title={t('buttons.call')} onPress={onCall} />
        </Box>
      )}
    </StyledLayout>
  );
};
