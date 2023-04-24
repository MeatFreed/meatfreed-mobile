import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, SwipeablePanel } from 'ui';
import {
  Box, Spaces, Colors, Text, FontFamily,
} from 'themes';
import { SwipeablePanelService } from 'services';
import styled from 'styled-components/native';
import { touchableConfig } from 'helpers';

interface MenuPanelProps {
  onDelete: () => void;
  onLogout: () => Promise<void>;
}

const StyledButton = styled.TouchableOpacity<{ bc: string }>`
  height: 52px;
  padding: 0px 10px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ bc }) => bc};
  background-color: 'transparent';
`;

export const MenuPanel: React.FC<MenuPanelProps> = ({ onDelete, onLogout }) => {
  const { t } = useTranslation();

  const snapPoints = useMemo(() => [0.1, '28%'], []);

  return (
    <SwipeablePanel ref={SwipeablePanelService.panelRef} snapPoints={snapPoints}>
      <Box m={[Spaces['2xl'], Spaces.lg, 0]}>

        <StyledButton {...touchableConfig} bc={Colors.danger_400} onPress={onDelete}>
          <Icon
            name="person-delete-outline"
            size={24}
            color={Colors.danger_400}
          />

          <Text m={[0, 6]} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.danger_400}>{t('buttons.delete-account')}</Text>
        </StyledButton>

        <Box mt={Spaces.md}>
          <StyledButton {...touchableConfig} bc={Colors.basic_600} onPress={onLogout}>
            <Icon
              name="log-out-outline"
              size={24}
              color={Colors.basic_600}
            />

            <Text m={[0, 6]} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_600}>{t('buttons.logout')}</Text>
          </StyledButton>
        </Box>
      </Box>
    </SwipeablePanel>
  );
};
