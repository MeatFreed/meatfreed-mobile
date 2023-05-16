/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { Box, Colors } from 'themes';
import { Dot } from './Dot';

interface PaginationProps {
  steps: number;
  activeIndex: number;
}

const StyledPagination = styled(Box)`
  position: absolute;
  bottom: 20px;
`;

export const Pagination: React.FC<PaginationProps> = ({ steps, activeIndex }) => {
  const length = useMemo(() => Array(steps).fill(0), [steps]);

  return (
    <StyledPagination bgc={Colors.basic_transparent_32} br="30px" p={[4, 4]} fd="row" jc="center" ai="center">
      {length.map((_, index) => (
        <Dot key={index} isActive={index === activeIndex} />
      ))}
    </StyledPagination>
  );
};
