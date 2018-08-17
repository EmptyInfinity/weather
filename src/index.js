import React from 'react';
import {render} from 'react-dom';
import App from './App'
import './index.css';

render(<App />, document.getElementById('root'));

document.addEventListener("DOMContentLoaded", make_bg);
function make_bg() {
    let hours = new Date().getHours();
    if (hours > 18) {
      document.body.classList.add('evening_bg');
    } else {
      document.body.classList.add('morning_bg');
    };
}
