import React from 'react';
import {
  Box, Colors, FontFamily, FontSizes, Text,
} from 'themes';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { isIOS, truncate } from 'helpers';

const StyledContainer = styled(Box)<{y: number}>`
  transform:  ${({ y }) => `translateY(${y}px)`} 
`;

interface DescriptionProps {
  description: string;
}

export const Description: React.FC<DescriptionProps> = ({ description }) => {
  const { t } = useTranslation();

  return (
    <Box p={[8, 12]}>
      <Text lh={24} color={Colors.basic_800} fs={FontSizes.md} ff={FontFamily.PoppinsMedium} fnw="500">
        {truncate(description, 70)}

        {description.length + 1 > 70 && (
          <StyledContainer y={isIOS ? 2 : 3.2}>
            <Text
              ttd="underline"
              ttdc={Colors.primary_500}
              ttds="solid"
              lh={24}
              fs={FontSizes.md}
              ff={FontFamily.PoppinsMedium}
              fnw="500"
              color={Colors.primary_600}
            >
              {`  ${t('buttons.more')}`}
            </Text>
          </StyledContainer>
        )}
      </Text>
    </Box>
  );
};
