import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Demo = () => {
    return (
        <div className="min-h-screen bg-brand-dark pt-32 pb-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link to="/" className="inline-flex items-center gap-2 text-brand-gray hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Watch <span className="gradient-text">LoanIQ</span> in Action</h2>
                        <p className="text-brand-gray text-lg">See how easy it is to get your loan approval prediction.</p>
                    </motion.div>

                    {/* Video Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="aspect-video w-full glass rounded-3xl overflow-hidden shadow-2xl border border-white/5 relative group"
                    >


                        {/* Example iframe if there was a real video URL */}
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/tUsC9A8eUI0?rel=0" // Updated demographic demo video
                            title="LoanIQ Demo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                        <div className="card-premium">
                            <h4 className="text-xl font-bold mb-3 text-white">Full Walkthrough</h4>
                            <p className="text-brand-gray text-sm">Discover how we process your input data and return accurate ML-driven predictions in seconds.</p>
                        </div>
                        <div className="card-premium">
                            <h4 className="text-xl font-bold mb-3 text-white">Developer API</h4>
                            <p className="text-brand-gray text-sm">Integrated with FastAPI backend for low-latency scoring and seamless user experience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Demo;
