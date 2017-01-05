import React from 'react';
import dva from 'dva';
import {
  RouterContext
} from 'dva/router';
import router from './router.js'

export default function createApp(opts, isServer) {

  // 1. Initialize
  const app = dva(opts);

  // 2. Model
  app.model(require('./models/app'))
  app.model(require('./models/dashboard'))
  app.model(require('./models/users'))
    // 3. Router
  if (isServer) {
    app.router(({
      history,
      renderProps
    }) => {
      return <RouterContext {...renderProps
      }
      />;
    });
  } else {
    app.router(router);
  }
  return app;
}
