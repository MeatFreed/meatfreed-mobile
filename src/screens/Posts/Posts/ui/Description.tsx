import React from 'react';
import {
  Box, Colors, FontFamily, FontSizes, Text,
} from 'themes';
import { truncate } from 'helpers';
import { TouchableOpacity } from 'react-native';

interface DescriptionProps {
  description: string;
  isShowFullDescription?: boolean;
  onPress?: () => void;
}

export const Description: React.FC<DescriptionProps> = ({
  description, isShowFullDescription = false, onPress,
}) => (
  <Box p={[8, 12]} z={2}>
    <TouchableOpacity
      onPress={onPress}
    >
      <Text lh={24} color={Colors.basic_100} fs={FontSizes.md} ff={FontFamily.PoppinsMedium} fnw="500">

        {truncate(
          description,
          description.length > 70 && isShowFullDescription ? description.length + 1 : 70,
        )}
      </Text>
    </TouchableOpacity>
  </Box>
);
