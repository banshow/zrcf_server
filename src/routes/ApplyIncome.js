import React from 'react';
import { connect } from 'dva';
import {NavBar,Button,List,InputItem,Toast,Switch} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './ApplyIncome.less';
const Item = List.Item;
function ApplyIncome({dispatch,history,form}) {
  const {getFieldProps,getFieldsValue,setFieldsValue} = form;
  const data = {...getFieldsValue(null)};
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >申请提现</NavBar>
      <List>
        <Item extra={<span className="color-orange">¥168300.00</span>}>
          <div className="fs-30">可提现金额</div>
        </Item>
        <InputItem
          {...getFieldProps('amount', {
            initialValue: '168300.00',
            rules: [{required: true, message: '申请提现金额不能为空'}]
          })}
          type="money"
          placeholder="请输入申请提现金额"
        >申请提现金额</InputItem>
        <Item extra={<span className="color-3">北京六间房科技有限公司</span>}>
          <div className="fs-30">收款单位</div>
        </Item>
        <Item extra={<span className="color-3">62170**************4874</span>}>
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
              history.goBack();
            })
          }}>
            申请提现
          </Button>
        </div>
      </List>
    </div>
  );
}

function mapStateToProps() {
  return {};
}
const ApplyIncomeWrapper = createForm()(ApplyIncome);
export default connect(mapStateToProps)(ApplyIncomeWrapper);
