import axios from 'axios';

const API_URL = 'https://ne7runner.ru/api';

export const getAuthCode = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/generate`);
    return response.data.code;
  } catch (error) {
    console.error('Erreur lors de la récupération du code :', error);
    return null;
  }
};

export const loginWithCode = async (code: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { code });
    return response.data.token; // Retourne le token JWT
  } catch (error) {
    console.error('Erreur de connexion :', error);
    return null;
  }
};

export const getMyCode = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Aucun token trouvé, utilisateur non authentifié.');
      return null;
    }

    const response = await axios.get(`${API_URL}/auth/my-code`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.code;
  } catch (error) {
    console.error('Erreur lors de la récupération du code utilisateur :', error);
    return null;
  }
};

export const createTicket = async (title: string, description: string) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Aucun token trouvé, utilisateur non authentifié.');
      return null;
    }

    const response = await axios.post(
      `${API_URL}/tickets/open`,
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du ticket :', error);
    return null;
  }
};

export const getUserTickets = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Aucun token trouvé, utilisateur non authentifié.');
      return [];
    }

    const response = await axios.get(`${API_URL}/tickets/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des tickets :', error);
    return [];
  }
};

export const addMessage = async (ticketId: string, content: string) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Aucun token trouvé.');
      return null;
    }

    const response = await axios.post(
      `${API_URL}/tickets/${ticketId}/messages`,
      { content },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l’ajout du message :', error);
    return null;
  }
};

export const getMessages = async (ticketId: string) => {
  try {
    const token = localStorage.getItem('authToken');  
    if (!token) {
      console.error('Aucun token trouvé.');
      return [];
    }

    const response = await axios.get(`${API_URL}/tickets/${ticketId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des messages :', error);
    return [];
  }
};

export default {
  getAuthCode,
  loginWithCode,
  getMyCode,
  createTicket,
  getUserTickets,
  addMessage,
  getMessages,
};
