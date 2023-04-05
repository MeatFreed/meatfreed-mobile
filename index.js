import 'react-native-gesture-handler';

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { LocalizationService } from './src/shared/services';

LogBox.ignoreAllLogs(true);

LogBox.ignoreLogs([
  'EventEmitter.removeListener',
  'You seem to update props of the "TRenderEngineProvider" component in short periods of time, causing costly tree rerenders',
  'You should always pass contentWidth prop to properly handle screen rotations and have a seamless support for images scaling.',
  'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
  'No info about this app.',
  'Non-serializable values were found in the navigation state.',
  "EventEmitter.removeListener('change', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`",
]);

LocalizationService.initLocalization();

AppRegistry.registerComponent(appName, () => App);
