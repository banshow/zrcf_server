import * as httpservice from '../services/httpservice';
import * as tokenUtil from '../utils/tokenUtil';

export default {
  namespace: 'receipt',
  state: {
    bankInfo:{}
  },
  reducers: {
    loadBankInfo(state,{bankInfo}){
      return {...state,bankInfo:bankInfo}
    }
  },
  effects: {
    *fetch({},{call,put}) {
      const { data, headers } = yield call(httpservice.post, {url:'customerBankInfoOperation',param:{ac:'getCustomerBankInfo'}});
      yield put({ type: 'loadBankInfo',bankInfo:data.data || {} });
    },
    *save({begin,fail,success,param},{select,call,put}){
      begin();
      param.ac='setCustomerBankInfo';
      const {data,header} = yield call(httpservice.post, {url:'customerBankInfoOperation',param:param});
      success();
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname==='/receipt' || pathname==='/applyincome') {
          dispatch({ type: 'fetch'});
        }
      });
    },

  }
};
