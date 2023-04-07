import styled from 'styled-components/native';
import { Colors } from './Colors';
import { FontFamily } from './Typography';
import { constructBgc, constructSizing, StyledProps } from './StyledConstructors';

export const shadow = `
  shadow-color: ${Colors.basic_700};
  shadow-offset: 2px 2px;
  shadow-opacity: 0.20;
  elevation: 5;
`;

export const Text = styled.Text<StyledProps>`
  font-family: ${({ ff }) => ff || FontFamily.Regular};
  font-size: ${({ fs }) => `${fs || 16}px`};
  font-weight: ${({ fnw }) => `${fnw || 'normal'}`};
  color: ${({ color }) => color || Colors.basic_800};
  text-align: ${({ ta }) => ta || 'left'};
  text-transform: ${({ ttf }) => ttf || 'none'};
  text-decoration: ${({ ttd }) => ttd || 'none'};
  text-decoration-style: ${({ ttds }) => ttds || 'dotted'};
  text-decoration-color: ${({ ttdc }) => ttdc || 'transparent'};

  ${(props) => constructSizing(props, 'margin')};
  ${(props) => constructSizing(props, 'padding')};

  width: ${({ w }) => w || 'auto'};
  height: ${({ h }) => h || 'auto'};
`;

export const Box = styled.View<StyledProps>`
  flex: ${({ f }) => f || '0 1 auto'};
  flex-direction: ${({ fd }) => fd || 'column'};
  justify-content: ${({ jc }) => jc || 'flex-start'};
  flex-wrap: ${({ fw }) => fw || 'nowrap'};

  align-items: ${({ ai }) => ai || 'stretch'};

  ${(props) => constructSizing(props, 'margin')};
  ${(props) => constructSizing(props, 'padding')};

  border-width: ${({ bw }) => bw || '0px'};
  border-color: ${({ bc }) => bc || 'transparent'};

  border-radius: ${({ br }) => br || '0px'};
  background-color: ${({ wdbg, bgc }) => constructBgc(wdbg, bgc)};

  width: ${({ w }) => w || 'auto'};
  height: ${({ h }) => h || 'auto'};
  min-height: ${({ mh }) => mh || 'auto'};
  ${({ shadowed }) => shadowed && shadow}

  z-index: ${({ z }) => z || 1};
`;

export const HorizontalDivider = styled.View<{ withoutSpace?: boolean, color?: string }>`
  width: 100%;
  height: 1px;
  background-color: ${({ color }) => color || Colors.basic_300};
  margin-vertical: ${({ withoutSpace }) => (withoutSpace ? '0px' : '12px')};
`;
