import React from 'react';
import { connect } from 'dva';
import {NavBar, Button, List,Modal,InputItem} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './IncomeRecord.less';

function IncomeRecord({dispatch, history,form,income}) {
  const {getFieldProps,getFieldsValue,setFieldsValue,getFieldValue} = form;
  const data = {...getFieldsValue(null)};
  const {list} = income;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {
          history.goBack()
        }}
      >提现记录</NavBar>
      <List className="zrcf-hide">
        <InputItem
          type="hidden"
          {...getFieldProps('showModal',{
            initialValue: data.showModal
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('node',{
            initialValue: ''
          })}
        />
      </List>
      <div className="flex-row ai-center fs-28 ph-30" style={{height:'.72rem',backgroundColor:'#fff8e9',color:'#ffb540'}}>
        <div className="flex-row ai-center">
          <img src={require('../assets/warning.png')} className="wh-30" style={{marginRight:'.18rem'}}/>
          <div style={{position:'absolute',fontSize:'.2rem',color:'#fff',marginLeft:'0.12rem'}}>i</div>
        </div>
        <div>提现收入会在审核通过后5-10个工作日到账。</div>
      </div>
      <div id={styles['my-table']} className="zrcf-table width-full bg-color-f fs-30 color-3">
        <div className="zrcf-table-row">
          <div className="zrcf-table-cell">申请提现金额</div>
          <div className="zrcf-table-cell">申请时间</div>
          <div className="zrcf-table-cell">处理状态</div>
        </div>
        {list.map(v=>{
         return v.status == '1'?(<div className="zrcf-table-row" key={v.id}>
            <div className="zrcf-table-cell">¥{v.cash_amount}</div>
            <div className="zrcf-table-cell">{v.cdate}</div>
            <div className="zrcf-table-cell color-bp">审核中</div>
          </div>):(v.status == '2'?(
            <div className="zrcf-table-row" key={v.id}>
              <div className="zrcf-table-cell">¥{v.cash_amount}</div>
              <div className="zrcf-table-cell">{v.cdate}</div>
              <div className="zrcf-table-cell color-orange">审核通过</div>
            </div>
          ):(
            <div className="zrcf-table-row" key={v.id}>
              <div className="zrcf-table-cell">¥{v.cash_amount}</div>
              <div className="zrcf-table-cell">{v.cdate}</div>
              <div className="zrcf-table-cell color-r">
                审核不通过
                <img className="ml-20 wh-30 va-middle" src={require('../assets/why_b.png')} onClick={()=>{
                  setFieldsValue({"showModal":data.showModal=='1'?'0':'1','node':v.node})
                }}/>
              </div>
            </div>
          ))

        })}
      </div>

      <Modal
        style={{width:'92%'}}
        className="time-modal"
        transparent
        maskClosable={false}
        visible={data.showModal==1}
        footer={[
          { text: '确定', onPress: () => {
            setFieldsValue({'showModal':'0'})
          }}
        ]}
        platform="ios"
      >
        <div className="flex-col ai-center ph-30">
          <div className="lh-1 fs-32 color-3" style={{marginTop:'.05rem'}}>审核未通过原因</div>
          <div className="fs-30 color-3" style={{lineHeight:'.5rem',marginTop:'1.09rem',marginBottom:'.76rem'}}>{getFieldValue('node')}</div>
        </div>
      </Modal>

    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}
const IncomeRecordWrapper = createForm()(IncomeRecord);
export default connect(mapStateToProps)(IncomeRecordWrapper);
