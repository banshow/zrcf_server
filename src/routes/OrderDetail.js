import React from 'react';
import { connect } from 'dva';
import {List,NavBar, Icon,  Button, InputItem,Modal,Popup} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './OrderDetail.less';
const alert = Modal.alert;
function OrderDetail(props) {
  const {getFieldProps,getFieldsValue,setFieldsValue} = props.form;
  const data = {...getFieldsValue(null)};
  const {orderDetail} = props.order;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {props.history.goBack()}}
      >工单详情</NavBar>
      <List className="zrcf-hide">
        <InputItem
          type="hidden"
          {...getFieldProps('showModal',{
            initialValue: data.showModal
          })}
        />
      </List>
      <div id={styles['section-detail']} className="ph-30 flex-col flex-jc-center">
          <div className="flex-row">
            <div className="item-title">订单编号</div>
            <div>：{orderDetail.id}</div>
          </div>
          <div className="flex-row">
            <div className="item-title">下单时间</div>
            <div>：{orderDetail.cdate}</div>
          </div>
          <div className="flex-row ai-center">
            <div className="item-title">接单时间</div>
            <div>：{orderDetail.mdate}</div>
            <img src={require('../assets/time.png')} className="ml-30 wh-36 va-middle" onClick={()=>{
              setFieldsValue({'showModal':'1'})
            }}/>
          </div>
          <div className="flex-row">
            <div className="item-title">支付方式</div>
            <div>：在线支付(微信)</div>
          </div>
          <div className="flex-row">
            <div className="item-title">订单状态</div>
            <div>：<span className="color-bp">{orderDetail.order_status_txt}</span></div>
          </div>
      </div>

      <div id={styles['section-service']} className="mt-20 ph-30 flex-col flex-jc-center">
        <div>{orderDetail.cat_id2}</div>
      </div>

      <div id={styles['section-address']} className="mt-20 ph-30 flex-col flex-jc-center">
        <div><span>{orderDetail.contact_who}</span><span style={{marginLeft:'.5rem'}}>{orderDetail.contact_phone}</span></div>
        <div style={{marginTop:'.38rem'}} className="fs-24 color-6">{orderDetail.address}</div>
      </div>

      <div id={styles['section-time']} className="mt-20 ph-30 flex-row flex-jc-sb ai-center">
        <div>预约服务时间</div>
        <div>{orderDetail.up_time_date}</div>
      </div>
      <div id={styles['section-remark']} className="mt-20 ph-30 flex-col">
        <div className="title">备注</div>
        <div className="content">
          {orderDetail.remark}
        </div>
      </div>

      <div id={styles['section-price']} className="mt-20 ph-30 flex-col flex-jc-center">
        <div className="flex-row flex-jc-sb ai-center">
          <div className="color-9">收银电脑安装服务</div>
          <div><span className="color-orange">{orderDetail.total_amount}</span>元</div>
        </div>
        <div className="mt-30 flex-row flex-jc-sb ai-center">
          <div className="color-9">优惠券</div>
          <div><span className="color-orange">-{orderDetail.coupon_amount}</span>元</div>
        </div>
        <div className="mt-30 flex-row flex-jc-sb ai-center">
          <div className="color-9">应付金额</div>
          <div><span className="color-orange">{orderDetail.need_amount}</span>元</div>
        </div>
      </div>

      <div className="zrcf-btn-group fixed-lb width-full">
        <Button className="zrcf-btn" type="primary" onClick={()=>{}}>我要接单</Button>
      </div>

      <Modal
        style={{width:'92%'}}
        className="time-modal"
        transparent
        maskClosable={true}
        visible={data.showModal==1}
        platform="ios"
      >
        <div className="flex-col flex-jc-center text-align-left lh-1 color-3" style={{height:'5.08rem',paddingLeft:'.3rem'}}>
          <img onClick={()=>{
            setFieldsValue({'showModal':'0'})
          }} src={require('../assets/close.png')} style={{position:'fixed',zIndex:'999',width:'.5rem',height:'1rem',marginTop:'-3.34rem',right:'.6rem'}}/>
          <div>下单时间：2017-03-05 16:23:06</div>
          <div className="mt-50">接单时间：2017-03-05 16:23:06</div>
          <div className="mt-50">出发时间：2017-03-05 16:23:06</div>
          <div className="mt-50">开始时间：2017-03-05 16:23:06</div>
          <div className="mt-50">完成时间：2017-03-05 16:23:06</div>
          <div className="mt-50">服务时长：<span className="color-orange">14:16:06</span></div>
        </div>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}
const OrderDetailWrapper = createForm()(OrderDetail);
export default connect(mapStateToProps)(OrderDetailWrapper);
