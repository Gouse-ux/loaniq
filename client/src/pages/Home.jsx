import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, Zap, BarChart3 } from 'lucide-react';

const Home = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-brand-dark">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                        <span className="text-sm font-medium text-brand-gray tracking-wide uppercase">Next Generation Fintech</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-none"
                    >
                        Loan<span className="gradient-text">IQ</span>
                        <br />
                        <span className="text-4xl md:text-5xl font-bold text-white/90 mt-4 block">
                            AI Loan Approval Prediction
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl text-brand-gray mb-12 max-w-2xl leading-relaxed"
                    >
                        Smarter Decisions. Faster Approvals. Our advanced AI analyzes multiple data points to provide instant, reliable loan approval predictions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 items-center"
                    >
                        <Link to="/predict" className="btn-primary flex items-center gap-2 group">
                            Get Started
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/demo" className="btn-secondary flex items-center gap-2">
                            <Play className="w-5 h-5 fill-current" />
                            Watch Demo
                        </Link>
                    </motion.div>
                </div>

                {/* Feature Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32"
                >
                    <div className="card-premium">
                        <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 border border-teal-500/20">
                            <Zap className="text-brand-teal w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Instant Prediction</h3>
                        <p className="text-brand-gray leading-relaxed text-sm">
                            Get real-time loan approval probabilities powered by our state-of-the-art machine learning models.
                        </p>
                    </div>
                    <div className="card-premium">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
                            <Shield className="text-emerald-400 w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
                        <p className="text-brand-gray leading-relaxed text-sm">
                            Your financial data is encrypted and handled with the highest security standards.
                        </p>
                    </div>
                    <div className="card-premium">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
                            <BarChart3 className="text-blue-400 w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Deep Analytics</h3>
                        <p className="text-brand-gray leading-relaxed text-sm">
                            Explore past records and gain insights into credit factors influencing your approval.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Hero Animation Placeholder/Visual */}
            <div className="absolute right-[-10%] top-1/4 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-[100px] animate-pulse pointer-events-none" />
        </div>
    );
};

export default Home;
