import {
  browserHistory
} from 'dva/router';
import createApp from '../src/createApp';
import ReactDOM from 'react-dom'


const app = createApp({
  history: browserHistory,
  onHmr(render) {
    if (module.hot) {
      const renderNormally = render;
      const renderException = (error) => {
        const RedBox = require('redbox-react');
        ReactDOM.render(React.createElement(RedBox, {
          error: error
        }), document.querySelector('${container}'));
      };
      const newRender = (router) => {
        try {
          renderNormally(router);
        } catch (error) {
          console.error('error', error);
          renderException(error);
        }
      };
      module.hot.accept('../common', () => {
        const router = require('${routerPath}');
        newRender(router);
      });
    }
  },
  initialState: window.__INITIAL_STATE__
});
app.start('#root');
