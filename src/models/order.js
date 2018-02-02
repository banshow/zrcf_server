import * as httpservice from '../services/httpservice';
export default {
  namespace: 'order',
  state: {
    currentData:{
      payway:'WCP',
      addressId:0
    },
    myorder:{},
    orderWaiting:[],
    orderDetail:{},
    orderTabKey:'1',
  },
  reducers: {
    // togglePayway(state,{payway}){
    //   return {...state,currentPayway:payway}
    // },
    toggleOrderTabKey(state,{key}){
      return {...state,orderTabKey:key};
    },
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
    loadMyOrder(state,{myorder}){
      return {...state,myorder:myorder};
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
    *myorder({},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'engineerOrderOperation',param:{ac:'getMyOrder'}});
      yield put({ type: 'loadMyOrder', myorder:data.data||{}});
    },
    *detail({id},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'engineerOrderOperation',param:{ac:'getOrderDetail',id:id}});
      yield put({ type: 'loadOrderDetail',orderDetail:data.data||{}});
    },
    *accept({id,success},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'engineerOrderOperation',param:{ac:'jd',order_id:id}});
      //yield put({ type: 'list'});
      success();
    },
    *start({id,success},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'engineerOrderOperation',param:{ac:'cf',order_id:id}});
      if (success){
        success();
        return;
      }
      yield put({ type: 'myorder'});
      yield put({ type: 'toggleOrderTabKey', key: '2' });
    },
    *reach({id,success},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'engineerOrderOperation',param:{ac:'dd',order_id:id}});
      yield put({ type: 'myorder'});
      yield put({ type: 'toggleOrderTabKey', key: '3' });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query}) => {
        if (pathname === '/indexpage' || pathname === '/') {
          dispatch({type: 'list'});
        } else if (pathname === '/orderdetail'){
          dispatch({type: 'detail',id:query.id});
        } else if (pathname === '/indexpage/orderTab'){
          dispatch({type: 'myorder'});
        }
      });

    },
  },
};
