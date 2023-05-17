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
import { Policy } from 'features';
import { useSignIn } from 'hooks';
import { Socials } from './ui';

const { width } = Dimensions.get('window');

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('validations.email-invalid').required('validations.email-required'),
  password: Yup.string().required('validations.password-required'),
});

export const SignIn: React.FC = () => {
  const { t } = useTranslation();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const { onSubmit, isLoading } = useSignIn();

  const {
    errors, values, touched, handleChange, handleBlur, handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    enableReinitialize: true,
    onSubmit: ({ email, password }) => onSubmit(email, password),
  });

  return (
    <KeyboardAwareView showsVerticalScrollIndicator={false} bounces={false} isScrollable>
      <StatusBar />

      <Box f={1} ai="center" bgc={Colors.basic_100}>
        <Box m={[16, 0, 0]}>
          <Text lh={56} fs={48} fnw="bold" ff={FontFamily.PoppinsBold} color={Colors.purple}>meatfreed</Text>
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
          <Button isLoading={isLoading} title={t('buttons.login').toUpperCase()} onPress={() => handleSubmit()} />

          <Box mt={20}>
            <Text mt={Spaces.md} fs={FontSizes.sm} ta="center" ff={FontFamily.PoppinsMedium}>{t('authorization.or-login-with-socials')}</Text>

            <Socials />
          </Box>

          <Policy />
        </Box>

      </Box>
    </KeyboardAwareView>
  );
};
