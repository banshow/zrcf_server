import React from 'react';
import {connect} from 'dva';
import styles from './ServiceType.less';
import {TabBar, NavBar, Icon, Carousel, Grid, Button, Badge, Card, List,Toast} from 'antd-mobile';

function ServiceType({dispatch,history,servicetype},context) {
  const {tabs,types} = servicetype;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >服务分类</NavBar>
      <div className="flex-row ai-center fs-28 ph-30" style={{height:'.72rem',backgroundColor:'#fff8e9',color:'#ffb540'}}>
        <div className="flex-row ai-center">
          <img src={require('../assets/warning.png')} className="wh-30" style={{marginRight:'.18rem'}}/>
          <div style={{position:'absolute',fontSize:'.2rem',color:'#fff',marginLeft:'0.12rem'}}>i</div>
        </div>
        <div>设置服务项目，有助于您接到匹配的工单。</div>
      </div>
        {types.map((value, index) => (
          <div key={index + 1} className={styles['type-list']+' flex-col bg-color-f'}>
            <div className="item-title lh-1 fs-30 color-4" style={{padding:'.4rem .3rem .25rem .3rem'}}>{value.name}</div>
            {
              new Array(Math.ceil(value.children.length/4)).fill(0).map((p,j)=>
            <div key={j} className={styles['tab-pane'] + ' flex-row ai-center flex-jc-sb'}>
              {
                value.children.slice(j*4,4*(j+1)).map((cv, i) => (
                <div key={j*4+i} className={styles['sub-type'] + ' single-line' + (cv.selected ? (' ' + styles['selected']) : '')}
                     onClick={() => {
                       dispatch({
                         type: 'servicetype/selectType',
                         payload: {i: index, j: j*4+i},
                       });
                     }}>{cv.name}</div>
              ))}
              {
                Math.ceil(value.children.length/4)==j+1?new Array(4-value.children.length%4).fill(0).map((bv,bi)=>
                  <div key={bi} className={styles['sub-type']+' '+styles['blank-item']}></div>
                ):''
              }
            </div>)
            }
          </div>

        ))}

      <div className="fixed-lb width-full">
        <Button className="zrcf-btn" type="primary" onClick={()=>{

         dispatch({
            type:'servicetype/save',
            fail:(msg)=>{
              Toast.info(msg,2);
            },
            success:()=>{
              context.router.goBack();
            }
          })

        }}>保存</Button>
      </div>

    </div>
  );
}

function mapStateToProps({servicetype}) {
  //const { tabs } = state.servicetype;
  return {servicetype};
}
ServiceType.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default connect(mapStateToProps)(ServiceType);
