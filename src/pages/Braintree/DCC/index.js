/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';

import { Container, PaymentArea } from './styles';

function DCC() {
  const [paid, setPaid] = useState(false);
  const [resPayload, setResPayload] = useState();
  const [errPayload, setErrPayload] = useState();

  const clientScript = () => {
    const script = document.createElement('script');
    script.src = 'https://js.braintreegateway.com/web/3.65.0/js/client.min.js';
    script.async = true;
    document.body.appendChild(script);

    return script;
  };

  const hostedFieldsScript = () => {
    const script = document.createElement('script');
    script.src =
      'https://js.braintreegateway.com/web/3.65.0/js/hosted-fields.min.js';
    script.async = true;
    document.body.appendChild(script);

    return script;
  };

  const hostedFieldsContainer = () => {
    hostedFieldsScript();
    const hostedFields = clientScript();

    const headers = {
      mode: 'sandbox',
      type: 'dcc',
    };

    const amount = '100.00';

    const button = document.getElementById('submit-button');

    hostedFields.addEventListener('load', async () => {
      const clientToken = await api.get('/bt/client-token', {
        headers,
      });

      window.braintree.client.create(
        {
          authorization: clientToken.data,
        },
        (clientErr, clientInstance) => {
          if (clientErr) {
            setErrPayload(clientErr);
            return;
          }
          window.braintree.hostedFields.create(
            {
              client: clientInstance,
              styles: {
                input: {
                  'font-size': '14px',
                },
                'input.invalid': {
                  color: 'red',
                },
                'input.valid': {
                  color: 'green',
                },
              },
              fields: {
                number: {
                  selector: '#card-number',
                  placeholder: 'Insert Your Card Number',
                },
                cvv: {
                  selector: '#cvv',
                  placeholder: 'CVV',
                },
                expirationDate: {
                  selector: '#expiration-date',
                  placeholder: 'Expiration Date',
                },
              },
            },
            (hostedFieldsErr, hostedFieldsInstance) => {
              if (hostedFieldsErr) {
                setErrPayload(hostedFieldsErr);
                return;
              }

              button.addEventListener('click', () => {
                hostedFieldsInstance.tokenize(async (tokenizeErr, payload) => {
                  if (tokenizeErr) {
                    setErrPayload(tokenizeErr);
                    return;
                  }
                  const response = await api.post(
                    '/bt/execute-transaction',
                    {
                      nonce: payload.nonce,
                      amount,
                    },
                    { headers }
                  );

                  if (response.data.success) {
                    setResPayload(response.data.transaction);
                    setPaid(true);
                  } else {
                    setErrPayload(response.data);
                  }
                });
              });
            }
          );
        }
      );
    });
  };

  useEffect(() => {
    hostedFieldsContainer();
  }, []);

  return (
    <Container>
      {paid ? (
        <PaymentArea>
          <h1>Transaction success!</h1>

          <p>Payment ID is: {resPayload.id}</p>
          <span>
            Go to
            <Link to={`/rest/gtd?transactionId=${resPayload.id}`}>
              Transaction Details
            </Link>{' '}
            to see the complete info.
          </span>
        </PaymentArea>
      ) : errPayload ? (
        <PaymentArea>
          <h1>There was a problem with this transaction</h1>

          <p>Paypal Original Message:</p>
          <span>{JSON.stringify(errPayload, null, 2)}</span>
        </PaymentArea>
      ) : (
        <PaymentArea>
          <form method="post">
            <div className="card-number-container">
              <div id="card-number"> </div>
            </div>
            <div className="other-info-container">
              <div id="cvv"> </div>

              <div id="expiration-date"> </div>
            </div>
          </form>
          <button type="submit" id="submit-button">
            <span>Pay</span>
          </button>
        </PaymentArea>
      )}
    </Container>
  );
}

export default DCC;
