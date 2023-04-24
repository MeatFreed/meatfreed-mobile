import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteService, ToastService } from 'services';
import { useTypedDispatch, useTypedSelector } from 'stores';
import { userSelectors, setUser } from 'stores/user';
import {
  Box, FontFamily, FontSizes, Spaces, Text,
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

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const user = useTypedSelector(userSelectors.user);
  const dispatch = useTypedDispatch();

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
        <Box f={1} p={[Spaces.md, Spaces.md, 0]} wdbg>
          <Text mb={Spaces.xl} fs={FontSizes.lg} fnw="600" ff={FontFamily.PoppinsSemiMedium}>{t('settings.general')}</Text>

          <Input
            value={values.firstName}
            label={t('labels.first-name')}
            placeholder={t('placeholders.first-name')}
            onBlur={handleBlur('firstName')}
            onChangeText={handleChange('firstName')}
            isError={!!errors.firstName && !!touched.firstName}
            error={errors.firstName ? t(errors.firstName) : ''}
            withBottomOffset
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
          />

          <Text mb={Spaces.xl} fs={FontSizes.lg} fnw="600" ff={FontFamily.PoppinsSemiMedium}>{t('settings.main-contacts')}</Text>

          <Input
            value={values.email}
            label={t('labels.email')}
            placeholder={t('placeholders.email')}
            onBlur={handleBlur('email')}
            onChangeText={handleChange('email')}
            isError={!!errors.email && !!touched.email}
            error={errors.email ? t(errors.email) : ''}
            withBottomOffset
          />
        </Box>
      </KeyboardAwareView>
    </>
  );
};
