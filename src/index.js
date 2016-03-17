
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import { routes } from './config/routes';

require('./styles/bookmark.css');

require('file?name=favicon.ico!../assets/favicon.ico');
require('../assets/octicons/octicons.css');
require('../assets/octicons/octicons.eot');
require('../assets/octicons/octicons.woff');
require('../assets/octicons/octicons.ttf');
require('../assets/octicons/octicons.svg');

ReactDOM.render(routes, document.getElementById('app'));
