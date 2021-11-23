import React from 'react';
import ReactDOM from 'react-dom';
import { usePromiseTracker } from "react-promise-tracker";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Spinner } from 'react-bootstrap';

export const LoadingSpinnerComponent = (props: any) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <div>
      {
        (promiseInProgress === true) ?
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          : null
      }
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
