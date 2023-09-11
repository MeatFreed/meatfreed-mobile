import { useInterval } from '@lumitech/mobile-hooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { parseToLocalTime } from 'helpers';
import { useState } from 'react';

dayjs.extend(duration);

export const useGetRaffleTimer = (endDate: string) => {
  const raffleFinish = parseToLocalTime(endDate);

  const dayDiff = Math.max(raffleFinish.diff(dayjs(), 'days', true), 0);
  const diff = Math.max(raffleFinish.diff(dayjs()), 0);

  const days = Math.floor(dayDiff);

  const leftTime = dayjs.duration(diff);

  const [time, setTime] = useState(leftTime);

  useInterval(() => {
    setTime(leftTime);
  }, 1000);

  return { time, days };
};
