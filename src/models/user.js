import * as httpservice from '../services/httpservice';
export default {
  namespace: 'user',
  state: {
    initData:false,
    userInfo:{
      // isSetType:true,
      // amount:50,
      // point:1000,
      // cardCount:12
      engineerWallet:{}
    }
  },
  reducers: {
    recharge(state,{amount}){
      return {...state,amount:+(state.amount+(+amount)).toFixed(2)}
    },
    init(state,{userInfo}){
      return {...state,initData:true,userInfo:userInfo};
    },
  },
  effects: {
    *fetch({},{call,put,select}) {
      // const initData = yield select(state=>state.user.initData);
      // if(initData){
      //   return;
      // }
      const [usercategory,userdata,incomedata] = yield [
        call(httpservice.post, {url:'customerAbilityOperation',param:{ac:'get'}}),
        call(httpservice.post, {url:'getCustomerInfo',param:{type:'user'}}),
        call(httpservice.post, {url:'engineerBillOperation',param:{ac:'getEngineerWallet'}})
      ];
      let ucgs = usercategory.data.data || [];
      let userInfo = userdata.data.data || {};
      userInfo.isSetType = ucgs.length>0;
      userInfo.engineerWallet = incomedata.data.data || {};
      yield put({ type: 'init',userInfo:userInfo});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname==='/indexpage/myTab' || pathname==='/income') {
          dispatch({ type: 'user/fetch'});
        }
      });
    },
  },
};
