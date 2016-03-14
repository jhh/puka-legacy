
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { routes } from './config/routes'

console.log('Puka running in environment:', process.env.NODE_ENV);
ReactDOM.render(routes, document.getElementById('app'))
