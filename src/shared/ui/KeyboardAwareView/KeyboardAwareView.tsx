import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import { isIOS } from 'helpers';

interface KeyboardAwareViewProps extends KeyboardAwareScrollViewProps {
  children: ReactNode | (ReactNode | null)[];
  containerStyle?: StyleProp<ViewStyle>;
  isScrollable?: boolean;
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  viewStyle: {
    flex: 1,
  },
});

export const KeyboardAwareView: React.FC<KeyboardAwareViewProps> = ({
  children,
  containerStyle,
  isScrollable = false,
  ...props
}) => {
  if (isIOS && !isScrollable) {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.viewStyle}>
        <ScrollView
          contentContainerStyle={[styles.scrollView, containerStyle]}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.scrollView, containerStyle]}
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
