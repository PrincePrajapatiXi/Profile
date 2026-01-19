import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiCode, FiCoffee, FiUsers, FiBookOpen, FiAward } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, education } from '../data';

// Animated Counter Component
function CountUp({ value }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    const numericValue = parseInt(value.toString().replace(/\D/g, '')) || 0;
    const suffix = value.toString().replace(/[0-9]/g, '');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const startTime = performance.now();

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(easeOut * numericValue));

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [numericValue]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
    const { isDark } = useTheme();

    const stats = [
        { icon: FiCode, label: 'Projects Completed', value: personalInfo.stats.projects },
        { icon: FiCoffee, label: 'Years Learning', value: personalInfo.stats.experience },
        { icon: FiUsers, label: 'Technologies', value: '15+' },
    ];

    return (
        <section id="about" className="section relative">
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
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Get to know the person behind the code
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Profile Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className={`aspect-square max-w-md mx-auto rounded-3xl overflow-hidden ${isDark ? 'bg-dark-card' : 'bg-light-card'}`}>
                            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                                <div className="text-center">
                                    <span className={`text-8xl font-bold ${isDark ? 'text-white/20' : 'text-gray-900/10'}`}>
                                        {personalInfo.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                    <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Add your photo here
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl opacity-20 blur-xl" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-2xl opacity-20 blur-xl" />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {/* About Text */}
                        <div className={`mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {personalInfo.about.split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className={`p-4 rounded-xl text-center transition-shadow duration-300 ${isDark
                                        ? 'bg-dark-card hover:shadow-lg hover:shadow-primary/10'
                                        : 'bg-light-card hover:shadow-lg hover:shadow-primary/5'
                                        }`}
                                >
                                    <stat.icon className={`mx-auto mb-2 ${isDark ? 'text-primary' : 'text-primary-light'}`} size={24} />
                                    <motion.div
                                        className={`text-xl sm:text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
                                    >
                                        <CountUp value={stat.value} />
                                    </motion.div>
                                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Download Resume Button */}
                        <motion.a
                            href={personalInfo.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-shadow"
                        >
                            <FiDownload size={18} />
                            Download Resume
                        </motion.a>
                    </motion.div>
                </div>

                {/* Education Section */}
                {education && education.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-20"
                    >
                        <h3 className={`text-2xl sm:text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <FiBookOpen className="inline-block mr-2 mb-1" />
                            Education
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={edu.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className={`p-6 rounded-2xl ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-light-card border border-light-border'
                                        } transition-all duration-300 hover:shadow-lg hover:shadow-primary/10`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${isDark ? 'bg-primary/20' : 'bg-primary-light/20'}`}>
                                            <FiAward className={`${isDark ? 'text-primary' : 'text-primary-light'}`} size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {edu.degree}
                                            </h4>
                                            <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {edu.school}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                                    {edu.duration}
                                                </span>
                                                {edu.grade && (
                                                    <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-primary/20 text-primary' : 'bg-primary-light/20 text-primary-light'
                                                        }`}>
                                                        {edu.grade}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
