/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Search, Content } from './styles';

import { api } from '../../../services/api';

function GTD({ location }) {
  const params = new URLSearchParams(location.search);
  const INITIAL_VALUE = params.get('id') || '';

  const [search, setSearch] = useState(INITIAL_VALUE);
  const [result, setResult] = useState();
  const [errResult, setErrResult] = useState();
  const [version, setVersion] = useState('V1');

  const SubmitButton = async (event) => {
    event.preventDefault();

    try {
      let response;
      if (version === 'V1') {
        response = await api.get(`/gtd?id=${search}`, {
          headers: { mode: 'sandbox', version },
        });
      } else if (version === 'V2') {
        response = await api.get(`/goi?id=${search}`, {
          headers: { mode: 'sandbox', version },
        });
      } else if (version === 'ECBT') {
        response = await api.get(`/bt/gtd?transactionId=${search}`, {
          headers: { mode: 'sandbox', type: 'ecbt' },
        });
      } else {
        response = await api.get(`/bt/gtd?transactionId=${search}`, {
          headers: { mode: 'sandbox', type: 'dcc' },
        });
      }

      setResult(response.data);
      setSearch('');
    } catch (err) {
      setErrResult(err);
    }
  };

  const HandleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSelect = (event) => {
    setVersion(event.target.value);
  };
  return (
    <Container>
      <Search>
        <input
          type="text"
          id="search"
          placeholder="Insert Payment ID or Order ID"
          value={search || ''}
          onChange={(event) => HandleChange(event)}
        />
        <select
          value={version}
          id="value-select"
          name="Version"
          onChange={handleSelect}
        >
          <option value="V1">V1</option>
          <option value="V2">V2</option>
          <option value="ECBT">ECBT</option>
          <option value="BT">BT</option>
        </select>
        <button type="submit" onClick={SubmitButton}>
          <span>Search</span>
        </button>
      </Search>
      {result && !errResult ? (
        <Content>
          <h1>Result for {result.id}</h1>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </Content>
      ) : errResult ? (
        <Content>
          <h1>No result found =\</h1>
        </Content>
      ) : null}
    </Container>
  );
}

GTD.propTypes = {
  location: PropTypes.instanceOf(Object),
};

GTD.defaultProps = {
  location: null,
};

export default GTD;
