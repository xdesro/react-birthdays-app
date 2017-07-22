import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BirthdayApp from './BirthdayApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BirthdayApp />, document.getElementById('birthday-app'));
registerServiceWorker();
