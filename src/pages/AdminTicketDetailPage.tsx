import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { getMessagesAdmin, addMessageAdmin } from '../services/adminApi';

interface Message {
  id: number;
  content: string;
  isAdmin: boolean;
  createdAt: string;
}

interface Ticket {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
}

interface AdminTicketDetailPageProps {
  ticket: Ticket;
  onBack: () => void;
}

function AdminTicketDetailPage({ ticket, onBack }: AdminTicketDetailPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [ticket.id]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const ticketMessages = await getMessagesAdmin(ticket.id);
  
      const formattedMessages = ticketMessages.map(msg => ({
        ...msg,
        isAdmin: msg.sender === 'admin',
        createdAt: msg.createdAt ? new Date(msg.createdAt).toISOString() : new Date().toISOString()
      }));
  
      setMessages(formattedMessages);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des messages (Admin):", error);
    }
    setLoading(false);
  };  
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
  
    setSending(true);
    try {
      const result = await addMessageAdmin(ticket.id, newMessage.trim());
      if (result) {
        setMessages([...messages, {
          id: Date.now(),
          content: newMessage.trim(),
          isAdmin: true,
          createdAt: new Date().toISOString()
        }]);
        setNewMessage('');
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi du message (Admin):", error);
    }
    setSending(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">{ticket.title}</h2>
          <p className="text-sm text-gray-400">
            Created on {new Date(ticket.createdAt).toLocaleTimeString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <span
          className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
            ticket.status === 'open'
              ? 'bg-green-900/50 text-green-300 border border-green-800/50'
              : ticket.status === 'in_progress'
              ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800/50'
              : 'bg-gray-900/50 text-gray-300 border border-gray-800/50'
          }`}
        >
          {ticket.status.replace('_', ' ')}
        </span>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-6">
        <h3 className="text-lg font-semibold mb-2 text-white">Description</h3>
        <p className="text-gray-300">{ticket.description}</p>
      </div>

      <div className="flex-1 bg-gray-800/50 rounded-lg border border-gray-700 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto max-h-[500px]">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
                >
                  <div className="flex flex-col">
                    <span className={`text-sm mb-1 ${message.isAdmin ? 'text-gray-400' : 'text-gray-400 self-end'}`}>
                      {message.isAdmin ? 'Admin' : 'User'}
                    </span>
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.isAdmin
                          ? 'bg-gray-700 text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs mt-2 opacity-70">
                        {new Date(message.createdAt).toLocaleTimeString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No messages yet.</p>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminTicketDetailPage;