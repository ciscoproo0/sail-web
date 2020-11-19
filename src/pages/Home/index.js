import React from 'react';

import { Container, Integrations } from './styles';
import history from '../../services/history';

function Home() {
  return (
    <Container>
      <Integrations>
        <h1>NVP</h1>
        <button type="button">PayPal NVP Integrations</button>
      </Integrations>
      <Integrations>
        <h1>REST</h1>
        <button type="button" onClick={() => history.push('/rest')}>
          PayPal REST Integrations
        </button>
      </Integrations>
      <Integrations>
        <h1>Braintree</h1>
        <button type="button" onClick={() => history.push('/bt')}>
          Braintree Integrations
        </button>
      </Integrations>
    </Container>
  );
}

export default Home;
