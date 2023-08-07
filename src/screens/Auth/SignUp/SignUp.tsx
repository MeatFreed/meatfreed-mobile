import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Colors, Spaces } from 'themes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Icon, Input, KeyboardAwareView, StatusBar,
} from 'ui';
import { Dimensions } from 'react-native';
import { useSignUp } from 'hooks';
import { useRoute } from '@react-navigation/native';
import { SignUpProp } from 'navigation';
import { AnyType } from 'helpers';

const { width } = Dimensions.get('window');

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('validations.name-required'),
  lastName: Yup.string().required('validations.last-name-required'),
  email: Yup.string().email('validations.email-invalid').required('validations.email-required'),
  password: Yup.string()
    .required('validations.password-required'),
  confirmPassword: Yup.string()
    .required('validations.confirm-password-required')
    .oneOf([Yup.ref('password'), ''], 'validations.password-should-match'),
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
      firstName: '',
      lastName: '',
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
    <Box f={1} bgc={Colors.primary_500}>
      <KeyboardAwareView showsVerticalScrollIndicator={false} bounces={false} isScrollable>
        <StatusBar />

        <Box f={1} pt={16} ai="center" bgc={Colors.primary_500}>
          <Box w={`${width - Spaces['3xl']}px`}>
            <Input
              value={values.firstName}
              label={t('labels.first-name')}
              placeholder={t('placeholders.first-name')}
              onBlur={handleBlur('firstName')}
              onChangeText={handleChange('firstName')}
              isError={!!errors.firstName && !!touched.firstName}
              error={errors.firstName ? t(errors.firstName as AnyType) : ''}
              withBottomOffset
              isWhite
              isWhiteLabel
            />
          </Box>

          <Box w={`${width - Spaces['3xl']}px`}>
            <Input
              value={values.lastName}
              label={t('labels.last-name')}
              placeholder={t('placeholders.last-name')}
              onBlur={handleBlur('lastName')}
              onChangeText={handleChange('lastName')}
              isError={!!errors.lastName && !!touched.lastName}
              error={errors.lastName ? t(errors.lastName as AnyType) : ''}
              withBottomOffset
              isWhite
              isWhiteLabel
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
              error={errors.email ? t(errors.email as AnyType) : ''}
              keyboardType="email-address"
              withBottomOffset
              isWhite
              isWhiteLabel
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
              error={errors.password ? t(errors.password as AnyType) : ''}
              secureTextEntry={!isShowPassword}
              withBottomOffset
              isWhite
              isWhiteLabel
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
              error={errors.confirmPassword ? t(errors.confirmPassword as AnyType) : ''}
              secureTextEntry={!isShowConfirmPassword}
              withBottomOffset
              isWhite
              isWhiteLabel
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
              error={errors.referralCode ? t(errors.referralCode as AnyType) : ''}
              withBottomOffset
              isWhite
              isWhiteLabel
            />
          </Box>

          <Box mt={16} w={`${width - Spaces['3xl']}px`}>
            <Button type="secondary" title={t('buttons.sign-up')} isLoading={isLoading} onPress={() => handleSubmit()} />
          </Box>
        </Box>
      </KeyboardAwareView>
    </Box>
  );
};
