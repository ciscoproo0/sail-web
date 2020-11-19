/* eslint-disable spaced-comment */
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, PaymentArea } from './styles';
import { api } from '../../../services/api';

function Plus() {
  const [paid, setPaid] = useState(false);
  const [pppAction, setPppAction] = useState();
  const [resPayload, setResPayload] = useState(['']);
  const [errPayload, setErrPayload] = useState();

  const PPLib = () => {
    const script = document.createElement('script');
    script.src =
      'https://www.paypalobjects.com/webstatic/ppplusdcc/ppplusdcc.min.js';
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener('load', async () => {
      const headers = {
        mode: 'sandbox',
        type: 'plus',
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

      try {
        const { data } = await api.post('/create-payment', body, { headers });

        // payload from iFrame
        const ppp = window.PAYPAL.apps.PPP({
          approvalUrl: data.links[1].href,
          placeholder: 'ppplusDiv',
          mode: 'sandbox',
          payerFirstName: 'Carlos',
          payerLastName: 'Alberto',
          payerEmail: 'franciscoTest@gmail.com',
          payerPhone: '1199992999',
          payerTaxId: '36588174888',
          payerTaxIdType: 'BR_CPF',
          language: 'pt_BR',
          country: 'BR',
          rememberedCards: 'customerRememberedCardHash',
          onContinue: (cardhash, payerId, payment_id) => {
            //executed after doContinue Button, returns payerID
            ExecutePayment(payerId, data.id);
          },
          onError: (error) => {
            setErrPayload(error);
          },
        });

        setPppAction(ppp);
      } catch (err) {
        setErrPayload(err);
      }
    });
  };

  const OnSubmitButton = async (event) => {
    event.preventDefault();
    pppAction.doContinue();
  };

  const ExecutePayment = async (payerId, paymentId) => {
    try {
      const { data } = await api.post(
        '/execute-payment',
        { payerId, paymentId },
        {
          headers: {
            mode: 'sandbox',
            type: 'plus',
          },
        }
      );

      setResPayload(data);
      setPaid(true);
    } catch (err) {
      setErrPayload(err);
    }
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
            <Link
              to={`/rest/
          gtd?id=${resPayload.id}`}
            >
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
          <div id="ppplusDiv" className="ppplusDiv">
            {' '}
          </div>
          <button type="submit" onClick={OnSubmitButton}>
            <span>Checkout</span>
          </button>
        </PaymentArea>
      )}
    </Container>
  );
}

export default Plus;
