
import React from 'react';
import ReactDOM from 'react-dom';
import {Main} from './components/main';

document.body.insertAdjacentHTML('afterbegin', '<div id="app"></div>');

ReactDOM.render(<Main />, document.getElementById('app'));
