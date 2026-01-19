import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { navLinks } from '../data';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" className="text-2xl font-bold gradient-text">
                        PP.
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${isDark ? 'text-gray-300' : 'text-gray-600'
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-colors ${isDark
                                    ? 'bg-dark-surface hover:bg-dark-border text-yellow-400'
                                    : 'bg-light-card hover:bg-light-border text-gray-700'
                                }`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-colors ${isDark
                                    ? 'bg-dark-surface text-yellow-400'
                                    : 'bg-light-card text-gray-700'
                                }`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-lg ${isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`md:hidden ${isDark ? 'bg-dark-surface' : 'bg-light-surface'} mt-2 mx-4 rounded-xl overflow-hidden`}
                    >
                        <div className="py-4 px-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-base font-medium transition-colors hover:text-primary ${isDark ? 'text-gray-300' : 'text-gray-600'
                                        }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
