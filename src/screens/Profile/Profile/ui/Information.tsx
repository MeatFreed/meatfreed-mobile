import React from 'react';
import { Dimensions } from 'react-native';
import {
  Box, Spaces, Text, Colors,
} from 'themes';
import { Icon } from 'ui';

type InformationSize = 's' | 'm' | 'l';

interface InformationProps {
  iconName?: string;
  description?: string | null;
  size?: InformationSize;
}

const informationSizes: Record<string, number> = {
  s: 14,
  m: 16,
  l: 20,
};

const { width } = Dimensions.get('window');

export const Information: React.FC<InformationProps> = ({ iconName, description = '', size = 's' }) => (
  <Box p={[4, 12]} h="52px" w={`${width - 32}px`} m={[16, 16, 0]} br="8px" ai="center" fd="row">
    {iconName && <Icon name={iconName} color={Colors.basic_600} size={20} />}

    <Text
      fs={informationSizes[size]}
      color={Colors.basic_600}
      ml={Spaces.xs}
      numberOfLines={2}
    >
      {description}
    </Text>
  </Box>
);
