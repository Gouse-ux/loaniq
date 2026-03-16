import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const { user, register } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(name, email, password, role);
        if (result.success) {
            navigate('/');
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-brand-dark relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 blur-[130px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-premium p-8 w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-500/30 text-teal-400">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Create Account</h2>
                    <p className="text-brand-gray mt-2">Join LoanIQ to start predicting</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-gray flex items-center gap-2">
                            <User className="w-4 h-4" /> Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-premium"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-gray flex items-center gap-2">
                            <Mail className="w-4 h-4" /> Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-premium"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-gray flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-premium"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-gray flex items-center gap-2">
                            <User className="w-4 h-4" /> Role
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="input-premium appearance-none bg-brand-dark"
                            required
                        >
                            <option value="user">Individual User</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary !rounded-xl !py-4 mt-4 flex items-center justify-center gap-2"
                    >
                        Create Account <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="relative flex items-center gap-4 py-4">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-xs text-brand-gray uppercase tracking-widest">or</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    <a
                        href="http://localhost:5000/api/auth/google"
                        className="w-full btn-secondary !rounded-xl !py-3 flex items-center justify-center gap-3 bg-white/5 border-white/10 hover:bg-white/10"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Sign up with Google
                    </a>
                </form>

                <p className="mt-8 text-center text-sm text-brand-gray">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-brand-teal hover:text-brand-accent font-bold transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;

