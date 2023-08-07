import 'react-native-gesture-handler';

import {
  AppRegistry, LogBox, Text, TextInput, TouchableOpacity,
} from 'react-native';
import { touchableConfig } from 'helpers';
import App from './App';
import { name as appName } from './app.json';

import { LocalizationService } from './src/shared/services';

LocalizationService.initLocalization();

Text.defaultProps = { ...(TextInput.defaultProps || {}), allowFontScaling: false };
TextInput.defaultProps = { ...(TextInput.defaultProps || {}), allowFontScaling: false };

TouchableOpacity.defaultProps = {
  ...(TouchableOpacity.defaultProps || {}),
  ...({ ...touchableConfig }),
};

LogBox.ignoreAllLogs(true);

LogBox.ignoreLogs([
  'EventEmitter.removeListener',
  'Require cycle: node_modules/react-native/Libraries/Network/fetch.js',
  'You seem to update props of the "TRenderEngineProvider" component in short periods of time, causing costly tree rerenders',
  'You should always pass contentWidth prop to properly handle screen rotations and have a seamless support for images scaling.',
  'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
  'No info about this app.',
  'Non-serializable values were found in the navigation state.',
  "EventEmitter.removeListener('change', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`",
]);

AppRegistry.registerComponent(appName, () => App);
