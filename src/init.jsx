// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';
import resources from './locales';

import App from './components/App';
import userContext from './contexts/userContext';
import buildStore from './store';
import { addMessage, initMessages } from './store/messages';
import initProdErrorsTracking from './production-errors';
import {
  initChannels,
  addChannel,
  renameChannel,
  removeChannel,
} from './store/channels';

export default ({ messages, channels, currentChannelId }) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  } else {
    initProdErrorsTracking();
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
  });

  let userName = cookies.get('userName');
  if (!userName) {
    userName = faker.name.findName();
    cookies.set('userName', userName);
  }

  const user = { name: userName };
  const store = buildStore();
  const { dispatch } = store;

  dispatch(initMessages({ messages }));
  dispatch(initChannels({ currentChannelId, channels }));

  const socket = io();

  socket
    .on('newMessage', (socketMsg) => {
      const message = socketMsg.data.attributes;
      dispatch(addMessage({ message }));
    })
    .on('newChannel', (socketMsg) => {
      const channel = socketMsg.data.attributes;
      dispatch(addChannel({ channel }));
    })
    .on('renameChannel', (socketMsg) => {
      const channel = socketMsg.data.attributes;
      dispatch(renameChannel({ channel }));
    })
    .on('removeChannel', (socketMsg) => {
      const { id } = socketMsg.data;
      dispatch(removeChannel({ id }));
    });

  ReactDOM.render(
    <userContext.Provider value={user}>
      <Provider store={store}>
        <App />
      </Provider>
    </userContext.Provider>,
    document.getElementById('chat')
  );
};
