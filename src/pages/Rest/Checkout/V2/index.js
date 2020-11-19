/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Container, PaymentArea } from './styles';

import SaibaMais from '../../../../assets/images/saibamais.png';

function V2() {
  const [paid, setPaid] = useState(false);
  const [resPayload, setResPayload] = useState();
  const [errPayload, setErrPayload] = useState();

  const PPLib = () => {
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AfFJFbYOJ3aA_kojKbPoM-G_7WiB0tjq5tfZpVimd4CjMSCpJERzKCs-eb_CRAAA8-JqxhClACYiEfj-&currency=BRL';
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      const CREATE_ORDER_URL = 'https://sail-api.herokuapp.com/create-order';
      const CAPTURE_ORDER_URL = 'https://sail-api.herokuapp.com/capture-order';

      const headers = {
        mode: 'sandbox',
      };
      const body = {
        purchase_units: [
          {
            amount: {
              currency_code: 'BRL',
              value: '11.00',
              breakdown: {
                item_total: {
                  currency_code: 'BRL',
                  value: '10.00',
                },
                shipping: {
                  currency_code: 'BRL',
                  value: '2.00',
                },
                shipping_discount: {
                  currency_code: 'BRL',
                  value: '0.50',
                },
                discount: {
                  currency_code: 'BRL',
                  value: '0.50',
                },
              },
            },
            description: 'Purchase made in Sail payment playground',
            items: [
              {
                name: 'TeeShirt white',
                quantity: '1',
                description: 'Basic t-shirt',
                sku: 'tee0009123',
                category: 'PHYSICAL_GOODS',
                unit_amount: {
                  currency_code: 'BRL',
                  value: '5.00',
                },
              },
              {
                name: 'TeeShirt black',
                quantity: '1',
                description: 'Basic t-shirt',
                sku: 'tee0009qwe123',
                category: 'PHYSICAL_GOODS',
                unit_amount: {
                  currency_code: 'BRL',
                  value: '5.00',
                },
              },
            ],
            shipping: {
              address: {
                address_line_1: 'Avenida Paulista, 1048',
                address_line_2: '14 andar',
                admin_area_2: 'São Paulo',
                admin_area_1: 'SP',
                postal_code: '01310-100',
                country_code: 'BR',
              },
            },
          },
        ],
      };

      window.paypal
        .Buttons({
          // Call your server to set up the transaction
          createOrder: async function (data, actions) {
            try {
              const response = await axios.post(CREATE_ORDER_URL, body, {
                headers: { mode: 'sandbox' },
              });

              return response.data.id;
            } catch (err) {
              console.log({
                Error: 'Error at create order',
                OriginalMessage: err.message,
              });
              return err.message;
            }
          },

          // Call your server to finalize the transaction
          onApprove: async function (data, actions) {
            try {
              const response = await axios.post(
                CAPTURE_ORDER_URL,
                { orderId: data.orderID },
                {
                  headers: { mode: 'sandbox' },
                }
              );

              setResPayload(response.data);
              setPaid(true);

              console.log(response.data);
              return response.data;
            } catch (err) {
              console.log({
                Error: 'Error at capture order',
                OriginalMessage: err.message,
              });
              setErrPayload(err);

              return err.message;
            }
          },
        })
        .render('#paypal-button-container');
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
          <div id="paypal-button-container"> </div>
        </PaymentArea>
      )}
    </Container>
  );
}

export default V2;
