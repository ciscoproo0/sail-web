import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 60px auto;
`;

export const PaymentArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 500px;
  background: #fff;
  border-radius: 6px;

  h1 {
    padding: 10px;
    margin: 30px auto 60px;
  }

  p {
    margin: 0px auto 20px;
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;
    font-weight: bold;
  }

  span {
    margin: 0px auto;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    padding: 10px;
  }

  img {
    width: 550px;
    align-self: center;
    padding: 10px;
    margin-bottom: 20px;
  }

  .dropin-container {
    padding: 5px;
    margin: 20px;
    width: 500px;
  }

  button {
    height: 40px;
    background: #161621;
    border: none;
    border-radius: 4px;
    margin: 5px;

    span {
      font-weight: bold;
      font-size: 16px;
      color: #fff;
    }
  }
`;
