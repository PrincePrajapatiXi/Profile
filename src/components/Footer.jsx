import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, navLinks } from '../data';

export default function Footer() {
    const { isDark } = useTheme();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FiGithub, href: personalInfo.socials.github, label: 'GitHub' },
        { icon: FiLinkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
        { icon: FiTwitter, href: personalInfo.socials.twitter, label: 'Twitter' },
    ];

    return (
        <footer className={`py-12 px-4 border-t ${isDark ? 'border-dark-border' : 'border-light-border'
            }`}>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <a href="#home" className="text-2xl font-bold gradient-text">
                            {personalInfo.name.split(' ').map(n => n[0]).join('')}.
                        </a>
                        <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {personalInfo.title} building digital experiences that matter.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {navLinks.slice(0, 4).map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className={`text-sm transition-colors hover:text-primary ${isDark ? 'text-gray-400' : 'text-gray-600'
                                            }`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Connect
                        </h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-lg transition-all duration-300 hover:-translate-y-1 ${isDark
                                            ? 'text-gray-400 hover:text-white hover:bg-dark-card'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-light-card'
                                        }`}
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className={`border-t pt-8 ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            © {currentYear} {personalInfo.name}. All rights reserved.
                        </p>
                        <p className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Made with <FiHeart className="text-red-500" size={14} /> in India
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
