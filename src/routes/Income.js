import React from 'react';
import {connect} from 'dva';
import {NavBar, Button, List} from 'antd-mobile';
import styles from './Income.less';
const Item = List.Item;
function Income({dispatch, history,user}) {
  const {userInfo} = user;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {
          history.goBack()
        }}
      >收入管理</NavBar>
      <div className="flex-col ai-center bg-color-f" style={{height:'6rem',paddingTop:'1.27rem'}}>
        <img src={require('../assets/balance.png')} className="wh-180"/>
        <div className="mt-40 fs-34 color-35">账户余额</div>
        <div className="color-35 fs-54"  style={{height:'.8rem',lineHeight:'.8rem',marginTop:'.34rem'}}>
          <span className="va-top">¥</span>
          <span className="fs-80 va-top">{userInfo.amount||'0.00'}</span>
        </div>
      </div>
      <List className="mt-20 my-list">
        <Item arrow="horizontal"  onClick={()=>{
          history.push('/applyincome')
        }}>
          <div className="fs-30">申请提现</div>
        </Item>
        <Item arrow="horizontal" onClick={()=>{
          history.push('/incomerecord')
        }}>
          <div className="fs-30">提现记录</div>
        </Item>
        <Item arrow="horizontal" onClick={()=>{
          history.push('/receipt')
        }}>
          <div className="fs-30">收款信息</div>
        </Item>
        <Item arrow="horizontal" onClick={()=>{
          history.push('/bill')
        }}>
          <div className="fs-30">我的账单</div>
        </Item>
      </List>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Income);
