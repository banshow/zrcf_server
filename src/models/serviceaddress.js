
export default {
  namespace: 'serviceaddress',
  state: {
    list:[
      {
        contactName:'张三',
        contactTel:'15888888888',
        storeName:'田老师百子湾店',
        address:'北京市广渠路首东国际A座5层',
        default:true,
        isv:true
      },
      {
        contactName:'李四',
        contactTel:'13888888888',
        storeName:'李老师百子湾店',
        address:'北京市广渠路首东国际A座5层',
        default:false
      }
    ]
  },
  reducers: {
    add(state,{address}){
        return {...state,list:[address,...state.list]};
    },
    del(state,{index}){
      return {...state,list:[...state.list.slice(0,index),...state.list.slice(index+1)]};
    },
    setDefault(state,{index}){
      return {...state,list:state.list.map((v,i)=>{
        if(v.default&&i!=index){
          return {...v,default:false};
        }
        if(i==index){
          return {...v,default:true};
        }
        return v;
      })}
    },
    edit(state,{index,address}){
      return {...state,list:[...state.list.slice(0,index),{...state.list[index],...address},...state.list.slice(index+1)]}
    }
  },
  effects: {},
  subscriptions: {},
};
