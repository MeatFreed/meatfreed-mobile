import React from 'react';
import { Box, Colors } from 'themes';
import { StatusBar } from 'ui';
import { FeaturedOffers, AvailableOffers } from './ui';

export const AllOffers: React.FC = () => (
  <Box f={1} bgc={Colors.basic_150}>
    <StatusBar />

    <FeaturedOffers />

    <AvailableOffers />
  </Box>
);
