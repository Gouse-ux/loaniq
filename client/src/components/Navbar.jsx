import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard, History, Zap, Play } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: Zap },
        { name: 'Predict', path: '/predict', icon: LayoutDashboard },
        { name: 'Demo', path: '/demo', icon: Play },
        ...(user?.role === 'admin' ? [{ name: 'History', path: '/history', icon: History }] : []),
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-nav px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-teal-500/20">
                        <Zap className="text-white w-6 h-6 fill-current" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tighter">Loan<span className="text-brand-teal">IQ</span></span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-brand-gray hover:text-brand-teal font-medium transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                            <div className="text-right">
                                <p className="text-sm font-bold text-white leading-none">{user.name || 'User'}</p>
                                <span className="text-[10px] uppercase tracking-widest text-brand-teal font-black">{user.role}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-all text-brand-gray"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-brand-gray hover:text-white transition-colors">Login</Link>
                            <Link to="/register" className="btn-primary !px-6 !py-2 text-sm">Get Started</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu className="w-8 h-8" />
                </button>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-brand-dark border-l border-white/10 z-[70] p-8 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-2xl font-black text-white">Loan<span className="text-brand-teal">IQ</span></span>
                                <button onClick={() => setIsOpen(false)} className="text-brand-gray hover:text-white transition-colors">
                                    <X className="w-8 h-8" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 text-xl font-bold text-brand-gray hover:text-white transition-colors group"
                                    >
                                        <link.icon className="w-6 h-6 group-hover:text-brand-teal transition-colors" />
                                        {link.name}
                                    </Link>
                                ))}

                                <div className="h-px bg-white/10 my-4" />

                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-4 text-xl font-bold text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <LogOut className="w-6 h-6" />
                                        Logout
                                    </button>
                                ) : (
                                    <div className="flex flex-col gap-4 mt-4">
                                        <Link
                                            to="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="btn-secondary text-center"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setIsOpen(false)}
                                            className="btn-primary text-center"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;


