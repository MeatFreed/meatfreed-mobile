import React from 'react';
import {
  Colors, Spaces, Box, Text, FontSizes, FontFamily,
} from 'themes';
import { Icon } from '../Icon/Icon';

type InfoBlockType = 'info' | 'warning' | 'danger';

interface InfoBlockProps {
  iconName?: string;
  type: InfoBlockType;
  title: string;
}

const colorNames = {
  danger: Colors.danger_500,
  warning: Colors.warning_500,
  info: Colors.info_500,
};

const backgroundColorNames = {
  danger: Colors.danger_100,
  warning: Colors.warning_100,
  info: Colors.info_100,
};

export const InfoBlock: React.FC<InfoBlockProps> = ({
  iconName,
  type,
  title,
}) => (
  <Box ai="center" p={[Spaces.sm, Spaces.md]} bw="1px" fd="row" bc={colorNames[type]} br={`${Spaces.xs}px`} bgc={backgroundColorNames[type]}>
    {iconName && (
      <Icon name={iconName} size={22} color={colorNames[type]} />
    )}

    <Box f={1}>
      <Text
        color={Colors.basic_800}
        ml={iconName ? Spaces.sm - 2 : 0}
        fs={FontSizes.sm}
        ff={FontFamily.PoppinsMedium}
        lh={Spaces.xl + 2}
      >
        {title}
      </Text>
    </Box>
  </Box>
);
