import axios from 'axios';

const API_URL = 'https://ne7runner.ru/api';

/**
 * Générer un lien de paiement avec Plisio
 * @param amount Montant à payer
 * @param currency Devise choisie (BTC, ETH, XMR, LTC, USDT, TRX)
 * @param description Description du paiement
 * @returns URL de paiement ou null en cas d'erreur
 */
export const payWithCrypto = async (
    amount: number,
    currency: 'BTC' | 'ETH' | 'XMR' | 'LTC' | 'USDT' | 'TRX',
    description: string
): Promise<string | null> => {
    try {
        const response = await axios.post(`${API_URL}/create-payment`, {
            amount,
            currency,
            description,
        });

        return response.data.payment_url;
    } catch (error) {
        console.error('❌ Erreur lors de la création du paiement:', error);
        return null;
    }
};

/**
 * Vérifier le statut d'un paiement via l'ID de transaction
 * @param invoiceId ID de la transaction Plisio
 * @returns Statut du paiement ou null en cas d'erreur
 */
export const checkPaymentStatus = async (invoiceId: string): Promise<string | null> => {
    try {
        const response = await axios.get(`${API_URL}/payment-status/${invoiceId}`);

        return response.data.status; // Exemple: "pending", "confirmed", "failed"
    } catch (error) {
        console.error('❌ Erreur lors de la vérification du paiement:', error);
        return null;
    }
};

export default {
    payWithCrypto,
    checkPaymentStatus,
};
