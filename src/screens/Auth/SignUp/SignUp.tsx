import React, { useEffect, useState } from 'react';
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
import { useRoute } from '@react-navigation/native';
import { SignUpProp } from 'navigation';

const { width } = Dimensions.get('window');

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('validations.name-required'),
  email: Yup.string().email('validations.email-invalid').required('validations.email-required'),
  password: Yup.string()
    .required('validations.password-required'),
  confirmPassword: Yup.string()
    .required('validations.confirm-password-required')
    .oneOf([Yup.ref('password'), null], 'validations.password-should-match'),
  referralCode: Yup
    .string()
    .min(5, 'validations.referral-code')
    .max(5, 'validations.referral-code'),
});

export const SignUp: React.FC = () => {
  const { t } = useTranslation();

  const { params } = useRoute<SignUpProp>();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const { isLoading, onSignUp } = useSignUp();

  const {
    errors, values, touched, handleChange, handleBlur, handleSubmit, setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      referralCode: '',
    },
    validationSchema: RegisterSchema,
    enableReinitialize: true,
    onSubmit: onSignUp,
  });

  useEffect(() => {
    if (params?.code) {
      setFieldValue('referralCode', params?.code);
    }
  }, [params?.code]);

  return (
    <KeyboardAwareView showsVerticalScrollIndicator={false} bounces={false} isScrollable>
      <StatusBar />

      <Box f={1} ai="center" bgc={Colors.basic_100}>
        <Box m={[30, 0]}>
          <Text fs={56} fnw="bold" ff={FontFamily.Bold} color={Colors.purple}>meatfreed</Text>
        </Box>

        <Box w={`${width - Spaces['3xl']}px`}>
          <Input
            value={values.name}
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
            value={values.confirmPassword}
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
          <Input
            value={values.referralCode}
            label={t('labels.referral-code')}
            placeholder={t('placeholders.referral-code')}
            onBlur={handleBlur('confirmPassword')}
            onChangeText={handleChange('referralCode')}
            isError={!!errors.referralCode && !!touched.referralCode}
            error={errors.referralCode ? t(errors.referralCode) : ''}
            withBottomOffset
          />
        </Box>

        <Box w={`${width - Spaces['3xl']}px`}>
          <Button title={t('buttons.sign-up').toUpperCase()} isLoading={isLoading} onPress={() => handleSubmit()} />

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
