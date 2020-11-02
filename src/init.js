// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Rollbar from 'rollbar';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';

import App from './components/App';
import userContext from './contexts/userContext';
import buildStore from './store';
import { addMessage, initMessages } from './store/messages';
import {
  initChannels,
  addChannel,
  renameChannel,
  removeChannel,
} from './store/channels';

export default ({ messages, channels, currentChannelId }) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const rollbar = new Rollbar({
    accessToken: '72fab1ca365f4dcb9560526987345ab8',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  // record a generic message and send it to Rollbar
  rollbar.log('Hello world!');

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
