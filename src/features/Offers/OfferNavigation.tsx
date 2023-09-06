import { useWindowDimensions } from '@lumitech/mobile-hooks';
import { hasNotch } from 'helpers';
import React from 'react';
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

interface OfferNavigationProps {
  withoutIcon?: boolean;
  isDisabled?: boolean;
  title: string;
  isLoading?: boolean;
  onPress?: () => void;
}

export const OfferNavigation: React.FC<OfferNavigationProps> = ({
  title, onPress, isDisabled, isLoading, withoutIcon = false,
}) => {
  const { width } = useWindowDimensions();

  return (
    <StyledLayout w="100%" fd="row" p={[20, 20, hasNotch ? 32 : 20]} jc="space-between" bgc={Colors.basic_100}>
      <Box w={`${width - 40}px`}>
        <Button iconName={withoutIcon ? undefined : 'fire-work'} isLoading={isLoading} title={title} onPress={onPress} disabled={isDisabled} />
      </Box>
    </StyledLayout>
  );
};
