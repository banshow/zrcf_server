import React from 'react';
import { connect } from 'dva';
import {NavBar, Button, List,Modal,InputItem} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './Bill.less';

function Bill({dispatch, history,form}) {
  const {getFieldProps,getFieldsValue,setFieldsValue} = form;
  const data = {...getFieldsValue(null)};
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {
          history.goBack()
        }}
      >我的账单</NavBar>
      <List className="zrcf-hide">
        <InputItem
          type="hidden"
          {...getFieldProps('showModal',{
            initialValue: data.showModal
          })}
        />
      </List>
      <div id={styles['my-table']} className="zrcf-table width-full bg-color-f fs-30 color-3">
        <div className="zrcf-table-row">
          <div className="zrcf-table-cell">申请提现金额</div>
          <div className="zrcf-table-cell">账单日</div>
        </div>
        <div className="zrcf-table-row">
          <div className="zrcf-table-cell">¥16800.00</div>
          <div className="zrcf-table-cell">2016-08-09</div>
        </div>
        <div className="zrcf-table-row">
          <div className="zrcf-table-cell">¥12600.00</div>
          <div className="zrcf-table-cell">2016-08-09</div>
        </div>
        <div className="zrcf-table-row">
          <div className="zrcf-table-cell">¥4000.00</div>
          <div className="zrcf-table-cell">2016-08-09</div>
        </div>
        <div className="zrcf-table-row">
          <div className="zrcf-table-cell">¥1200.00</div>
          <div className="zrcf-table-cell">2016-08-09</div>
        </div>
        <div className="zrcf-table-row">
          <div className="zrcf-table-cell">¥1200.00</div>
          <div className="zrcf-table-cell">2016-08-09</div>
        </div>
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
          <div className="lh-1 fs-32 color-3" style={{marginTop:'.05rem'}}>发票核实信息</div>
          <div className="fs-30 color-3" style={{lineHeight:'.5rem',marginTop:'1.09rem',marginBottom:'.76rem'}}>您的发票抬头信息填写不完整,请重新填写后提交</div>
        </div>
      </Modal>

    </div>
  );
}

function mapStateToProps() {
  return {};
}
const BillWrapper = createForm()(Bill);
export default connect(mapStateToProps)(BillWrapper);
