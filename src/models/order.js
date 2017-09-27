import * as httpservice from '../services/httpservice';
export default {
  namespace: 'order',
  state: {
    currentData:{
      payway:'WCP',
      addressId:0
    },
    orderMap:{},
    orderWaiting:[],
    orderDetail:{}
  },
  reducers: {
    // togglePayway(state,{payway}){
    //   return {...state,currentPayway:payway}
    // },
    init(state,{payload}){
      return {...state,currentData:{...state.currentData,...payload}}
    },
    syncCurrentData(state,{payload}){
      return {...state,currentData:{...state.currentData,...payload}}
    },
    selectAddress(state,{index}){
      return {...state,currentData:{...state.currentData,addressId:index}}
    },
    loadWaitingList(state,{orderWaiting}){
      return {...state,orderWaiting:orderWaiting};
    },
    loadOrderDetail(state,{orderDetail}){
      return {...state,orderDetail:orderDetail};
    }
  },
  effects: {
    *fetch({id},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'getQuotePriceForCategore',param:{id:id}});
      yield put({ type: 'init',userInfo:userInfo});
    },
    *list({},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'engineerOrderOperation',param:{ac:'getWaitingList'}});
      yield put({ type: 'loadWaitingList',orderWaiting:data.data||[]});
    },
    *detail({id},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'engineerOrderOperation',param:{ac:'getOrderDetail',id:id}});
      yield put({ type: 'loadOrderDetail',orderDetail:data.data||{}});
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query}) => {
        if (pathname === '/indexpage' || pathname === '/') {
          dispatch({type: 'list'});
        }else if(pathname === '/orderdetail'){
          dispatch({type: 'detail',id:query.id});
        }
      });

    },
  },
};
