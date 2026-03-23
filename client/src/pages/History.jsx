import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { History as HistoryIcon, User, Calendar, Shield, ExternalLink, Search } from 'lucide-react';

const History = () => {
    const { user } = useContext(AuthContext);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/predict/history', config);
                setLogs(data);
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchHistory();
        }
    }, [user]);

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 bg-brand-dark">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
                >
                    <div>
                        <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                            <HistoryIcon className="text-brand-teal w-10 h-10" />
                            Prediction <span className="gradient-text">History</span>
                        </h1>
                        <p className="text-brand-gray text-lg">Detailed audit logs of all AI-driven credit assessments.</p>
                    </div>
                    <div className="card-premium !py-3 !px-6 border-brand-teal/20">
                        <span className="text-3xl font-black text-white mr-2">{logs.length}</span>
                        <span className="text-xs uppercase tracking-widest text-brand-gray font-bold">Total Logs</span>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-brand-teal border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : logs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="card-premium p-20 text-center border-dashed border-2 border-white/5"
                    >
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <HistoryIcon className="text-brand-gray/30 w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">No history found</h3>
                        <p className="text-brand-gray mt-2 max-w-sm mx-auto">When users start submitting loan applications, the results will appear here for your review.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card-premium !p-0 overflow-hidden shadow-2xl border-white/5"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10 text-brand-gray font-bold text-xs uppercase tracking-widest">
                                        <th className="px-8 py-6">Timestamp / ID</th>
                                        <th className="px-8 py-6">Client Identity</th>
                                        <th className="px-8 py-6">Risk Assessment</th>
                                        <th className="px-8 py-6">Core Factors</th>
                                        <th className="px-8 py-6 text-right">Access</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {logs.map((log) => (
                                        <tr key={log._id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="w-4 h-4 text-brand-teal opacity-50" />
                                                    <div>
                                                        <div className="text-white font-bold">{new Date(log.createdAt).toLocaleDateString()}</div>
                                                        <div className="text-xs text-brand-gray">{new Date(log.createdAt).toLocaleTimeString()}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal text-xs font-black uppercase">
                                                        {(log.userId?.name || '?').charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-bold text-sm">{log.userId?.name || 'Anonymous Client'}</div>
                                                        <div className="text-xs text-brand-gray">{log.userId?.email || 'no-email@id'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${log.prediction === 0
                                                    ? 'bg-brand-teal/10 text-brand-teal border-brand-teal/20'
                                                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                                                    }`}>
                                                    <Shield className="w-3 h-3" />
                                                    {log.prediction === 0 ? 'Approved' : 'Rejected'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex gap-2 text-[10px] font-mono text-brand-gray/60">
                                                    {[
                                                        log.person_age,
                                                        log.person_income,
                                                        log.loan_amnt,
                                                        log.loan_int_rate
                                                    ].map((f, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-white/5 rounded border border-white/5">{f}</span>
                                                    ))}
                                                    <span>...</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="inline-flex items-center gap-2 text-brand-gray hover:text-white transition-colors text-sm font-bold group/btn">
                                                    Details
                                                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default History;

