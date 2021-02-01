// client/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Container from "react-bootstrap/Container";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class CineFanApplication extends React.Component {
  render() {
    return (
      <Container>
        <Provider store={store}>
          <MainView />
        </Provider>
      </Container>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(CineFanApplication), container);