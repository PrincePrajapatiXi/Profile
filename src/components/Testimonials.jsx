import { motion } from 'framer-motion';
import { FiMessageCircle, FiUser } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { testimonials } from '../data';

export default function Testimonials() {
    const { isDark } = useTheme();

    // Don't render if no testimonials
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    return (
        <section id="testimonials" className="section relative">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        What People <span className="gradient-text">Say</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Feedback from clients and collaborators I've worked with
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`relative p-6 rounded-2xl ${isDark
                                ? 'bg-dark-card border border-dark-border'
                                : 'bg-light-card border border-light-border'
                                } transition-all duration-300 hover:shadow-xl hover:shadow-primary/10`}
                        >
                            {/* Quote Icon */}
                            <div className={`absolute -top-3 -left-3 p-2 rounded-full ${isDark ? 'bg-dark-surface' : 'bg-white'
                                }`}>
                                <FiMessageCircle
                                    size={24}
                                    className={isDark ? 'text-primary' : 'text-primary-light'}
                                />
                            </div>

                            {/* Quote Text */}
                            <p className={`mb-6 leading-relaxed italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                "{testimonial.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${isDark ? 'bg-primary/20' : 'bg-primary-light/20'
                                    }`}>
                                    {testimonial.avatar ? (
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FiUser
                                            size={20}
                                            className={isDark ? 'text-primary' : 'text-primary-light'}
                                        />
                                    )}
                                </div>

                                {/* Name & Role */}
                                <div>
                                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {testimonial.name}
                                    </h4>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {testimonial.role}
                                        {testimonial.company && (
                                            <>
                                                {' at '}
                                                {testimonial.projectUrl ? (
                                                    <a
                                                        href={testimonial.projectUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`underline hover:no-underline ${isDark ? 'text-primary hover:text-primary/80' : 'text-primary-light hover:text-primary-light/80'}`}
                                                    >
                                                        {testimonial.company}
                                                    </a>
                                                ) : (
                                                    testimonial.company
                                                )}
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
