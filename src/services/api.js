import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://sail-api.herokuapp.com',
});
