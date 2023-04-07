import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, FontFamily, FontSizes, Spaces, Text,
} from 'themes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Icon, Input, KeyboardAwareView, StatusBar,
} from 'ui';
import { Dimensions } from 'react-native';
import { Policy, Socials } from 'features';
import { useSignUp } from 'hooks';

const { width } = Dimensions.get('window');

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('validations.name-required'),
  email: Yup.string().email('validations.email-invalid').required('validations.email-required'),
  password: Yup.string()
    .required('validations.password-required')
    .oneOf([Yup.ref('confirm-password'), null], 'validations.password-should-match'),
  confirmPassword: Yup.string()
    .required('validations.confirm-password-required')
    .oneOf([Yup.ref('password'), null], 'validations.password-should-match'),
});

export const SignUp: React.FC = () => {
  const { t } = useTranslation();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const { isLoading, onSignUp } = useSignUp();

  const {
    errors, values, touched, handleChange, handleBlur, handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterSchema,
    enableReinitialize: true,
    onSubmit: onSignUp,
  });

  return (
    <KeyboardAwareView showsVerticalScrollIndicator={false} bounces={false} isScrollable>
      <StatusBar />

      <Box f={1} ai="center" bgc={Colors.basic_100}>
        <Box m={[30, 0]}>
          <Text fs={56} fnw="bold" ff={FontFamily.Bold} color={Colors.purple}>meatfreed</Text>
        </Box>

        <Box w={`${width - Spaces['3xl']}px`}>
          <Input
            value={values.email}
            label={t('labels.name')}
            placeholder={t('placeholders.name')}
            onBlur={handleBlur('email')}
            onChangeText={handleChange('name')}
            isError={!!errors.name && !!touched.name}
            error={errors.name ? t(errors.name) : ''}
            withBottomOffset
          />
        </Box>

        <Box w={`${width - Spaces['3xl']}px`}>
          <Input
            value={values.email}
            label={t('labels.email')}
            placeholder={t('placeholders.email')}
            onBlur={handleBlur('email')}
            onChangeText={handleChange('email')}
            isError={!!errors.email && !!touched.email}
            error={errors.email ? t(errors.email) : ''}
            keyboardType="email-address"
            withBottomOffset
          />
        </Box>

        <Box w={`${width - Spaces['3xl']}px`}>
          <Input
            value={values.password}
            label={t('labels.password')}
            placeholder={t('placeholders.password')}
            onBlur={handleBlur('password')}
            onChangeText={handleChange('password')}
            isError={!!errors.password && !!touched.password}
            error={errors.password ? t(errors.password) : ''}
            secureTextEntry={!isShowPassword}
            withBottomOffset
            onRightPress={() => setIsShowPassword(!isShowPassword)}
            RightIcon={<Icon name={isShowPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color={Colors.basic_600} />}
          />
        </Box>

        <Box w={`${width - Spaces['3xl']}px`}>
          <Input
            value={values.password}
            label={t('labels.confirm-password')}
            placeholder={t('placeholders.confirm-password')}
            onBlur={handleBlur('confirmPassword')}
            onChangeText={handleChange('confirmPassword')}
            isError={!!errors.confirmPassword && !!touched.confirmPassword}
            error={errors.confirmPassword ? t(errors.confirmPassword) : ''}
            secureTextEntry={!isShowConfirmPassword}
            withBottomOffset
            onRightPress={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            RightIcon={<Icon name={isShowConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color={Colors.basic_600} />}
          />
        </Box>

        <Box w={`${width - Spaces['3xl']}px`}>
          <Button title={t('buttons.login').toUpperCase()} isLoading={isLoading} onPress={() => handleSubmit()} />

          <Box mt={20}>
            <Text mt={Spaces.md} fs={FontSizes.sm} ta="center" ff={FontFamily.Medium}>{t('authorization.or-login-with-socials')}</Text>

            <Socials />
          </Box>

          <Policy />
        </Box>
      </Box>

    </KeyboardAwareView>
  );
};
