import * as httpservice from '../services/httpservice';
export default {
  namespace: 'income',
  state: {
    list:[],
    billList:[]
  },
  reducers: {
    loadList(state,{list}){
      return {...state,list:list}
    },
    loadBillList(state,{billList}){
      return {...state,billList:billList}
    }
  },
  effects: {
    *list({},{call,put}) {
      const { data, headers } = yield call(httpservice.post, {url:'engineerBillOperation',param:{ac:'getCashList'}});
      yield put({ type: 'loadList',list:data.data || [] });
    },
    *billList({},{call,put}) {
      const { data, headers } = yield call(httpservice.post, {url:'engineerBillOperation',param:{ac:'getEngineerBillList'}});
      yield put({ type: 'loadBillList',billList:data.data || [] });
    },
    *apply({param,begin,success},{call,put}) {
      begin();
      const {data, header} = yield call(httpservice.post, {url: 'engineerBillOperation', param: param});
      success();
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname==='/incomerecord') {
          dispatch({ type: 'list'});
        }else if(pathname==='/bill'){
          dispatch({ type: 'billList'});
        }
      });
    },
  },
};
