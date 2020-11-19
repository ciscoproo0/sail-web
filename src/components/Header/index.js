import React from 'react';

import { Container } from './styles';

import history from '../../services/history';

function Header() {
  return (
    <Container>
      <button type="button" onClick={() => history.push('/')}>
        Sail
      </button>
    </Container>
  );
}
export default Header;
