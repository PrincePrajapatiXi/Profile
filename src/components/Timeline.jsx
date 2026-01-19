import { useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiBook, FiBriefcase, FiCode, FiStar, FiZap } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { timeline } from '../data';

// Icon mapping for different types
const iconMap = {
    education: FiBook,
    work: FiBriefcase,
    project: FiZap,
    milestone: FiStar,
    code: FiCode,
    rocket: FiZap,
};

// Color mapping for different types
const typeColors = {
    education: {
        dark: 'from-purple-500 to-indigo-600',
        light: 'from-purple-400 to-indigo-500',
        bg: 'bg-purple-500/20',
        text: 'text-purple-400',
        glow: 'shadow-purple-500/50',
    },
    work: {
        dark: 'from-cyan-500 to-blue-600',
        light: 'from-cyan-400 to-blue-500',
        bg: 'bg-cyan-500/20',
        text: 'text-cyan-400',
        glow: 'shadow-cyan-500/50',
    },
    project: {
        dark: 'from-emerald-500 to-teal-600',
        light: 'from-emerald-400 to-teal-500',
        bg: 'bg-emerald-500/20',
        text: 'text-emerald-400',
        glow: 'shadow-emerald-500/50',
    },
    milestone: {
        dark: 'from-amber-500 to-orange-600',
        light: 'from-amber-400 to-orange-500',
        bg: 'bg-amber-500/20',
        text: 'text-amber-400',
        glow: 'shadow-amber-500/50',
    },
};

// Timeline Item Component
function TimelineItem({ item, index, isExpanded, onToggle }) {
    const { isDark } = useTheme();
    const IconComponent = iconMap[item.icon] || FiStar;
    const colors = typeColors[item.type] || typeColors.milestone;
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className={`relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-0 mb-12 last:mb-0`}
        >
            {/* Timeline Dot with Glow */}
            <div className="absolute left-1/2 md:left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${isDark ? colors.dark : colors.light} 
                        flex items-center justify-center shadow-lg ${colors.glow} cursor-pointer`}
                    onClick={onToggle}
                >
                    {/* Pulse Animation */}
                    <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${isDark ? colors.dark : colors.light}`}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <IconComponent className="text-white text-lg z-10" />
                </motion.div>
            </div>

            {/* Content Card - Left Side */}
            <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:order-2'}`}>
                <motion.div
                    whileHover={{ y: -4 }}
                    onClick={onToggle}
                    className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 
                        ${isDark
                            ? 'bg-dark-card/80 border border-dark-border hover:border-primary/40 backdrop-blur-sm'
                            : 'bg-white/80 border border-light-border hover:border-primary-light/40 backdrop-blur-sm shadow-lg'
                        }`}
                >
                    {/* Type Badge */}
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full mb-3 
                        ${colors.bg} ${colors.text}`}>
                        <IconComponent size={12} />
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>

                    {/* Date */}
                    <div className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.date}
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                    </h3>

                    {/* Subtitle */}
                    <p className={`text-sm font-medium mb-2 ${isDark ? 'text-primary' : 'text-primary-light'}`}>
                        {item.subtitle}
                    </p>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.description}
                    </p>

                    {/* Expanded Content */}
                    <AnimatePresence>
                        {isExpanded && item.expandedContent && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className={`mt-4 pt-4 border-t ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
                                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {item.expandedContent}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Expand Indicator */}
                    {item.expandedContent && (
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`mt-3 flex ${isLeft ? 'md:justify-end' : ''} justify-center`}
                        >
                            <FiChevronDown className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Empty Space for alternate layout */}
            <div className={`hidden md:block w-1/2 ${isLeft ? 'md:order-2' : ''}`} />
        </motion.div>
    );
}

export default function Timeline() {
    const { isDark } = useTheme();
    const [expandedId, setExpandedId] = useState(null);
    const containerRef = useRef(null);

    // Scroll progress for animated line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const handleToggle = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="timeline" className="section relative overflow-hidden">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        My <span className="gradient-text">Journey</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        A timeline of my education, projects, and milestones
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div ref={containerRef} className="relative">
                    {/* Animated Timeline Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2">
                        {/* Background Line */}
                        <div className={`absolute inset-0 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`} />

                        {/* Animated Progress Line */}
                        <motion.div
                            style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
                            className="absolute inset-0 bg-gradient-to-b from-primary via-accent to-primary"
                        />
                    </div>

                    {/* Timeline Items */}
                    <div className="relative z-10 pt-6">
                        {timeline.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                index={index}
                                isExpanded={expandedId === item.id}
                                onToggle={() => handleToggle(item.id)}
                            />
                        ))}
                    </div>

                    {/* End Cap */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2"
                    >
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent 
                            shadow-lg shadow-primary/50`} />
                    </motion.div>
                </div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-4 mt-16"
                >
                    {Object.entries(typeColors).map(([type, colors]) => {
                        const Icon = iconMap[type] || FiStar;
                        return (
                            <div key={type} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${isDark ? colors.dark : colors.light}`} />
                                <span className={`text-sm capitalize ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {type}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
