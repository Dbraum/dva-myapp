import React from 'react'
import {Router} from 'dva/router'
import App from './routes/app'

// Hook for server
if (typeof require.ensure !== 'function') {
  require.ensure = function(dependencies, callback) {
    callback(require)
  }
}

export const routes = [
  {
    path: '/',
    component: App,
    getIndexRoute (nextState, cb) {
      require.ensure([], require => {
        cb(null, {component: require('./routes/dashboard')})
      })
    },
    childRoutes: [
      {
        path: 'dashboard',
        name: 'dashboard',
        getComponent (nextState, cb) {
          require.ensure([], require => {
            cb(null, require('./routes/dashboard'))
          })
        }
      }, {
        path: 'users',
        name: 'users',
        getComponent (nextState, cb) {
          require.ensure([], require => {
            cb(null, require('./routes/users'))
          })
        }
      }, {
        path: '*',
        name: 'error',
        getComponent (nextState, cb) {
          require.ensure([], require => {
            cb(null, require('./routes/error'))
          })
        }
      }
    ]
  }
]

export default function ({history, app}) {

  return <Router history={history} routes={routes} />
};

//为什么要这一句
//https://github.com/59naga/babel-plugin-add-module-exports/issues/27
module.exports = exports['default'];
module.exports.routes = exports['routes'];
