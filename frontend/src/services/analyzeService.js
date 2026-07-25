import api from './api';

export const analyzeUrl = async (url) => {
  const response = await api.post('/api/analyze', { url });
  return response.data;
};
