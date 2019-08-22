import React from 'react';
import { YellowBox} from 'react-native';
import Routes from './routes';
//import Text from 'react-native';

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket"
]);

export default function App() {
  return (
    <Routes/>
    );
}
