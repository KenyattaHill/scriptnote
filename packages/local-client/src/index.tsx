import '@fontsource/roboto';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './state';
import App from './App';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#d60000',
    },
    secondary: {
      main: '#424242',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </ThemeProvider>,
  document.querySelector('#root')
);
