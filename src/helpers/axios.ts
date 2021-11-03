import axios from 'axios';

export const sampleInstance = axios.create({
  baseURL: process.env.API_URL,
});

export const dashboardInstance = axios.create({
  baseURL: process.env.DEFI_DASHBOARD_API_URL,
});
