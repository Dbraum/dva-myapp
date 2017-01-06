import dva from 'dva'
import {useRouterHistory} from 'dva/router';
import {createHashHistory} from 'history';
// 1. Initialize
// https://github.com/dvajs/dva-knowledgemap#去除-hashhistory-下的-_k-查询参数
const app = dva({
  history: useRouterHistory(createHashHistory)({queryKey: false})
})

// 2. Model

app.model(require('./models/app'))
app.model(require('./models/dashboard'))
app.model(require('./models/users'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
