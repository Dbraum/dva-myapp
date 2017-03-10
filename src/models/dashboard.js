import { myCity, queryWeather, query } from '../services/dashboard'


export default {
  namespace: 'dashboard',
  state: {
    sales: [],
    quote: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw2' +
        '36'
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw2' +
        '36'
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
       /* dispatch({
          type: 'query'
        })*/
      });

    }
  },
  effects: {
    *query({payload}, {call, put}) {
      const data = yield call(query, payload)
      yield put({
        type: 'queryDataSuccess',
        payload: {
          ...data
        }
      })
    }
  },
  reducers: {
    queryDataSuccess(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
}
