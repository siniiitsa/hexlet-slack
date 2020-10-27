import runApp from './init';
import gon from 'gon';

const initialData = { ...gon };
runApp(initialData);

console.log('it works!');
console.log('gon', gon);
