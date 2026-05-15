import axios from 'axios';
import { workflows, agents, articles, publishingLogs } from '../data/mockData';

// Simulated delay for realistic feeling
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const workflowService = {
  getAll: async () => {
    // In production: return api.get('/workflows');
    await delay(800);
    return { data: workflows };
  },
  getById: async (id) => {
    // In production: return api.get(`/workflow/${id}`);
    await delay(500);
    return { data: workflows.find(w => w.id === id) || workflows[0] };
  },
};

export const articleService = {
  getAll: async () => {
    // In production: return api.get('/articles');
    await delay(1000);
    return { data: articles };
  },
};

export const logService = {
  getAll: async () => {
    // In production: return api.get('/logs');
    await delay(600);
    return { data: publishingLogs };
  },
};

export default api;
