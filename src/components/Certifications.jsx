import { motion } from 'framer-motion';
import { FiAward, FiCode, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { certifications } from '../data';

// Icon mapping
const iconMap = {
    code: FiCode,
    award: FiAward,
    certificate: FiCheckCircle,
};

export default function Certifications() {
    const { isDark } = useTheme();

    // Don't render if no certifications
    if (!certifications || certifications.length === 0) {
        return null;
    }

    return (
        <section id="certifications" className="section relative">
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
                        <span className="gradient-text">Certifications</span> & Achievements
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Credentials that validate my skills and learning journey
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, index) => {
                        const IconComponent = iconMap[cert.icon] || FiAward;

                        return (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className={`group relative p-6 rounded-2xl ${isDark
                                    ? 'bg-dark-card border border-dark-border hover:border-primary/40'
                                    : 'bg-light-card border border-light-border hover:border-primary-light/40'
                                    } transition-all duration-300 hover:shadow-xl hover:shadow-primary/10`}
                            >
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-primary/20' : 'bg-primary-light/20'
                                    }`}>
                                    <IconComponent
                                        size={28}
                                        className={`${isDark ? 'text-primary' : 'text-primary-light'}`}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {cert.title}
                                </h3>

                                {/* Issuer */}
                                <p className={`text-sm mb-1 ${isDark ? 'text-primary' : 'text-primary-light'}`}>
                                    {cert.issuer}
                                </p>

                                {/* Date */}
                                <p className={`text-xs mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {cert.date}
                                </p>

                                {/* Verify Link */}
                                {cert.credentialUrl && (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isDark
                                            ? 'text-gray-400 hover:text-primary'
                                            : 'text-gray-500 hover:text-primary-light'
                                            }`}
                                    >
                                        <FiExternalLink size={14} />
                                        Verify Credential
                                    </a>
                                )}

                                {/* Decorative gradient line at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
