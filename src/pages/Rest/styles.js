import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 60px auto;
`;

export const Integrations = styled.div`
  max-width: 600px;
`;

export const Integration = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  height: 70px;
  width: 500px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 10px;

  div {
    width: 180px;
    border-right: 1px solid #ddd;

    span {
      font-size: 16px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.9);
    }
  }

  p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
    margin-left: 5px;
    max-width: 400px;
    padding: 5px;
  }
`;
