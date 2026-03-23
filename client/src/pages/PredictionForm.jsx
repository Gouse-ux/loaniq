import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, User, Landmark, ShieldCheck, ChevronRight, AlertCircle, CheckCircle2, Info } from 'lucide-react';

const PredictionForm = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        person_age: '',
        person_income: '',
        person_home_ownership: 'RENT',
        person_emp_length: '',
        loan_intent: 'PERSONAL',
        loan_grade: 'A',
        loan_amnt: '',
        loan_int_rate: '',
        loan_percent_income: '',
        cb_person_default_on_file: 'N',
        cb_person_cred_hist_length: ''
    });

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Strict Dropdown Options as per ML model requirements
    const homeOwnershipOptions = ['RENT', 'OWN', 'MORTGAGE', 'OTHER'];
    const loanIntentOptions = ['PERSONAL', 'EDUCATION', 'MEDICAL', 'VENTURE', 'HOMEIMPROVEMENT', 'DEBTCONSOLIDATION'];
    const loanGradeOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    const mapToStructured = (data) => {
        const homeMap = { 'RENT': 0, 'OWN': 1, 'MORTGAGE': 2, 'OTHER': 3 };
        const intentMap = { 'PERSONAL': 2, 'EDUCATION': 0, 'MEDICAL': 1, 'VENTURE': 3, 'HOMEIMPROVEMENT': 4, 'DEBTCONSOLIDATION': 5 };
        const gradeMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6 };
        const defaultMap = { 'N': 0, 'Y': 1 };

        // Return structured named JSON — prevents feature order mismatch errors
        return {
            person_age: Number(data.person_age),
            person_income: Number(data.person_income),
            person_home_ownership: homeMap[data.person_home_ownership],
            person_emp_length: Number(data.person_emp_length),
            loan_intent: intentMap[data.loan_intent],
            loan_grade: gradeMap[data.loan_grade],
            loan_amnt: Number(data.loan_amnt),
            loan_int_rate: Number(data.loan_int_rate),
            loan_percent_income: Number(data.loan_percent_income),
            cb_person_default_on_file: defaultMap[data.cb_person_default_on_file],
            cb_person_cred_hist_length: Number(data.cb_person_cred_hist_length)
        };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setPrediction(null);
        setLoading(true);

        try {
            const structuredData = mapToStructured(formData);
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post('https://loaniq-api-rbqu.onrender.com/api/predict', structuredData, config);
            setPrediction(data.prediction);
        } catch (err) {
            setError(err.response?.data?.message || 'Prediction failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getRiskInfo = () => {
        if (prediction === null) return null;
        if (prediction === 1) {
            return {
                status: 'REJECTED',
                level: 'High',
                color: 'text-red-500',
                bgColor: 'bg-red-500/10',
                borderColor: 'border-red-500/30',
                progressColor: 'bg-red-500',
                progressWidth: '85%',
                icon: <AlertCircle className="w-12 h-12 text-red-500" />
            };
        }
        return {
            status: 'APPROVED',
            level: 'Low',
            color: 'text-brand-teal',
            bgColor: 'bg-brand-teal/10',
            borderColor: 'border-brand-teal/30',
            progressColor: 'bg-brand-teal',
            progressWidth: '15%',
            icon: <CheckCircle2 className="w-12 h-12 text-brand-teal" />
        };
    };

    const risk = getRiskInfo();

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 bg-brand-dark">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold mb-4">
                        <ShieldCheck size={14} />
                        100% Feature Schema Consistent
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">ML Credit <span className="gradient-text">Assessor</span></h1>
                    <p className="text-brand-gray text-lg max-w-2xl mx-auto">Instant AI-driven loan eligibility analysis based on strictly audited financial variables.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="card-premium space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <User className="text-brand-teal w-6 h-6" /> Profile Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-gray">Age (Years)</label>
                                        <input type="number" min="18" name="person_age" value={formData.person_age} onChange={handleChange} className="input-premium" placeholder="min 18" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-gray">Employment Length (Years)</label>
                                        <input type="number" name="person_emp_length" value={formData.person_emp_length} onChange={handleChange} className="input-premium" placeholder="e.g. 5" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-gray">Annual Income ($)</label>
                                        <input type="number" name="person_income" value={formData.person_income} onChange={handleChange} className="input-premium" placeholder="Total annual" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-gray">Home Ownership</label>
                                        <select name="person_home_ownership" value={formData.person_home_ownership} onChange={handleChange} className="input-premium appearance-none bg-brand-dark">
                                            {homeOwnershipOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-t border-white/5 pt-8">
                                    <Landmark className="text-brand-teal w-6 h-6" /> Financial Commitments
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-gray">Loan Amount ($)</label>
                                        <input type="number" name="loan_amnt" value={formData.loan_amnt} onChange={handleChange} className="input-premium" placeholder="Requested sum" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-gray">Interest Rate (%)</label>
                                        <input type="number" step="0.01" name="loan_int_rate" value={formData.loan_int_rate} onChange={handleChange} className="input-premium" placeholder="e.g. 7.5" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-gray">Loan Purpose</label>
                                        <select name="loan_intent" value={formData.loan_intent} onChange={handleChange} className="input-premium appearance-none bg-brand-dark">
                                            {loanIntentOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-gray">Credit History (Years)</label>
                                        <input type="number" name="cb_person_cred_hist_length" value={formData.cb_person_cred_hist_length} onChange={handleChange} className="input-premium" placeholder="History length" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-gray">Loan Grade</label>
                                        <select name="loan_grade" value={formData.loan_grade} onChange={handleChange} className="input-premium appearance-none bg-brand-dark">
                                            {loanGradeOptions.map(opt => <option key={opt} value={opt}>Category {opt}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-gray">Default History?</label>
                                        <select name="cb_person_default_on_file" value={formData.cb_person_default_on_file} onChange={handleChange} className="input-premium appearance-none bg-brand-dark">
                                            <option value="N">No Previous Default</option>
                                            <option value="Y">Previous Default Logged</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-brand-gray">Loan % of Income (Ratio)</label>
                                        <input type="number" step="0.01" max="1" name="loan_percent_income" value={formData.loan_percent_income} onChange={handleChange} className="input-premium" placeholder="e.g. 0.25 for 25%" required />
                                        <p className="text-[10px] text-brand-gray/50 italic flex items-center gap-1"><Info size={10} /> Calculation: Loan Amount / Annual Income</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary !rounded-2xl !py-4 text-lg flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing Features...
                                    </>
                                ) : (
                                    <>
                                        Generate Predictive Decision <ChevronRight className="w-6 h-6" />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.form>

                    {/* Result Sidebar */}
                    <div className="space-y-8">
                        <AnimatePresence mode="wait">
                            {prediction !== null ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`card-premium relative overflow-hidden h-full flex flex-col items-center justify-center text-center py-12 border-2 ${risk.borderColor} ${risk.bgColor}`}
                                >
                                    <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-8 relative`}>
                                        <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${risk.progressColor}`} />
                                        <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center bg-white/5 border border-white/10`}>
                                            {risk.icon}
                                        </div>
                                    </div>

                                    <div className="space-y-1 mb-8">
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gray font-black">AI Determination</p>
                                        <h2 className={`text-3xl font-black ${risk.color}`}>
                                            Loan decision: {risk.status}
                                        </h2>
                                    </div>

                                    <div className="w-full px-8 space-y-6">
                                        <div className="flex justify-between items-end">
                                            <div className="text-left">
                                                <p className="text-[10px] uppercase tracking-wider text-brand-gray">Risk Profile</p>
                                                <p className={`text-xl font-black ${risk.color}`}>Risk level: {risk.level}</p>
                                            </div>
                                            <ShieldCheck className={`w-8 h-8 opacity-20 ${risk.color}`} />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: risk.progressWidth }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className={`h-full ${risk.progressColor} shadow-[0_0_15px_rgba(20,184,166,0.5)]`}
                                                />
                                            </div>
                                            <div className="flex justify-between text-[10px] text-brand-gray font-bold px-1 uppercase tracking-widest">
                                                <span>Conservative</span>
                                                <span>Aggressive</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 px-8 text-[11px] text-brand-gray/60 leading-relaxed italic">
                                        Analysis generated using the strictly regulated 11-feature core financial model. No user-side status bias detected.
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="card-premium h-full flex flex-col items-center justify-center text-center py-20 border-dashed border-white/10"
                                >
                                    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center mb-8">
                                        <Calculator className="w-10 h-10 text-brand-gray/30" />
                                    </div>
                                    <h4 className="text-white font-black text-xl uppercase tracking-wider">Awaiting Audit</h4>
                                    <p className="text-brand-gray/60 text-sm px-8 mt-4 leading-relaxed">
                                        Complete the multi-factor audit form to the left to execute the predictive risk engine.
                                    </p>

                                    <div className="mt-10 grid grid-cols-2 gap-4 w-full px-8">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-left">
                                            <p className="text-[9px] uppercase tracking-widest text-brand-gray mb-1">Inputs</p>
                                            <p className="text-white font-bold">11 Factors</p>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-left">
                                            <p className="text-[9px] uppercase tracking-widest text-brand-gray mb-1">Engine</p>
                                            <p className="text-white font-bold">AI Neural</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {error && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictionForm;
