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
  hasLine?: boolean;
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
  hasLine = true,
}) => (
  <Box mb={withBottomOffset ? Spaces.md : 0}>
    <Box fd="row" w="100%" ai="center" p={[Spaces.sm, 0]} jc="space-between">
      <Text ff={FontFamily.PoppinsMedium}>{title}</Text>

      <SwitchComponent
        backgroundActive={Colors.primary_500}
        backgroundInactive={Colors.basic_500}
        circleSize={28}
        value={value}
        onValueChange={onValueChange}
        renderActiveText={false}
        renderInActiveText={false}
        changeValueImmediately
        circleActiveColor={Colors.basic_100}
        innerCircleStyle={styles.innerCircleStyle}
        outerCircleStyle={styles.outerCircleStyle}
        switchWidthMultiplier={2}
        switchLeftPx={2.5}
        switchRightPx={2.5}
        barHeight={32}
      />
    </Box>

    {hasLine && <Box w="100%" h="1px" bgc={Colors.basic_400} />}
  </Box>
);
