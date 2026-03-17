import axios from 'axios';

// Client Axios avec l'URL du backend
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
});

// ---- ABSENCES ----
export const getAbsences = async () => {
  try {
    const res = await apiClient.get('/absences');
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des absences :", error);
    throw error;
  }
};

// ---- STATISTIQUES ----
export const getStatsGlobal = async () => {
  try {
    const res = await apiClient.get('/statistiques/global');
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques global :", error);
    throw error;
  }
};

export const getHighRisk = async () => {
  try {
    const res = await apiClient.get('/statistiques/high-risk');
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques high-risk :", error);
    throw error;
  }
};

export const getByClasse = async () => {
  try{
    const res = await apiClient.get('/statistiques/by-classeroom');
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques classeroom :", error);
    throw error;
  }
};

export const getByMatiere = async () => {
  try{
    const res = await apiClient.get('/statistiques/by-subject');
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques subject :", error);
    throw error;
  }
};

export const getMonthly = async () => {
  try{
    const res = await apiClient.get('/statistiques/monthly');
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques monthly :", error);
    throw error;
  }
};
