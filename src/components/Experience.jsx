import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { experiences } from '../data';

export default function Experience() {
    const { isDark } = useTheme();

    return (
        <section id="experience" className="section relative">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        My professional journey in the tech industry
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-1/2 ${isDark ? 'bg-dark-border' : 'bg-light-border'
                        }`} />

                    {/* Experience Items */}
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                } mb-12 last:mb-0`}
                        >
                            {/* Timeline Dot */}
                            <div className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 ${'bg-gradient-to-r from-primary to-accent'
                                }`} style={{ top: '24px' }} />

                            {/* Content */}
                            <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                                }`}>
                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className={`p-6 rounded-2xl transition-all duration-300 ${isDark
                                            ? 'bg-dark-card border border-dark-border hover:border-primary/30'
                                            : 'bg-light-card border border-light-border hover:border-primary-light/30'
                                        }`}
                                >
                                    {/* Duration */}
                                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${isDark
                                            ? 'bg-primary/20 text-primary'
                                            : 'bg-primary-light/20 text-primary-light'
                                        }`}>
                                        {exp.duration}
                                    </span>

                                    {/* Role */}
                                    <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {exp.role}
                                    </h3>

                                    {/* Company */}
                                    <a
                                        href={exp.companyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-1 text-sm font-medium mb-3 hover:underline ${isDark ? 'text-accent' : 'text-accent-light'
                                            }`}
                                    >
                                        {exp.company}
                                        <FiExternalLink size={12} />
                                    </a>

                                    {/* Description */}
                                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {exp.description}
                                    </p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className={`px-2 py-1 text-xs rounded-md ${isDark
                                                        ? 'bg-dark-surface text-gray-300'
                                                        : 'bg-white text-gray-700'
                                                    }`}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
