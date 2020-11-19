import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 60px auto;
`;

export const Search = styled.div`
  background: transparent;
  border-radius: 6px;
  padding: 5px;

  input {
    color: #999999;
    height: 50px;
    padding: 5px 15px 5px 15px;
    width: 400px;
    height: 50px;
    border-radius: 6px;
    margin: 10px;

    &:focus {
      color: rgba(0, 0, 0, 0.9);
    }
  }

  select {
    color: #999999;

    height: 40px;
    width: 80px;
    border-radius: 6px;
    border: 1px solid #eee;

    padding: 5px 15px 5px 15px;
    margin: 10px;

    &:focus {
      color: rgba(0, 0, 0, 0.9);
    }
  }

  button {
    height: 40px;
    width: 80px;
    border-radius: 6px;
    border: 1px solid #eee;
    background: transparent;

    span {
      font-weight: bold;
      font-size: 14px;
      color: #fff;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 10px;
  margin: 10px auto;
  border-radius: 6px;

  h1 {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.8);
    margin: 20px;
  }

  span {
    margin: 10px 0 10px;
  }

  pre {
    margin: 10px 0 10px;
  }
`;
