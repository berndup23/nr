import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { getAllUsers, getAllTickets, deleteUser, deleteTicket, updateTicketStatusAdmin, checkAdminStatus } from '../services/adminApi';
import AdminTicketDetailPage from './AdminTicketDetailPage';

interface User {
  id: string;
  code: string;
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

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

function DeleteModal({ isOpen, onClose, onConfirm, title, message }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'user' | 'ticket';
    id: string;
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'user',
    id: '',
    title: '',
    message: ''
  });

  useEffect(() => {
    const verifyAuth = async () => {
      const { isAdmin } = await checkAdminStatus();
      if (!isAdmin) {
        window.location.href = '/admin/login';
      } else {
        setIsAuthenticated(true);
      }
    };
    verifyAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (activeTab === 'users') {
          const userData = await getAllUsers();
          setUsers(userData);
        } else if (activeTab === 'tickets') {
          const ticketData = await getAllTickets();
          setTickets(ticketData);
        }
      } catch (err) {
        setError('Failed to fetch data');
      }

      setLoading(false);
    };

    fetchData();
  }, [activeTab, isAuthenticated]);

  const handleDeleteUser = async (userId: string) => {
    setDeleteModal({
      isOpen: true,
      type: 'user',
      id: userId,
      title: 'Delete User',
      message: 'Are you sure you want to delete this user? This action cannot be undone.'
    });
  };

  const handleDeleteTicket = async (ticketId: string) => {
    setDeleteModal({
      isOpen: true,
      type: 'ticket',
      id: ticketId,
      title: 'Delete Ticket',
      message: 'Are you sure you want to delete this ticket? This action cannot be undone.'
    });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.type === 'user') {
      const result = await deleteUser(deleteModal.id);
      if (result) {
        setUsers(users.filter(user => user.id !== deleteModal.id));
      }
    } else {
      const result = await deleteTicket(deleteModal.id);
      if (result) {
        setTickets(tickets.filter(ticket => ticket.id !== deleteModal.id));
        if (selectedTicket?.id === deleteModal.id) {
          setSelectedTicket(null);
        }
      }
    }
  };

  const handleUpdateTicketStatus = async (ticketId: string, status: 'open' | 'in_progress' | 'closed') => {
    const result = await updateTicketStatusAdmin(ticketId, status);
    if (result) {
      const updatedTickets = tickets.map(ticket => 
        ticket.id === ticketId ? { ...ticket, status } : ticket
      );
      setTickets(updatedTickets);
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket({ ...selectedTicket, status });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={handleConfirmDelete}
        title={deleteModal.title}
        message={deleteModal.message}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden">
          <div className="border-b border-gray-800">
            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab('users');
                  setSelectedTicket(null);
                }}
                className={`px-6 py-4 font-medium flex items-center gap-2 ${
                  activeTab === 'users'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <Users size={18} />
                <span>Users</span>
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className={`px-6 py-4 font-medium flex items-center gap-2 ${
                  activeTab === 'tickets'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <MessageSquare size={18} />
                <span>Tickets</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-900/20 border border-red-800/50 text-red-400 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : activeTab === 'users' ? (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-lg font-mono text-white">{user.code}</p>
                        <p className="text-sm text-gray-400">Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedTicket ? (
              <AdminTicketDetailPage
                ticket={selectedTicket}
                onBack={() => setSelectedTicket(null)}
              />
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 cursor-pointer hover:border-gray-600 transition-colors"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{ticket.title}</h3>
                        <p className="text-sm text-gray-400">Created: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => handleUpdateTicketStatus(ticket.id, 'open')}
                          className={`p-2 rounded-md transition-colors ${
                            ticket.status === 'open'
                              ? 'bg-green-900/50 text-green-300'
                              : 'text-gray-400 hover:text-green-300'
                          }`}
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button
                          onClick={() => handleUpdateTicketStatus(ticket.id, 'in_progress')}
                          className={`p-2 rounded-md transition-colors ${
                            ticket.status === 'in_progress'
                              ? 'bg-yellow-900/50 text-yellow-300'
                              : 'text-gray-400 hover:text-yellow-300'
                          }`}
                        >
                          <Clock size={20} />
                        </button>
                        <button
                          onClick={() => handleUpdateTicketStatus(ticket.id, 'closed')}
                          className={`p-2 rounded-md transition-colors ${
                            ticket.status === 'closed'
                              ? 'bg-gray-900/50 text-gray-300'
                              : 'text-gray-400 hover:text-gray-300'
                          }`}
                        >
                          <XCircle size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteTicket(ticket.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <p className="text-white">{ticket.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;