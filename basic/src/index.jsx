import React from 'react';
import ReactDOM from 'react-dom';
import { start } from 'single-spa';

import App from './App';
import '../config/app.config.js';

start();

ReactDOM.render(<App />, document.getElementById('root'));