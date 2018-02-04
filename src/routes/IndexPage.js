/* eslint-disable no-plusplus, global-require */
import React from 'react';
import {connect} from 'dva';
import {TabBar, NavBar, Icon, Carousel, Grid, Button, Tabs, Badge, Card,List,Modal} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './IndexPage.less';

const TabPane = Tabs.TabPane;
const alert = Modal.alert;
const data = [
  {icon: require('../assets/shuikong.png'), text: '税控'},
  {icon: require('../assets/shouyin.png'), text: '收银'},
  {icon: require('../assets/diancan.png'), text: '点餐'},
  {icon: require('../assets/jiankong.png'), text: '监控'},
  {icon: require('../assets/wangluoweihu.png'), text: '网络维护'},
  {icon: require('../assets/duomeiti.png'), text: '多媒体'},
  {icon: require('../assets/yinxiang.png'), text: '音响'},
  {icon: require('../assets/gengduo.png'), text: '更多'},
];
class MobileDemo extends React.Component {
  constructor(props) {
    super(props);

    const {tabIndex} = props.params;
    let selectedTab= tabIndex?tabIndex:'indexTab';
    let iconName='left';
    let leftContent=null;
    let navBarTitle='最新工单';
    let navBarMode='dark';
    if(selectedTab == 'orderTab'){
      selectedTab= 'orderTab';
      iconName='left';
      leftContent=null;
      navBarTitle='我的工单';
      navBarMode='dark';
    }else if(selectedTab=='myTab'){
      selectedTab='myTab';
      iconName=false;
      leftContent=<Icon type='left' style={{color: '#666'}}/>;
      navBarTitle=<span className="color-6">个人中心</span>;
      navBarMode='light';
    }

    this.state = {
      selectedTab: selectedTab,
      hidden: false,
      iconName: iconName,
      leftContent: leftContent,
      navBarTitle: navBarTitle,
      navBarMode: navBarMode,
      order:props.order
    };
  }

  componentWillReceiveProps(nextProps) {
    const {tabIndex} = nextProps.params;
    let selectedTab= tabIndex?tabIndex:'indexTab';
    let iconName='left';
    let leftContent=null;
    let navBarTitle='最新工单';
    let navBarMode='dark';
    if(selectedTab == 'orderTab'){
      selectedTab= 'orderTab';
      iconName='left';
      leftContent=null;
      navBarTitle='我的工单';
      navBarMode='dark';
    }else if(selectedTab=='myTab'){
      selectedTab='myTab';
      iconName=false;
      leftContent=<Icon type='left' style={{color: '#666'}}/>;
      navBarTitle=<span className="color-6">个人中心</span>;
      navBarMode='light';
    }
    this.setState({
      selectedTab: selectedTab,
      hidden: false,
      iconName: iconName,
      leftContent: leftContent,
      navBarTitle: navBarTitle,
      navBarMode: navBarMode,
      order:nextProps.order
    });
  }

  renderIndex(pageText) {
    const hProp = this.state.initialHeight ? {height: this.state.initialHeight} : {height: '2.6rem'};
    const {orderWaiting} = this.state.order;
    return (
      <div id={styles['todo-list']} className="flex-col" style={{height: '100%', paddingBottom: '1.1rem'}}>
        {(orderWaiting||[]).map((v,i)=>(
          <div className={styles['todo-item']} key={v.id}>
            <Card full style={{border: 'none', paddingBottom: '0'}} onClick={()=>{this.props.history.push('/orderdetail?id='+v.id)}}>
              <Card.Header
                style={{height: '1rem', boxSizing: 'border-box', fontSize: '0.3rem', color: '#333'}}
                title={v.cat_id2}
              />
              <Card.Body style={{boxSizing: 'border-box', padding: '0 0.3rem'}}>
                <div className="flex-col flex-jc-center"
                     style={{height: '2.46rem', fontSize: '0.3rem', color: '#333'}}>
                  <div className="">预约上门时间：{v.up_time}</div>
                  <div className="mt-25 flex-row ai-center flex-jc-sb">
                    <div style={{width: '5rem'}} className="single-line">服务地址：{v.address}</div>
                    <div className="btn-min" onClick={(e)=>{
                      e.stopPropagation();
                      alert('', <div className="flex-col flex-jc-center color-3 fs-30" style={{height:'1.4rem'}}>
                        <div>确认接单吗?</div>
                        <div>接单后，请按时上门提供服务。</div>
                      </div>, [
                        { text: '取消', onPress: () => {} },
                        { text: '确定', onPress: () => {
                          this.props.dispatch({
                            type: 'order/accept',
                            id: v.id,
                            success: () => {
                              this.props.dispatch({ type: 'order/toggleOrderTabKey', key: '1' });
                              this.props.history.replace('/indexpage/orderTab');
                            }});
                        }},
                      ])
                    }}>接单</div>
                  </div>
                  <div className="mt-25">服务价格：<span className="color-orange">¥{v.total_amount}</span></div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  renderOrder(pageText) {
    const {myorder} = this.state.order;
    return (
      <div className="flex-col" style={{height: '100%', paddingBottom: '1.1rem'}}>
        <Tabs activeKey={this.state.order.orderTabKey} onChange={(key)=>{
          this.props.dispatch({type: 'order/toggleOrderTabKey',key:key});
        }}>
          <TabPane tab="已接单" key="1">
            {myorder ? (myorder['yjd']||[]).map((v,i)=>(
            <div className="mt-20" key={v.id}>
              <Card full style={{border: 'none', paddingBottom: '0'}} onClick={()=>{this.props.history.push('/orderdetail?id='+v.id)}}>
                <Card.Header
                  style={{height: '1rem', boxSizing: 'border-box', fontSize: '0.3rem', color: '#333'}}
                  title={v.cat_id2}
                  extra={<span className="fs-30 color-orange">已接单</span>}
                />
                <Card.Body style={{boxSizing: 'border-box', padding: '0 0.3rem'}}>
                  <div className="flex-col flex-jc-center"
                       style={{height: '2.46rem', fontSize: '0.3rem', color: '#333'}}>
                    <div className="">预约上门时间：{v.cdate}</div>
                    <div className="mt-25 flex-row ai-center flex-jc-sb">
                      <div style={{width: '5rem'}} className="single-line">服务地址：{v.address}</div>
                      <div className="btn-min"
                           onClick={(e) => {
                             e.stopPropagation();
                             alert('', <div className="flex-col flex-jc-center color-3 fs-30" style={{height:'1.4rem'}}>
                               <div>确认出发吗?</div>
                             </div>, [
                               { text: '取消', onPress: () => {} },
                               { text: '确定', onPress: () => {
                                   this.props.dispatch({
                                     type: 'order/start',
                                     id: v.id,
                                    });
                                 }},
                             ])
                           }}
                      >出发</div>
                    </div>
                    <div className="mt-25">服务价格：<span className="color-orange">¥{v.total_amount}</span></div>
                  </div>
                </Card.Body>
              </Card>
            </div>)):''
            }
          </TabPane>
          <TabPane tab="已出发" key="2">
            {myorder ? (myorder['ycf']||[]).map((v,i)=>(
              <div className="mt-20" key={v.id}>
                <Card full style={{border: 'none', paddingBottom: '0'}} onClick={()=>{this.props.history.push('/orderdetail?id='+v.id)}}>
                  <Card.Header
                    style={{height: '1rem', boxSizing: 'border-box', fontSize: '0.3rem', color: '#333'}}
                    title={v.cat_id2}
                    extra={<span className="fs-30 color-orange">已出发</span>}
                  />
                  <Card.Body style={{boxSizing: 'border-box', padding: '0 0.3rem'}}>
                    <div className="flex-col flex-jc-center"
                         style={{height: '2.46rem', fontSize: '0.3rem', color: '#333'}}>
                      <div className="">预约上门时间：{v.cdate}</div>
                      <div className="mt-25 flex-row ai-center flex-jc-sb">
                        <div style={{width: '6.9rem'}} className="single-line">服务地址：{v.address}</div>
                      </div>
                      <div className="mt-25">服务价格：<span className="color-orange">¥{v.total_amount}</span></div>
                    </div>
                  </Card.Body>
                </Card>
              </div>)):''
            }
          </TabPane>
          <TabPane tab="服务中" key="3">
            {myorder ? (myorder['ydd']||[]).map((v,i)=>(
              <div className="mt-20" key={v.id}>
                <Card full style={{border: 'none', paddingBottom: '0'}} onClick={()=>{this.props.history.push('/orderdetail?id='+v.id)}}>
                  <Card.Header
                    style={{height: '1rem', boxSizing: 'border-box', fontSize: '0.3rem', color: '#333'}}
                    title={v.cat_id2}
                    extra={<span className="fs-30 color-orange">服务中</span>}
                  />
                  <Card.Body style={{boxSizing: 'border-box', padding: '0 0.3rem'}}>
                    <div className="flex-col flex-jc-center"
                         style={{height: '2.46rem', fontSize: '0.3rem', color: '#333'}}>
                      <div className="">预约上门时间：{v.cdate}</div>
                      <div className="mt-25 flex-row ai-center flex-jc-sb">
                        <div style={{width: '6.9rem'}} className="single-line">服务地址：{v.address}</div>
                      </div>
                      <div className="mt-25">服务价格：<span className="color-orange">¥{v.total_amount}</span></div>
                    </div>
                  </Card.Body>
                </Card>
              </div>)):''
            }
          </TabPane>
          <TabPane tab="已完成" key="4">
            {myorder ? (myorder['fwwc']||[]).map((v,i)=>(
              <div className="mt-20" key={v.id}>
                <Card full style={{border: 'none', paddingBottom: '0'}} onClick={()=>{this.props.history.push('/orderdetail?id='+v.id)}}>
                  <Card.Header
                    style={{height: '1rem', boxSizing: 'border-box', fontSize: '0.3rem', color: '#333'}}
                    title={v.cat_id2}
                    extra={<span className="fs-30 color-orange">已完成</span>}
                  />
                  <Card.Body style={{boxSizing: 'border-box', padding: '0 0.3rem'}}>
                    <div className="flex-col flex-jc-center"
                         style={{height: '2.46rem', fontSize: '0.3rem', color: '#333'}}>
                      <div className="">预约上门时间：{v.cdate}</div>
                      <div className="mt-25 flex-row ai-center flex-jc-sb">
                        <div style={{width: '6.9rem'}} className="single-line">服务地址：{v.address}</div>
                      </div>
                      <div className="mt-25">服务价格：<span className="color-orange">¥{v.total_amount}</span></div>
                    </div>
                  </Card.Body>
                </Card>
              </div>)):''
            }
          </TabPane>
        </Tabs>
      </div>
    );
  }

  renderMy(pageText) {
    const Item = List.Item;
    return (
      <div className="flex-col"
           style={{height: '100%', borderTop: '0.01rem solid #ddd'}}>
        <div className="flex-col bg-color-f">
          <div className="flex-row ai-center mv-40">
            <img src={require('../assets/head_bg.png')}
                 style={{height: '0.98rem', width: '0.98rem', margin: '0 .24rem 0 .3rem'}}/>
            <div className="flex-col flex-jc-center lh-1">
              <div className="fs-32 color-4">工程师001</div>
              <div id={styles['cert-btn']} className="mt-20">已认证</div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <List>
            <Item onClick={()=>{
              this.props.history.push('/income')
            }} thumb={require('../assets/shouruguanli.png')} arrow="horizontal" extra={<span className="fs-28 color-be">可提现收入：<span className="color-orange">¥{this.props.user.userInfo.engineerWallet.countCash}</span></span>}><span className="fs-32 color-3">收入管理</span></Item>
            <Item thumb={require('../assets/lianxikefu.png')} arrow="horizontal"><span className="fs-32 color-3">联系客服</span></Item>
            <Item onClick={()=>{
              this.props.history.push('/servicetype')
            }} thumb={require('../assets/fuwuxiangmu.png')} arrow="horizontal" extra={this.props.user.userInfo.isSetType?'':<span className="fs-28 color-be">尚未设置</span>}><span className="fs-32 color-3">服务项目</span></Item>
            <Item onClick={()=>{
              this.props.history.push('/certification')
            }} thumb={require('../assets/shenfenrenzheng.png')} arrow="horizontal"  extra={this.props.user.userInfo.id_is_ok==='1'?<span className="fs-28 color-orange">已认证</span>:''}><span className="fs-32 color-3">身份认证</span></Item>

            <Item onClick={()=>{
              alert('', '确定退出吗?', [
                { text: '否', onPress: () => {}},
                { text: '是', onPress: () => {
                  this.props.dispatch({
                    type: 'home/logout',
                    success: () => {
                      this.props.history.replace('/login');
                    }
                  });
                } },
              ])
            }} thumb={require('../assets/exit.png')} arrow="horizontal"><span className="fs-32 color-3">退出</span></Item>
          </List>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <NavBar
          iconName={this.state.iconName}
          leftContent={this.state.leftContent}
          mode={this.state.navBarMode}
          onLeftClick={() => console.log('onLeftClick')}
        >{this.state.navBarTitle}</NavBar>
        <TabBar
          unselectedTintColor="#bbc1ca"
          tintColor="#4f8ded"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="任务池"
            key="index"
            icon={<div className={styles['home-icon']}/>}
            selectedIcon={<div className={styles['home-icon-sel']}/>}
            selected={this.state.selectedTab === 'indexTab'}
            onPress={() => {
              this.props.history.replace('/');
            }}
            data-seed="logId"
            style={{height: '100%'}}
          >
            {this.renderIndex('生活')}
          </TabBar.Item>
          <TabBar.Item
            title="订单"
            key="order"
            icon={<div className={styles['order-icon']}/>}
            selectedIcon={<div className={styles['order-icon-sel']}/>}
            selected={this.state.selectedTab === 'orderTab'}
            onPress={() => {
              this.props.history.replace('/indexpage/orderTab');
            }}
            data-seed="logId1"
          >
            {this.renderOrder('口碑')}
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            key="my"
            icon={<div className={styles['my-icon']}/>}
            selectedIcon={<div className={styles['my-icon-sel']}/>}
            selected={this.state.selectedTab === 'myTab'}
            onPress={() => {
              this.props.history.replace('/indexpage/myTab');
            }}
          >
            {this.renderMy('我的')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

const MobileDemoWrapper = createForm()(MobileDemo);
export default connect(mapStateToProps)(MobileDemoWrapper);
