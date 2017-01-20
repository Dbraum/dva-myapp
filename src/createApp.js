import React from 'react';
import dva from 'dva';
import { RouterContext } from 'dva/router';
import router from './router';

export default function createApp(opts, isServer) {
  const app = dva(opts);

  
  app.model(require('./models/app'));
  app.model(require('./models/dashboard'));
  app.model(require('./models/users'));


  if (isServer) {
    app.router(({ history, renderProps}) => {
      return <RouterContext {...renderProps} />;
    });
  } else {
    app.router(router);
  }
  return app;
}
