import React from 'react';
import {
  Box, FontFamily, Text, Colors, Spaces,
} from 'themes';
import { Switch as SwitchComponent } from 'react-native-switch';
import { StyleSheet } from 'react-native';

interface SwitchProps {
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  withBottomOffset?: boolean;
}

const styles = StyleSheet.create({
  innerCircleStyle: {
    borderColor: 'transparent',
  },
  outerCircleStyle: {
    borderColor: 'transparent',
  },
});

export const Switch: React.FC<SwitchProps> = ({
  withBottomOffset,
  title,
  value,
  onValueChange,
}) => (
  <Box mb={withBottomOffset ? Spaces.md : 0}>
    <Box fd="row" w="100%" ai="center" p={[Spaces.sm, 0]} jc="space-between">
      <Text ff={FontFamily.PoppinsMedium}>{title}</Text>

      <SwitchComponent
        backgroundActive={Colors.basic_550}
        backgroundInactive={Colors.basic_500}
        circleSize={28}
        value={value}
        onValueChange={onValueChange}
        renderActiveText={false}
        renderInActiveText={false}
        changeValueImmediately
        circleActiveColor={Colors.switch}
        innerCircleStyle={styles.innerCircleStyle}
        outerCircleStyle={styles.outerCircleStyle}
        switchWidthMultiplier={2}
        switchLeftPx={2.5}
        switchRightPx={2.5}
        barHeight={32}
      />
    </Box>

    <Box w="100%" h="1px" bgc={Colors.basic_300} />
  </Box>
);
