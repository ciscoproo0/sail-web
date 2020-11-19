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

function Dropin() {
  const [paid, setPaid] = useState(false);
  const [resPayload, setResPayload] = useState();
  const [errPayload, setErrPayload] = useState();

  const dropinScript = () => {
    const script = document.createElement('script');
    script.src =
      'https://js.braintreegateway.com/web/dropin/1.24.0/js/dropin.min.js';
    script.async = true;
    document.body.appendChild(script);

    return script;
  };

  const dropinContainer = () => {
    const dropin = dropinScript();

    const headers = {
      mode: 'sandbox',
      type: 'dcc',
    };

    dropin.addEventListener('load', async () => {
      const clientToken = await api.get('/bt/client-token', {
        headers,
      });

      const amount = '100.00';

      const button = document.getElementById('submit-button');

      window.braintree.dropin.create(
        {
          authorization: clientToken.data,
          container: '#dropin-container',
          currency: 'BRL',
          paypal: {
            flow: 'checkout',
            intent: 'capture',
            amount,
            currency: 'BRL',
            buttonStyle: {
              color: 'blue',
              shape: 'rect',
              size: 'responsive',
            },
          },
          card: {
            cardholderName: {
              required: true,
            },
          },
        },
        (createErr, instance) => {
          if (createErr) {
            setErrPayload(createErr);
          }

          button.addEventListener('click', () => {
            instance.on('paymentMethodRequestable', (event) => {
              console.log(event);
            });
            instance.requestPaymentMethod(async (err, payload) => {
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
    });
  };

  useEffect(() => {
    dropinContainer();
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
          <div id="dropin-container"> </div>
          <button type="submit" id="submit-button">
            <span>Pay</span>
          </button>
        </PaymentArea>
      )}
    </Container>
  );
}

export default Dropin;
