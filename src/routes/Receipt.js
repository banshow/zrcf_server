import React from 'react';
import { connect } from 'dva';
import {NavBar,Button,List,InputItem,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './Receipt.less';

const Item = List.Item;

function Receipt({dispatch,history,form,receipt}) {
  const {getFieldProps,getFieldsValue,setFieldsValue} = form;
  const data = {...getFieldsValue(null)};
  const {bankInfo} = receipt;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >收款信息</NavBar>
     {/* <List className="zrcf-hide">
        <InputItem
          type="hidden"
          {...getFieldProps('payway',{
            initialValue: 'WCP'
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('amountSelect',{
            initialValue: ''
          })}
        />
      </List>*/}
      <List>
        <InputItem
          {...getFieldProps('payee',{
            initialValue:bankInfo.payee,
            rules: [{required: true, message: '收款人姓名不能为空'}]
          })}
          placeholder="请输入收款人姓名"
        >收款人</InputItem>
        {/*<Item arrow="horizontal" extra={<div className="fs-30 color-3 flex-row ai-center">
          <img className="wh-42" src={require('../assets/zhaohang.png')}/>
          <span className="ml-20">招商银行</span>
        </div>} onClick={()=>{
        }}>
          <div className="fs-30">开户银行</div>
        </Item>*/}
        <InputItem
          {...getFieldProps('bank_name',{
            initialValue:bankInfo.bank_name,
            rules: [{required: true, message: '开户银行不能为空'}]
          })}
          placeholder="请输入开户银行"
        >开户银行</InputItem>
        <InputItem
          {...getFieldProps('bank_subbranch',{
            initialValue:bankInfo.bank_subbranch,
            rules: [{required: true, message: '开户支行不能为空'}]
          })}
          placeholder="请输入开户支行"
        >开户支行</InputItem>
        <InputItem
          {...getFieldProps('bank_num',{
            initialValue:bankInfo.bank_num,
            rules: [{required: true, message: '收款账号不能为空'}]
          })}
          placeholder="请输入收款账号"
        >收款账号</InputItem>
      </List>
      <div className="flex-col lh-1 fs-24 color-9 ph-30">
        <div className="mt-30">1.收款信息设置后不可修改，请核对无误后再提交；</div>
        <div className="mt-20">2.收款人必须与收款账号持卡人一致；</div>
        <div className="mt-20">3.收款账号用于佣金提现，提现成功后将转账该账号。</div>
      </div>
      {bankInfo.payee?'':<div className="fixed-lb width-full">
        <Button className="zrcf-btn" type="primary" onClick={()=>{
          form.validateFields((errors, values) => {
            if (errors) {
              for (let f in errors) {
                let errs = form.getFieldError(f);
                let errsMsg = errs[0];
                Toast.info(errsMsg, 2);
                return;
              }
            }
            dispatch({
              type: 'receipt/save',
              param: values,
              begin:()=>{
                Toast.loading("提交中", 0, () => {
                }, true);
              },
              fail:(msg)=>{
                Toast.hide();
                Toast.info(msg,2);
              },
              success:()=>{
                Toast.hide();
                Toast.info('设置成功',2);
                history.goBack();
              }
            })
          })
        }}>
          提交
        </Button>
      </div>}
    </div>
  );
}

function mapStateToProps({receipt}) {
  return {receipt};
}
const ReceiptWrapper = createForm()(Receipt);
export default connect(mapStateToProps)(ReceiptWrapper);
