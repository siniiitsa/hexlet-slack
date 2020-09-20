// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
// @ts-ignore
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const mountNode = document.getElementById('chat');

ReactDOM.render(
  <App {...gon} />,
  mountNode,
);

console.log('it works!');
console.log('gon', gon);
