import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect} from 'dva/router';
import * as tokenUtil from './utils/tokenUtil';
import IndexPage from './routes/IndexPage';

import ServiceType from "./routes/ServiceType.js";
import App from "./routes/App.js";
import Auth from "./routes/Auth.js";

import Login from "./routes/Login.js";

import Register from "./routes/Register.js";

import FindPassword from "./routes/FindPassword.js";

import OrderDetail from "./routes/OrderDetail.js";

import Order from "./routes/Order.js";

import ServiceAddress from "./routes/ServiceAddress.js";

import Certification from "./routes/Certification.js";

import Bill from "./routes/Bill.js";

import ServiceOffer from "./routes/ServiceOffer.js";

import Receipt from "./routes/Receipt.js";

import ServiceCard from "./routes/ServiceCard.js";

import Coupon from "./routes/Coupon.js";

import Income from "./routes/Income.js";

import ApplyIncome from "./routes/ApplyIncome.js";

import IncomeRecord from "./routes/IncomeRecord.js";

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/indexpage" />
        <Route path="auth" component={Auth}  onEnter={(nextState, replaceState) => {
          if (!tokenUtil.get()) {
            let fromurl = encodeURIComponent(nextState.location.pathname+nextState.location.search);
            replaceState('/login?from='+fromurl);
          }
        }} onChange={(prevState, nextState, replace) => {
          if(nextState.location.pathname == '/indexpage'){
            return;
          }
          if (!tokenUtil.get()) {
            let fromurl = encodeURIComponent(nextState.location.pathname+nextState.location.search);
            replace('/login?from='+fromurl);
          }
        }
        }>
          <Route path="/indexpage(/:tabIndex)" component={IndexPage}/>
          <Route path="/servicetype" component={ServiceType}/>
          <Route path="/findpassword" component={FindPassword}/>
          <Route path="/orderdetail" component={OrderDetail}/>
          <Route path="/order" component={Order} title="提交订单"/>
          <Route path="/serviceaddress(/:from)" component={ServiceAddress}/>
          <Route path="/certification" component={Certification}/>
          <Route path="/bill" component={Bill}/>
          <Route path="/serviceoffer" component={ServiceOffer}/>
          <Route path="/receipt" component={Receipt}/>
          <Route path="/servicecard" component={ServiceCard}/>
          <Route path="/coupon" component={Coupon}/>
          <Route path="/income" component={Income}/>
          <Route path="/applyincome" component={ApplyIncome}/>
          <Route path="/incomerecord" component={IncomeRecord}/>
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Route>

    </Router>
  );
}

export default RouterConfig;
