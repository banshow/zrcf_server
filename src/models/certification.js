import * as httpservice from '../services/httpservice';
import {apiBaseUrl} from '../config';
export default {
  namespace: 'certification',
  state: {
    files: [],
    pics:[],
    currentData:{}
  },
  reducers: {
    init(state,{files,pics,currentData}){
      return {files:files,pics:pics,currentData:currentData};
    },
    filesChange(state,{files,pics}){
      if(pics){
        return {...state,files:files,pics:[...state.pics,...pics]};
      }
      return {...state,files:files};
    }
  },
  effects: {
    *uploadImg({files,begin,end},{call,put}){
      begin();
      const {data,header} = yield call(httpservice.upload, {url:'uploadImg',files:files.slice(files.length-1,files.length)});
      let pics = data.data;
      yield put({type:'filesChange',files:files,pics:pics});
      end();
    },
    *add({begin,fail,success,param},{select,call,put}){
      const {files,pics} = yield select(state=>state.certification);
      if(files.length<2||pics.length<2){
        fail("请上传持证照片");
        return;
      }
      begin();
      let len = pics.length;
      param = {...param,id_pic1:pics[len-2],id_pic2:pics[len-1]};
      const {data,header} = yield call(httpservice.post, {url:'customerIdCheckApplySave',param:param});
      success();
    },
    *fetch({},{call,put}){
      const {data,header} = yield call(httpservice.post, {url:'getCustomerIdCheckApply',param:{type:'customer'}});
      let d = data.data || {};
      console.log(data)
      console.log(d)
      let files = [];
      let id_pics = d.id_pics||'';
      let pics = id_pics.split(',');
      pics.map((id,i)=>{
        files.push({
          url:apiBaseUrl+id,
          id:i
        })
      })
      yield put({ type: 'init',files:files,pics:pics,currentData:d});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname==='/certification') {
          dispatch({ type: 'fetch'});
        }
      });
    },
  },
};
