import axios from 'axios';
import { userPool } from '../cognito';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      await new Promise<void>((resolve, reject) => {
        cognitoUser.getSession((err: any, session: any) => {
          if (err) {
            reject(err);
            return;
          }
          const token = session.getIdToken().getJwtToken();
          config.headers.Authorization = `Bearer ${token}`;
          resolve();
        });
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;