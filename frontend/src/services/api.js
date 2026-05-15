import axios from 'axios';
import { MOCK_WORKFLOWS, MOCK_ARTICLES, MOCK_POSTS } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Helper to handle API calls with mock fallback
const withFallback = async (apiCall, mockData) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.warn(`API call failed, falling back to mock data: ${error.message}`);
    return mockData;
  }
};

export const getWorkflows = () => 
  withFallback(() => api.get('/workflows'), MOCK_WORKFLOWS);

export const getWorkflowById = (id) => 
  withFallback(() => api.get(`/workflow/${id}`), MOCK_WORKFLOWS.find(w => w.id === id));

export const getArticles = () => 
  withFallback(() => api.get('/articles'), MOCK_ARTICLES);

export const getPosts = () => 
  withFallback(() => api.get('/posts'), MOCK_POSTS);

export default api;
