import Toast, { ToastPosition } from 'react-native-toast-message';
import { hasNotch } from 'helpers';

type TypeProps = 'success' | 'danger' | 'warning';

interface ToastParams {
  type?: TypeProps;
  position?: ToastPosition,
  title: string;
  description?: string;
}

const onBase = ({
  title, description, type, position,
}: ToastParams) => {
  const offset = hasNotch ? 52 : 32;

  Toast?.show({
    text1: title,
    text2: description || '',
    type,
    position: position || 'bottom',
    autoHide: true,
    topOffset: offset,
    visibilityTime: 3000,
  });
};

const onSuccess = (params: ToastParams) => {
  onBase({ ...params, type: 'success' });
};

const onDanger = (params: ToastParams) => {
  onBase({ ...params, type: 'danger' });
};

const onWarning = (params: ToastParams) => {
  onBase({ ...params, type: 'warning' });
};

const onHide = () => Toast.hide();

export const ToastService = {
  onSuccess,
  onDanger,
  onHide,
  onWarning,
};
