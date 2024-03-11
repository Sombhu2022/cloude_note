import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

import UserContext from './context/UserContext';
import NoteContext from './context/NoteContext';


TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContext>
      <NoteContext>
        <App />
      </NoteContext>
    </UserContext>
  </React.StrictMode>
);
