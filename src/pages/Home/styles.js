import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 60px auto;
`;

export const Integrations = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  background: #fff;
  padding: 10px;
  margin: 10px;
  border-radius: 6px;

  h1 {
    font-size: 40px;
    margin: 50px auto;
    padding-bottom: 50px;
    color: rgba(0, 0, 0, 0.7);
  }

  button {
    color: rgba(0, 0, 0, 0.7);
    padding: 20px;
    font-weight: bold;
    font-size: 14px;
    border: 1px solid #191929;
    border-radius: 6px;
    background: #fff;
  }
`;
