import React from 'react';
import Message, { BaseToastProps } from 'react-native-toast-message';

import { ToastBase } from './ToastBase';

export type ToastTypes = 'success' | 'danger' | 'warning' | 'info';

const config = {
  success: ({ text1 }: BaseToastProps) => (
    <ToastBase title={text1} type="success" />
  ),
  info: ({ text1 }: BaseToastProps) => (
    <ToastBase title={text1} type="info" />
  ),
  danger: ({ text1 }: BaseToastProps) => (
    <ToastBase title={text1} type="danger" />
  ),
  warning: ({ text1 }: BaseToastProps) => (
    <ToastBase title={text1} type="warning" />
  ),
};

export const ToastMessage: React.FC = () => (
  <Message config={config} />
);
