import dayjs, { Dayjs } from 'dayjs';

export const DATE_FORMAT = 'YYYY/MM/DD';
export const ALTERNATIVE_DATE_FORMAT = 'YYYY-MM-DD';
export const MONTH_FORMAT = 'MMM DD';
export const LONG_FORMAT = 'MM/DD/YY hh:mm A';
export const BASIC_FORMAT = 'dd, MMM D h:mm A';
export const BASIC_FORMAT_WITH_YEAR = 'dd, MMM D YYYY';
export const SHORT_TIME_FORMAT = 'H:mm A';
export const GET_TIME_FORMAT = 'hh:mm:ss';

type DateTime = string | Date | number | Dayjs;

export const getLocalDateTime = () => dayjs().format(BASIC_FORMAT);

export const getBasicFormat = (data?: DateTime) => dayjs(data).format(BASIC_FORMAT);

export const getShortTimeFormat = (data?: DateTime) => dayjs(data).format(SHORT_TIME_FORMAT);

export const parseToLocalTime = (date?: DateTime) => dayjs(date);
