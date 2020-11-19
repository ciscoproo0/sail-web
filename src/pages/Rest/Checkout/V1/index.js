/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, PaymentArea } from './styles';

import SaibaMais from '../../../../assets/images/saibamais.png';

function V1() {
  const [paid, setPaid] = useState(false);
  const [resPayload, setResPayload] = useState(['']);
  const [errPayload, setErrPayload] = useState();

  const PPLib = () => {
    const script = document.createElement('script');
    script.src = 'https://www.paypalobjects.com/api/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      const CREATE_PAYMENT_URL =
        'https://sail-api.herokuapp.com/create-payment';
      const EXECUTE_PAYMENT_URL =
        'https://sail-api.herokuapp.com/execute-payment';

      const headers = {
        mode: 'sandbox',
      };
      const body = {
        amount: {
          total: '100.00',
          currency: 'BRL',
          details: {
            subtotal: '100.00',
            shipping: '0',
            shipping_discount: '0',
          },
        },
        description: 'Pagamento teste com aplicação react',
        items: [
          {
            name: 'Counter-Strike: Global Offensive',
            description: 'FPS Strategic shooter',
            quantity: '1',
            price: '100.00',
            sku: 'CS:GO0001',
            currency: 'BRL',
          },
        ],
      };

      window.paypal.Button.render(
        {
          env: 'sandbox',

          style: {
            label: 'paypal',
            size: 'responsive', // small | medium | large | responsive
            shape: 'rect', // pill | rect
            color: 'gold', // gold | blue | silver | black
            tagline: false,
          },

          payment: function (data, actions) {
            return actions
              .request({
                method: 'POST',
                url: CREATE_PAYMENT_URL,
                json: body,
                headers,
              })
              .then(function (res) {
                return res.id;
              });
          },

          onAuthorize: function (data, actions) {
            return actions
              .request({
                method: 'POST',
                url: EXECUTE_PAYMENT_URL,
                json: {
                  payerId: data.payerID,
                  paymentId: data.paymentID,
                },
                headers: {
                  mode: 'sandbox',
                  // mock: 'INSTRUMENT_DECLINED',
                },
              })
              .then(function (res) {
                setResPayload(res);

                console.log(res);

                let state =
                  res.transactions['0'].related_resources['0'].sale.state;
                if (state === 'completed') {
                  setPaid(true);
                } else {
                  setPaid(false);
                  setErrPayload(res);
                }
              });
          },
          onCancel: function (data) {
            alert(
              `Canceled purchase, hermes closed. Original Message in console`
            );
            console.log(data);
          },

          onError: function (err) {
            setErrPayload(err);
          },
        },
        '#paypal-button'
      );
    });
  };

  useEffect(() => {
    PPLib();
  }, []);

  return (
    <Container>
      {paid ? (
        <PaymentArea>
          <h1>Transaction success!</h1>

          <p>Payment ID is: {resPayload.id}</p>
          <span>
            Go to
            <Link to={`/rest/gtd?id=${resPayload.id}`}>
              Transaction Details
            </Link>{' '}
            to see the complete info.
          </span>
        </PaymentArea>
      ) : errPayload ? (
        <PaymentArea>
          <h1>There was a problem with this transaction</h1>

          <p>Paypal Original Message:</p>
          <span>{errPayload.message}</span>
        </PaymentArea>
      ) : (
        <PaymentArea>
          <img src={SaibaMais} alt="Saiba Mais PayPal" />
          <div id="paypal-button"> </div>
        </PaymentArea>
      )}
    </Container>
  );
}

export default V1;
