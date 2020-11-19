import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Rest from './pages/Rest';
import CheckoutV1 from './pages/Rest/Checkout/V1';
import CheckoutV2 from './pages/Rest/Checkout/V2';
import Plus from './pages/Rest/Plus';
import GTD from './pages/Rest/GTD';
import Braintree from './pages/Braintree';
import ECBT from './pages/Braintree/ECBT';
import Dropin from './pages/Braintree/Dropin';
import DCC from './pages/Braintree/DCC';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/rest" exact component={Rest} />
      <Route path="/rest/checkout/v1" exact component={CheckoutV1} />
      <Route path="/rest/checkout/v2" exact component={CheckoutV2} />
      <Route path="/rest/plus" exact component={Plus} />
      <Route path="/rest/gtd" exact component={GTD} />

      <Route path="/bt" exact component={Braintree} />
      <Route path="/bt/ecbt" exact component={ECBT} />
      <Route path="/bt/dropin" exact component={Dropin} />
      <Route path="/bt/dcc" exact component={DCC} />
    </Switch>
  );
};

export default Routes;
