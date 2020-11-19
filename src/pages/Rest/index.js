import React from 'react';

import { Container, Integrations, Integration } from './styles';
import history from '../../services/history';

function Rest() {
  return (
    <Container>
      <Integrations>
        <Integration onClick={() => history.push('/rest/checkout/v1')}>
          <div>
            <span>PayPal Checkout</span>
          </div>
          <p>
            Most Traditional Checkout using JSV4 technology and Payments V1
            stack
          </p>
        </Integration>
        <Integration onClick={() => history.push('/rest/checkout/v2')}>
          <div>
            <span>PayPal Checkout</span>
          </div>
          <p>
            Most Traditional Checkout using Payments SDK technology and Payments
            V2 stack
          </p>
        </Integration>
        <Integration onClick={() => history.push('/rest/plus')}>
          <div>
            <span>PayPal Plus</span>
          </div>
          <p>
            Regional Product for Brazil and Mexico for transparent solution
            (white label) using Payments V1 stack
          </p>
        </Integration>
        <Integration onClick={() => history.push('/rest/gtd')}>
          <div>
            <span>Transactions</span>
          </div>
          <p>Simple search to consult transactions by Payment ID or Order ID</p>
        </Integration>
      </Integrations>
    </Container>
  );
}

export default Rest;
