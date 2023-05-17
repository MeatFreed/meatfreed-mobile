import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteService, ToastService } from 'services';
import { useTypedDispatch, useTypedSelector } from 'stores';
import { userSelectors, setUser } from 'stores/user';
import {
  Box, Colors, FontFamily, FontSizes, Images, Spaces, Text,
} from 'themes';
import {
  ActivityIndicator,
  Button,
  Input,
  KeyboardAwareView,
  StatusBar,
} from 'ui';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import Config from 'react-native-config';
import { AnyType, openLink } from 'helpers';
import { useLogout } from 'hooks';
import { DeleteAccountModal, MenuItem } from './ui';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const SettingsSchema = Yup.object().shape({
  email: Yup.string().email('validations.email-invalid').required('validations.email-invalid'),
  firstName: Yup.string().required('validations.name-required'),
  lastName: Yup.string().required('validations.last-name-required'),
});

const { LIVE_CHAT_URL, LIVE_CHAT_LICENSE } = Config as AnyType;

export const Settings: React.FC = () => {
  const { t } = useTranslation();

  const [isShowDeleteAccountModal, setIsShowDeleteAccountModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const user = useTypedSelector(userSelectors.user);
  const dispatch = useTypedDispatch();

  const { onLogout } = useLogout();

  const onSubmit = async (values: Values) => {
    setIsLoading(true);

    try {
      await firestore().collection('users').doc(user.uid).update({
        ...user,
        ...values,
      });

      if (values.email) {
        auth().currentUser?.updateEmail(values.email);
      }

      dispatch(setUser({
        ...user,
        ...values,
      }));

      RouteService.goBack();
    } catch {
      ToastService.onDanger({ title: t('errors.server-unable') });
    } finally {
      setIsLoading(false);
    }
  };

  const {
    values, handleBlur, handleChange, handleSubmit, errors, touched,
  } = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user?.nickname || '',
      email: user.email,
    },
    validationSchema: SettingsSchema,
    enableReinitialize: true,
    onSubmit: (values) => onSubmit(values),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box mr={Spaces.md}>
          <Button type="label" title={t('buttons.save')} onPress={() => handleSubmit()} />
        </Box>
      ),
    });
  }, [navigation, handleSubmit]);

  return (
    <>
      <ActivityIndicator isVisible={isLoading} />

      <StatusBar />

      <KeyboardAwareView bounces={false} isScrollable>
        <Box f={1} p={[Spaces.md, 0, 0]} bgc={Colors.basic_150}>
          <Box m={[0, Spaces.md]}>
            <Text mb={Spaces.md} fs={FontSizes.lg} fnw="700" ff={FontFamily.PoppinsMedium}>{t('settings.account-settings')}</Text>

            <Input
              value={values.firstName}
              label={t('labels.first-name')}
              placeholder={t('placeholders.first-name')}
              onBlur={handleBlur('firstName')}
              onChangeText={handleChange('firstName')}
              isError={!!errors.firstName && !!touched.firstName}
              error={errors.firstName ? t(errors.firstName) : ''}
              withBottomOffset
              isWhite
            />

            <Input
              value={values.lastName}
              label={t('labels.last-name')}
              placeholder={t('placeholders.last-name')}
              onBlur={handleBlur('lastName')}
              onChangeText={handleChange('lastName')}
              isError={!!errors.lastName && !!touched.lastName}
              error={errors.lastName ? t(errors.lastName) : ''}
              withBottomOffset
              isWhite
            />

            <Input
              value={values.email}
              label={t('labels.email')}
              placeholder={t('placeholders.email')}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              isError={!!errors.email && !!touched.email}
              error={errors.email ? t(errors.email) : ''}
              withBottomOffset
              isWhite
            />

            <Text mb={Spaces.md} fs={FontSizes.lg} fnw="700" ff={FontFamily.PoppinsMedium}>{t('settings.general')}</Text>

          </Box>

          <MenuItem Icon={<Images.Support />} title={t('menu.support')} onPress={() => openLink(`${LIVE_CHAT_URL}=${LIVE_CHAT_LICENSE}`)} />

          <MenuItem Icon={<Images.Privacy />} title={t('menu.privacy')} onPress={() => openLink('https://www.meatfreed.com/privacypolicy/')} />

          <MenuItem Icon={<Images.Terms />} title={t('menu.terms')} onPress={() => openLink('https://www.meatfreed.com/termsandconditions/')} />

          <MenuItem Icon={<Images.Logout />} title={t('menu.logout')} onPress={onLogout} />

          <MenuItem Icon={<Images.Delete />} hasLine={false} title={t('menu.delete')} onPress={() => setIsShowDeleteAccountModal(true)} />

          <DeleteAccountModal
            isModalVisible={isShowDeleteAccountModal}
            onModalClose={() => setIsShowDeleteAccountModal(false)}
          />
        </Box>
      </KeyboardAwareView>
    </>
  );
};
