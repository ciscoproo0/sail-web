import React from 'react';

import { Container, Integrations, Integration } from './styles';
import history from '../../services/history';

function Rest() {
  return (
    <Container>
      <Integrations>
        <Integration onClick={() => history.push('/bt/ecbt')}>
          <div>
            <span>PayPal Checkout - ECBT</span>
          </div>
          <p>Most Traditional PayPal Checkout using Braintree SDK.</p>
        </Integration>
        <Integration onClick={() => history.push('/bt/dropin')}>
          <div>
            <span>Braintree DropIn</span>
          </div>
          <p>White-label Checkout, using dropin feature from Braintree SDK.</p>
        </Integration>
        <Integration onClick={() => history.push('/bt/dcc')}>
          <div>
            <span>Braintree DCC</span>
          </div>
          <p>White label product using pure html to complete transactions.</p>
        </Integration>
        <Integration onClick={() => history.push('/rest/gtd')}>
          <div>
            <span>Transactions</span>
          </div>
          <p>
            Simple search to consult transactions by Transaction ID from
            Braintree
          </p>
        </Integration>
      </Integrations>
    </Container>
  );
}

export default Rest;
