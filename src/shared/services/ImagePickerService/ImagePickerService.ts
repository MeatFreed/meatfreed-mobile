import { uuid } from 'helpers';
import ImagePicker, { Options } from 'react-native-image-crop-picker';

const options: Options = {
  cropping: true,
  multiple: false,
  forceJpg: true,
  writeTempFile: true,
  mediaType: 'photo',
  compressImageQuality: 0.8,
  freeStyleCropEnabled: true,
  includeExif: true,
};

export const launchSingleImage = async () => {
  const response = await ImagePicker.openPicker(options);

  if (response.path) {
    const fileExtension = response.path.split('.').pop();

    return {
      uri: response.path,
      fileName: `${uuid()}.${fileExtension}`,
    };
  }

  return null;
};

export const ImagePickerService = {
  launchSingleImage,
};
