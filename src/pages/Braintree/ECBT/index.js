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

import SaibaMais from '../../../assets/images/saibamais.png';

function ECBT() {
  const [paid, setPaid] = useState(false);
  const [resPayload, setResPayload] = useState();
  const [errPayload, setErrPayload] = useState();

  const ppScript = () => {
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AfFJFbYOJ3aA_kojKbPoM-G_7WiB0tjq5tfZpVimd4CjMSCpJERzKCs-eb_CRAAA8-JqxhClACYiEfj-&currency=BRL';
    script.async = true;
    document.body.appendChild(script);

    return script;
  };

  const btScript = () => {
    const script = document.createElement('script');
    script.src = 'https://js.braintreegateway.com/web/3.65.0/js/client.min.js';
    script.async = true;
    document.body.appendChild(script);

    return script;
  };

  const btPpScript = () => {
    const script = document.createElement('script');
    script.src =
      'https://js.braintreegateway.com/web/3.65.0/js/paypal-checkout.min.js';
    script.async = true;
    document.body.appendChild(script);

    return script;
  };

  const PPButton = () => {
    btScript();
    btPpScript();

    const headers = {
      mode: 'sandbox',
      type: 'ecbt',
    };

    const PayPalScript = ppScript();
    PayPalScript.addEventListener('load', async () => {
      const clientToken = await api.get('/bt/client-token', {
        headers,
      });

      const amount = '100.00';

      window.braintree.client
        .create({
          authorization: clientToken.data,
        })
        .then((clientInstance) => {
          return window.braintree.paypalCheckout.create({
            client: clientInstance,
          });
        })
        .then((paypalCheckoutInstance) => {
          return paypalCheckoutInstance.loadPayPalSDK({
            currency: 'BRL',
            intent: 'capture',
          });
        })
        .then((paypalCheckoutInstance) => {
          return window.paypal
            .Buttons({
              fundingSource: window.paypal.FUNDING.PAYPAL,

              createOrder: () => {
                return paypalCheckoutInstance.createPayment({
                  flow: 'checkout',
                  amount,
                  currency: 'BRL',
                  enableShippingAddress: false,
                  intent: 'capture',
                  lineItems: [
                    {
                      quantity: '1',
                      unitAmount: '50.00',
                      name: 'CSGO knife 1423',
                      description: 'Knife red damascus steel',
                    },
                    {
                      quantity: '1',
                      unitAmount: '50.00',
                      name: 'CSGO knife 441',
                      description: 'Knife blue damascus steel',
                    },
                  ],
                  // enableShippingAddress: true,
                  // shippingAddressEditable: false,
                  // shippingAddressOverride: {
                  //   recipientName: 'Scruff McGruff',
                  //   line1: '1234 Main St.',
                  //   line2: 'Unit 1',
                  //   city: 'Chicago',
                  //   countryCode: 'US',
                  //   postalCode: '60652',
                  //   state: 'IL',
                  //   phone: '123.456.7890'
                  // }
                });
              },

              onApprove: (data, actions) => {
                return paypalCheckoutInstance
                  .tokenizePayment(data)
                  .then(async (payload) => {
                    const response = await api.post(
                      'bt/execute-transaction',
                      {
                        amount,
                        nonce: payload.nonce,
                      },
                      {
                        headers,
                      }
                    );

                    if (response.data.success) {
                      setResPayload(response.data.transaction);
                      setPaid(true);
                    } else {
                      setPaid(false);
                      setErrPayload(response.data);
                    }
                  });
              },

              onCancel: (data) => {
                console.log(
                  'PayPal payment cancelled',
                  JSON.stringify(data, null, 2)
                );
              },

              onError: (err) => {
                console.error('PayPal error', err);
                setErrPayload(err);
              },
            })
            .render('#paypal-button-container');
        });
    });
  };

  useEffect(() => {
    PPButton();
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
          <span>{JSON.stringify(errPayload, null, 2)}</span>
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

export default ECBT;
