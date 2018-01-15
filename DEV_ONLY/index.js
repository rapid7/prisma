import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import App from './App';

const styleTag = document.createElement('style');

styleTag.id = 'default-styles';
styleTag.textContent = `
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html, body {
    background-color: #1d1d1d;
    color: #d5d5d5;
    margin: 0;
    padding: 0;
  }
`;

document.head.appendChild(styleTag);

const renderApp = (container) => {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    container
  );
};

const div = document.createElement('div');

div.id = 'app-container';

renderApp(div);

document.body.appendChild(div);

if (module.hot) {
  module.hot.accept('./App', (...args) => {
    renderApp(div);

    console.log('App or a sub-dependency was updated.');
  });

  console.log('Listening for changes to App or sub-dependencies.');
}
