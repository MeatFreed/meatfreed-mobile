import { TextStyle } from 'react-native';
import { Colors } from './Colors';

export interface StyledProps {
  /** flex */
  f?: number;

  /** flex-direction */
  fd?: string;

  /** justify-content */
  jc?: string;

  /** flex-wrap */
  fw?: string;

  /** align-items */
  ai?: string;

  /** with default padding (16px) */
  wdp?: boolean;

  fnw?: TextStyle['fontWeight'];

  /** margin-top */
  mt?: number;

  /** margin-bottom */
  mb?: number;

  /** margin-left */
  ml?: number;

  /** margin-right */
  mr?: number;

  /** margin */
  m?: number | number[];

  /** padding-top */
  pt?: number;

  /** padding-bottom */
  pb?: number;

  /** padding-left */
  pl?: number;

  /** padding-right */
  pr?: number;

  /** padding */
  p?: number | number[];

  /** width */
  w?: string;

  /** height */
  h?: string;

  /** min height */
  mh?: string;

  /** border-width */
  bw?: string;

  /** border-color */
  bc?: string;

  /** border-radius */
  br?: string;

  /** background-color */
  bgc?: string;

  /** text-align */
  ta?: string;

  /** text-transform */
  ttf?: string;

  /** text-decoration */
  ttd?: string;

  /** text-decoration-color */
  ttdc?: string;

  /** font-family */
  ff?: string;

  /** font-size */
  fs?: number;

  /** color */
  color?: string;

  /** text-decoration-style */
  ttds?: string;

  /** z-index */
  z?: number;

  /** with default background (Colors.background) */
  wdbg?: boolean;

  /* with shadow */
  shadowed?: boolean;
}

export const constructBgc = (withDefaultBg?: boolean, bgc?: string) => {
  if (withDefaultBg) {
    return Colors.white;
  }

  if (bgc) {
    return bgc;
  }

  return 'transparent';
};

export const constructSizing = (props: StyledProps, type: 'padding' | 'margin') => {
  const {
    ml, mr, mb, mt, m, pl, pr, pb, pt, p, wdp,
  } = props;

  const isMargin = type === 'margin';

  const top = isMargin ? mt : pt;
  const right = isMargin ? mr : pr;
  const bottom = isMargin ? mb : pb;
  const left = isMargin ? ml : pl;

  const sizing = isMargin ? m : p;
  const defaultPadding = wdp ? 16 : 0;

  if (top) {
    return `${type}-top: ${top}px`;
  }

  if (right) {
    return `${type}-right: ${right}px`;
  }

  if (bottom) {
    return `${type}-bottom: ${bottom}px`;
  }

  if (left) {
    return `${type}-left: ${left}px`;
  }

  if (Array.isArray(sizing)) {
    return `${type}: ${sizing.map((value) => `${value}px`).join(' ')}`;
  }

  if (wdp) {
    return `padding: ${defaultPadding}px`;
  }

  return `${type}: ${sizing || 0}px`;
};
