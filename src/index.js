import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700, grey700 } from 'material-ui/styles/colors';
import { BrowserRouter as Router } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getToken } from 'utils/token';
import './utils/helpers/immutabilityHelpers';
import 'utils/date';

import store from './store';
import App from './features/App/App';
import registerServiceWorker from './registerServiceWorker';

import steemconnect from 'sc2-sdk';
import steem from 'steem';
steem.api.setOptions({ url: 'https://api.steemit.com' });
// 配置
steemconnect.init({
  app: 'cnsteem',
  callbackURL: 'http://localhost: 3000',
  accessToken: 'access_token',
  scope: ['vote', 'comment']
});
steemconnect.setAccessToken(getToken());

injectTapEventPlugin();

// CUSTOM MATERIAL-UI THEME
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
  },
  tabs: {
    backgroundColor: 'transparent',
  },
  textField: {
    textColor: grey700,
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <IntlProvider locale="en">
        <Router>
          <App />
        </Router>
      </IntlProvider>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
