import * as httpservice from '../services/httpservice';
export default {
  namespace: 'servicetype',
  state: {
    types:[],
    tabs:[
      {
        name:'收银设备维护',
        children:[
          {name:'收银电脑'},
          {name:'钱箱'},
          {name:'钱箱'},
          {name:'打印机'},
          {name:'收益系统'},
          {name:'其它'}

        ]
      },{
        name:'点餐设备',
        children:[
          {name:'小分类1'},
          {name:'小分类2'},
          {name:'小分类3'},
          {name:'小分类4'},
          {name:'小分类5'},
          {name:'小分类6'}
        ]
      },{
        name:'监控设备',
        children:[
          {name:'小分类1'},
          {name:'小分类2'},
          {name:'小分类3'},
          {name:'小分类4'},
          {name:'小分类5'},
          {name:'小分类6'}
        ]
      },{
        name:'网络设备',
        children:[
          {name:'小分类1'},
          {name:'小分类2'},
          {name:'小分类3'},
          {name:'小分类4'},
          {name:'小分类5'},
          {name:'小分类6'}
        ]
      }
    ]
  },
  reducers: {
    reloadTypes(state,{data}){
      return {...state,types:data};
    },
    selectType(state,{ payload: { i,j } }){
      let types = state.types;
      let children = types[i].children;
      let c = children[j];
      return {...state,types:[...types.slice(0,i),{...types[i],children:[...children.slice(0,j),{...c,selected:c.selected?false:true},...children.slice(j+1)]},...types.slice(i+1)]}
    }
  },
  effects: {
    *fetch({},{call,put}) {
      //const { data, headers } = yield call(httpservice.post, {url:'getCategory'});
      const [category, usercategory] = yield [call(httpservice.post, {url:'getCategory'}), call(httpservice.post, {url:'customerAbilityOperation',param:{ac:'get'}})]
      let ucgs = ((usercategory||{}).data || {}).data || [];
      let m = new Map();
      Object.keys(ucgs).map(k=>{
        let ucg = ucgs[k];
        m.set(ucg['cat_id'],true);
      })

      let cgs = category.data.data;
      let cgArr = [];
      Object.keys(cgs).map((k)=>{
        let cg = cgs[k];
        let pcg = {};
        pcg.id = cg.id;
        pcg.name = cg.name;
        pcg.children = [];
        let __next = cg['__next'] || [];
        __next.map((n)=>{
          let ccg = {};
          ccg.id = n.id;
          ccg.name = n.name;
          ccg.selected = !!m.get(n.id);
          pcg.children.push(ccg);
        })
        cgArr.push(pcg);
      })
      yield put({ type: 'reloadTypes',data:cgArr });
    },
    *save({fail,success},{call,put,select}){
      const types = yield select(state => state.servicetype.types);
      let ids = [];
      types.map(v=>{
        (v.children||[]).map(c=>{
          if(c.selected){
            ids.push(c.id);
          }
        })
      });
      if(ids.length==0){
        fail('请选择分类');
        return;
      }
      const { data, headers } = yield call(httpservice.post, {url:'customerAbilityOperation',param:{ac:'save',categoryids:ids.join(',')}});
      yield call(success);
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/servicetype') {
          dispatch({ type: 'fetch'});
        }
      });

    },
  },
};
