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
  height: 650px;
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

  button {
    border: 1px solid #eee;
    background: #191929;
    border-radius: 6px;
    height: 45px;

    span {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .ppplusDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
`;
