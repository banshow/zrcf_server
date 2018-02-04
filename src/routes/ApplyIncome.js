import React from 'react';
import { connect } from 'dva';
import {NavBar,Button,List,InputItem,Toast,Switch} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './ApplyIncome.less';
const Item = List.Item;
function ApplyIncome({dispatch,history,form,user,receipt}) {
  const {userInfo} = user;
  const {bankInfo} = receipt;
  const {getFieldProps,getFieldsValue,setFieldsValue} = form;
  const data = {...getFieldsValue(null)};
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >申请提现</NavBar>
      <List className="zrcf-hide">
        <InputItem
          type="hidden"
          {...getFieldProps('ac',{
            initialValue: 'requestCash'
          })}
        />
      </List>
      <List>
        <Item extra={<span className="color-orange">¥{userInfo.engineerWallet.countCash}</span>}>
          <div className="fs-30">可提现金额</div>
        </Item>
        <InputItem
          {...getFieldProps('cash_amount', {
            initialValue: userInfo.engineerWallet.countCash+'',
            rules: [{required: true, message: '申请提现金额不能为空'}]
          })}
          type="money"
          placeholder="请输入申请提现金额"
        >申请提现金额</InputItem>
        <Item extra={<span className="color-3">{bankInfo.payee}</span>}>
          <div className="fs-30">收款单位</div>
        </Item>
        <Item extra={<span className="color-3">{bankInfo.bank_num}</span>}>
          <div className="fs-30">收款账号</div>
        </Item>
        <div className="fixed-lb width-full">
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
                type: 'income/apply',
                param: {...values},
                begin:()=>{
                  Toast.loading("提交中", 0, () => {
                  }, true);
                },
                success:()=>{
                  Toast.hide();
                  history.goBack();
                },
                fail:(msg)=>{
                  Toast.hide();
                  Toast.info(msg, 2);
                }
              });
            })
          }}>
            申请提现
          </Button>
        </div>
      </List>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}
const ApplyIncomeWrapper = createForm()(ApplyIncome);
export default connect(mapStateToProps)(ApplyIncomeWrapper);
