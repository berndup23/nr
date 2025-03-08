import React, { useEffect, useState } from 'react';
import { Server, Database, Globe, Clock, AlertTriangle, Key, MessageSquare, Plus } from 'lucide-react';
import { getMyCode, createTicket, getUserTickets } from '../services/api';
import TicketDetailPage from './TicketDetailPage';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
}

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [ticketLoading, setTicketLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchCode = async () => {
      const code = await getMyCode();
      setAccessCode(code);
      setLoading(false);
    };

    fetchCode();
  }, []);

  useEffect(() => {
    if (activeTab === 'tickets') {
      fetchTickets();
    }
  }, [activeTab]);

  const fetchTickets = async () => {
    setTicketLoading(true);
    const userTickets = await getUserTickets();
    setTickets(userTickets);
    setTicketLoading(false);
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketLoading(true);
    
    const result = await createTicket(newTicket.title, newTicket.description);
    if (result) {
      setNewTicket({ title: '', description: '' });
      setIsCreatingTicket(false);
      await fetchTickets();
    }
    
    setTicketLoading(false);
  };

  // mock stupide en front
  const mockData = {
    domains: [
      { id: 1, name: 'example.com', status: 'active', expiresAt: '2025-12-31' },
      { id: 2, name: 'mysite.net', status: 'active', expiresAt: '2025-11-15' },
    ],
    databases: [
      { id: 1, name: 'db_main', size: '256 MB', status: 'active' },
      { id: 2, name: 'db_users', size: '128 MB', status: 'active' },
    ],
    plan: {
      name: 'Nothing',
      domainsUsed: 0,
      domainsTotal: 0,
      databasesUsed: 0,
      databasesTotal: 0,
      nodeJsEnabled: true,
      expiresAt: '2025-06-15',
    },
  };

  return (
    <div className="max-w-6xl w-full relative z-10 py-8">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden">
        <div className="border-b border-gray-800">
          <div className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'overview'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('domains')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'domains'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              Domains
            </button>
            <button
              onClick={() => setActiveTab('databases')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'databases'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              Databases
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'tickets'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              Tickets
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

              {/* Access Code Section */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Your Access Code</h3>
                
                <div className="flex items-center gap-2">
                  <p className="text-lg font-mono bg-gray-800 px-3 py-1 rounded">
                    {loading ? 'Loading...' : accessCode || 'No code available'}
                  </p>
                  <button 
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={() => navigator.clipboard.writeText(accessCode || '')}
                    disabled={!accessCode}
                  >
                    <Key size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  This is your unique access code. Keep it secure.
                </p>
              </div>

              {/* Plan Info */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="text-white" size={24} />
                  <h3 className="text-xl font-semibold">Your Hosting Plan</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-1">Current Plan</p>
                    <p className="text-xl font-semibold">{mockData.plan.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-1">Expires On</p>
                    <p className="text-xl font-semibold flex items-center gap-2">
                      <Clock size={18} />
                      {mockData.plan.expiresAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'domains' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Domains</h2>
              {mockData.domains.length > 0 ? (
                <ul className="space-y-2">
                  {mockData.domains.map((domain) => (
                    <li key={domain.id} className="bg-gray-800/50 p-4 rounded-md">
                      <p className="text-lg font-semibold">{domain.name}</p>
                      <p className="text-gray-400 text-sm">Status: {domain.status} | Expires: {domain.expiresAt}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No domains found.</p>
              )}
            </div>
          )}

          {activeTab === 'databases' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Databases</h2>
              {mockData.databases.length > 0 ? (
                <ul className="space-y-2">
                  {mockData.databases.map((db) => (
                    <li key={db.id} className="bg-gray-800/50 p-4 rounded-md">
                      <p className="text-lg font-semibold">{db.name}</p>
                      <p className="text-gray-400 text-sm">Size: {db.size} | Status: {db.status}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No databases found.</p>
              )}
            </div>
          )}

          {activeTab === 'tickets' && !selectedTicket && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Support Tickets</h2>
                <button
                  onClick={() => setIsCreatingTicket(true)}
                  className="px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  <span>New Ticket</span>
                </button>
              </div>

              {isCreatingTicket ? (
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Create New Ticket</h3>
                  <form onSubmit={handleCreateTicket} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={newTicket.title}
                        onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={newTicket.description}
                        onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20 h-32"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsCreatingTicket(false)}
                        className="px-4 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={ticketLoading}
                        className="px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        {ticketLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating...</span>
                          </>
                        ) : (
                          <span>Create Ticket</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}

              {ticketLoading && !isCreatingTicket ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : tickets.length > 0 ? (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className="w-full text-left bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{ticket.title}</h3>
                          <p className="text-sm text-gray-400">Created on {new Date(ticket.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'open' ? 'bg-green-900/50 text-green-300 border border-green-800/50' :
                          ticket.status === 'in_progress' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800/50' :
                          'bg-gray-900/50 text-gray-300 border border-gray-800/50'
                        }`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-300">{ticket.description}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-400">No tickets found. Create one to get support.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tickets' && selectedTicket && (
            <TicketDetailPage
              ticket={selectedTicket}
              onBack={() => setSelectedTicket(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;