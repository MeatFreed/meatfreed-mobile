/* eslint-disable no-empty */
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StoryblokService } from 'services';

const { client } = StoryblokService;

export const useGetVoucherCode = (code: string) => {
  const isFocused = useIsFocused();

  const [offerCode, setOfferCode] = useState<string | undefined>(undefined);

  const getVoucherCode = async () => {
    const response = await client.get(`cdn/stories/${code}`, {
      find_by: 'uuid',
    });

    if (response?.data?.story?.content?.code) {
      setOfferCode(response?.data?.story?.content?.code);
    }
  };

  useEffect(() => {
    if (code && isFocused) {
      getVoucherCode();
    }
  }, [code, isFocused]);

  return {
    offerCode,
  };
};
