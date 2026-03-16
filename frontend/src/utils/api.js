import axios from 'axios';

// Client Axios avec l'URL du backend
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
});

// ---- ABSENCES ----
export const getAbsences = async () => {
  const res = await apiClient.get('/absences');
  return res.data;
};

// ---- STATISTIQUES ----
export const getStatsGlobal = async () => {
  const res = await apiClient.get('/statistiques/global');
  return res.data;
};

export const getHighRisk = async () => {
  const res = await apiClient.get('/statistiques/high-risk');
  return res.data;
};

export const getByClasse = async () => {
  const res = await apiClient.get('/statistiques/by-classe');
  return res.data;
};

export const getByMatiere = async () => {
  const res = await apiClient.get('/statistiques/by-matiere');
  return res.data;
};

export const getMonthly = async () => {
  const res = await apiClient.get('/statistiques/monthly');
  return res.data;
};
