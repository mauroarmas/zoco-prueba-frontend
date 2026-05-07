import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const barService = {
  // GET /bars
  getAllBars: async () => {
    const response = await api.get('/bars');
    return response.data;
  },

  // GET /bars/:id
  getBarById: async (id) => {
    const response = await api.get(`/bars/${id}`);
    return response.data;
  },

  // POST /bars
  createBar: async (barData) => {
    const response = await api.post('/bars', barData);
    return response.data;
  },

  // PUT /bars/:id
  updateBar: async (id, barData) => {
    const response = await api.put(`/bars/${id}`, barData);
    return response.data;
  },

  // DELETE /bars/:id
  deleteBar: async (id) => {
    const response = await api.delete(`/bars/${id}`);
    return response.data;
  },

  // POST /bars/trigger-scraping
  triggerScraping: async (pageNumber) => {
    const response = await api.post('/bars/trigger-scraping', { pageNumber: Number(pageNumber) });
    return response.data;
  },
};
