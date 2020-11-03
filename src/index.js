// eslint-disable-next-line import/no-unresolved
import gon from 'gon';
import runApp from './init';

const initialData = { ...gon };
runApp(initialData);
