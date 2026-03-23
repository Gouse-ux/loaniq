import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, ShieldAlert, Activity, ShieldCheck, Mail, Calendar, ChevronRight } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [logs, setLogs] = useState([]);
    const [activeTab, setActiveTab] = useState('users');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                };
                if (activeTab === 'users') {
                    const { data } = await axios.get('http://localhost:5000/api/admin/users', config);
                    setUsers(data);
                } else {
                    const { data } = await axios.get('http://localhost:5000/api/admin/logs', config);
                    setLogs(data);
                }
            } catch (error) {
                console.error('Error fetching admin data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.role === 'admin') {
            fetchData();
        }
    }, [user, activeTab]);

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card-premium p-12 text-center max-w-md border-red-500/20"
                >
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="text-red-500 w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">Restricted Access</h2>
                    <p className="text-brand-gray">Administrator privileges are required to view the Control Center monitoring tools.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 bg-brand-dark">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12"
                >
                    <div>
                        <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                            <LayoutDashboard className="text-brand-teal w-10 h-10" />
                            Admin <span className="gradient-text">Control Center</span>
                        </h1>
                        <p className="text-brand-gray text-lg">Infrastructure monitoring and user identity management.</p>
                    </div>

                    <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'users' ? 'bg-brand-teal text-white shadow-lg shadow-brand-teal/20' : 'text-brand-gray hover:text-white'}`}
                        >
                            <Users size={18} />
                            User Registry
                        </button>
                        <button
                            onClick={() => setActiveTab('logs')}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'logs' ? 'bg-brand-teal text-white shadow-lg shadow-brand-teal/20' : 'text-brand-gray hover:text-white'}`}
                        >
                            <Activity size={18} />
                            System Health
                        </button>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-40">
                        <div className="w-12 h-12 border-4 border-brand-teal border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card-premium !p-0 overflow-hidden shadow-2xl border-white/5"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'users' ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-white/5 border-b border-white/10 text-brand-gray font-bold text-xs uppercase tracking-widest">
                                                    <th className="px-8 py-6">Member Profile</th>
                                                    <th className="px-8 py-6">Privilege Level</th>
                                                    <th className="px-8 py-6">Registration Data</th>
                                                    <th className="px-8 py-6 text-right">Status Indicator</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {users.map((u) => (
                                                    <tr key={u._id} className="hover:bg-white/[0.02] transition-colors group">
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 bg-gradient-to-br from-brand-teal to-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-brand-teal/10">
                                                                    {u.name.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold text-white text-base">{u.name}</div>
                                                                    <div className="flex items-center gap-2 text-xs text-brand-gray mt-1">
                                                                        <Mail size={12} className="text-brand-teal" />
                                                                        {u.email}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${u.role === 'admin'
                                                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                                : 'bg-brand-teal/10 text-brand-teal border-brand-teal/20'
                                                                }`}>
                                                                <ShieldCheck size={12} />
                                                                {u.role}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-2 text-brand-gray text-sm font-medium">
                                                                <Calendar size={14} className="opacity-50" />
                                                                {new Date(u.createdAt || Date.now()).toLocaleDateString()}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <div className="inline-flex items-center gap-2.5 bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20">
                                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                                                <span className="text-[10px] text-green-400 font-black uppercase tracking-wider">Operational</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-white/5 border-b border-white/10 text-brand-gray font-bold text-xs uppercase tracking-widest">
                                                    <th className="px-8 py-6">Actor ID</th>
                                                    <th className="px-8 py-6">Event Timestamp</th>
                                                    <th className="px-8 py-6 text-right">Outcome Metric</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {logs.map((log) => (
                                                    <tr key={log._id} className="hover:bg-white/[0.02] transition-colors group">
                                                        <td className="px-8 py-6">
                                                            <div className="flex flex-col">
                                                                <span className="text-white font-bold">{log.userId?.name || 'Unknown Subject'}</span>
                                                                <span className="text-xs text-brand-gray mt-0.5">{log.userId?.email || 'unresolved-identity'}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                                                    <Calendar size={14} className="text-brand-teal" />
                                                                </div>
                                                                <div>
                                                                    <div className="text-sm text-white font-bold">{new Date(log.createdAt).toLocaleDateString()}</div>
                                                                    <div className="text-[10px] text-brand-gray uppercase tracking-widest">{new Date(log.createdAt).toLocaleTimeString()}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${log.prediction === 0
                                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                                                                }`}>
                                                                {log.prediction === 0 ? 'Verified / Approved' : 'Risk / Rejected'}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;

