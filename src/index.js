// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import UserContext from './contexts/userContext';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import faker from 'faker';
// @ts-ignore
import gon from 'gon';
import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

let userName = cookies.get('userName');
if (!userName) {
  userName = faker.name.findName();
  cookies.set('userName', userName);
}

ReactDOM.render(
  <UserContext.Provider value={{ name: userName }}>
    <App {...gon} />
  </UserContext.Provider>,
  document.getElementById('chat')
);

console.log('it works!');
console.log('gon', gon);
