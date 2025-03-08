import axios from 'axios';

const API_URL = 'https://ne7runner.ru/api';

const getAdminToken = (): string | null => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        console.error('❌ Aucun token admin trouvé.');
        return null;
    }
    return token;
};

export const adminLogin = async (username: string, password: string): Promise<string | null> => {
    try {
        const response = await axios.post(`${API_URL}/admin/login`, { username, password });
        return response.data.token;
    } catch (error) {
        console.error('❌ Erreur de connexion admin :', error);
        return null;
    }
};

export const checkAdminStatus = async (): Promise<{ isAdmin: boolean }> => {
    try {
        const token = getAdminToken();
        if (!token) return { isAdmin: false };

        const response = await axios.get(`${API_URL}/admin/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        return { isAdmin: false };
    }
};

export const addMessageAdmin = async (ticketId: string, content: string): Promise<any> => {
    try {
        const token = getAdminToken();
        if (!token) return null;

        const response = await axios.post(
            `${API_URL}/tickets/${ticketId}/messages/admin`,
            { content },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return response.data;
    } catch (error) {
        console.error('❌ Erreur lors de l’ajout du message (Admin) :', error);
        return null;
    }
};

export const getMessagesAdmin = async (ticketId: string): Promise<any[]> => {
    try {
        const token = getAdminToken();
        if (!token) return [];

        const response = await axios.get(`${API_URL}/tickets/${ticketId}/messages/admin`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('❌ Erreur lors de la récupération des messages (Admin) :', error);
        return [];
    }
};

export const getAllUsers = async (): Promise<any[]> => {
    try {
        const token = getAdminToken();
        if (!token) return [];

        const response = await axios.get(`${API_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('❌ Erreur lors de la récupération des utilisateurs :', error);
        return [];
    }
};

export const deleteUser = async (userId: string): Promise<any> => {
    try {
        const token = getAdminToken();
        if (!token) return null;

        const response = await axios.delete(`${API_URL}/admin/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('❌ Erreur lors de la suppression de l’utilisateur :', error);
        return null;
    }
};

export const updateTicketStatusAdmin = async (ticketId: string, status: 'open' | 'in_progress' | 'closed'): Promise<any> => {
    try {
        const token = getAdminToken();
        if (!token) return null;

        const response = await axios.put(
            `${API_URL}/admin/tickets/${ticketId}/status`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return response.data;
    } catch (error) {
        console.error('❌ Erreur lors de la mise à jour du statut du ticket (Admin) :', error);
        return null;
    }
};

export const getAllTickets = async (): Promise<any[]> => {
    try {
        const token = getAdminToken();
        if (!token) return [];

        const response = await axios.get(`${API_URL}/admin/tickets`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('❌ Erreur lors de la récupération des tickets :', error);
        return [];
    }
};

export const deleteTicket = async (ticketId: string): Promise<any> => {
    try {
        const token = getAdminToken();
        if (!token) return null;

        const response = await axios.delete(`${API_URL}/admin/tickets/${ticketId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('❌ Erreur lors de la suppression du ticket :', error);
        return null;
    }
};

export default {
    addMessageAdmin,
    getMessagesAdmin,
    getAllUsers,
    deleteUser,
    adminLogin,
    updateTicketStatusAdmin,
    checkAdminStatus,
    getAllTickets,
    deleteTicket
};
