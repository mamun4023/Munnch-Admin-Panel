import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';
import {Provider} from 'react-redux';
import Store from './redux/store';
import App from './App';
// scroll bar
import 'simplebar/src/simplebar.css';
// ----------------------------------------------------------------------

ReactDOM.render(
        <Provider store={Store} > 
          <HelmetProvider>
            <BrowserRouter>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
            </BrowserRouter>
          </HelmetProvider>
        </Provider>,
  document.getElementById('root')
);
