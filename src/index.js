import dva from 'dva'
import { browserHistory } from 'dva/router';
import {createBrowserHistory} from 'history';
import router,{routes} from './router';
import { match } from 'react-router'

console.info(require('./router'))

// 1. Initialize
// https://github.com/dvajs/dva-knowledgemap#去除-hashhistory-下的-_k-查询参数

console.info(window.__INITIAL_STATE__)
const app = dva({
  history:browserHistory,
  initialState: window.__INITIAL_STATE__ || {}
})

// 2. Model

app.model(require('./models/app'))
app.model(require('./models/dashboard'))
app.model(require('./models/users'))

// 3. Router
app.router(router)

// 4. Start


match({ routes,location:window.location }, (error, redirectLocation, renderProps) => {
  app.start('#root')
})
