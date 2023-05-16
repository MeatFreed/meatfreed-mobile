import { useInterval } from '@lumitech/mobile-hooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { parseToLocalTime } from 'helpers';
import { useState } from 'react';

dayjs.extend(duration);

export const useGetRaffleTimer = (endDate: string) => {
  const raffleFinish = parseToLocalTime(endDate);

  const diff = Math.max(raffleFinish.diff(dayjs()), 0);

  const leftTime = dayjs.duration(diff);

  const [time, setTime] = useState(leftTime);

  useInterval(() => {
    setTime(leftTime);
  }, 1000);

  return { time };
};
