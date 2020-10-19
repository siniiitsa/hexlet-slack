// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import UserContext from './contexts/UserContext';
import buildStore from './store';
import { addMessage } from './store/messages';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import faker from 'faker';
// @ts-ignore
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

let userName = cookies.get('userName');
if (!userName) {
  userName = faker.name.findName();
  cookies.set('userName', userName);
}

const socket = io();

socket.on('newMessage', (socketMsg) => {
  const message = socketMsg.data.attributes;
  store.dispatch(addMessage({ message }));
});

const user = { name: userName };
const store = buildStore();

ReactDOM.render(
  <UserContext.Provider value={user}>
    <Provider store={store}>
      <App {...gon} />
    </Provider>
  </UserContext.Provider>,
  document.getElementById('chat')
);

console.log('it works!');
console.log('gon', gon);
