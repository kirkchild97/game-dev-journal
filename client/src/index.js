import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import AppRouter from './routes/AppRouter';
import LoadingPage from './components/LoadingPage';

import { store } from './state/store/store';

import { checkTokenHeader } from './constants/fetchHeaders';
import { verifyToken } from './constants/endpoints';
import { tokenVerified } from './state/reducer/userReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const loadingPage = (<LoadingPage />);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

const renderApp = async () => {
  const token = localStorage.getItem('token');
  console.log(token);
  if(token){
    const headers = checkTokenHeader(token);
    const result = await fetch(verifyToken(), {
      headers : checkTokenHeader(token),
      method : 'POST'
    }).then(res => res.json());
    if(result.success){
      console.log('Successful Token verification');
      const { success, token, homeUserName } = result;
      localStorage.setItem('token', token);
      store.dispatch(tokenVerified({ success, homeUserName}));
    }
  }
  root.render((
    <React.StrictMode>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </React.StrictMode>
  ));
}

root.render(loadingPage);

renderApp();