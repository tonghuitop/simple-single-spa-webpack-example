import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { singleSpaPacker } from '../config/singleWrapper';

if (!window.__SINGLE_SPA__) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

const { bootstrap, mount, unmount } = singleSpaPacker(App);
export { bootstrap, mount, unmount };