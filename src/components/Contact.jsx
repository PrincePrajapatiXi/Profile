import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiGithub, FiLinkedin, FiTwitter, FiMapPin } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data';

// ═══════════════════════════════════════════════════════════════════════════
// 📧 WEB3FORMS SETUP - Free contact form service
// ═══════════════════════════════════════════════════════════════════════════
// 1. Go to https://web3forms.com
// 2. Enter your email and get access key (FREE)
// 3. Replace 'YOUR_ACCESS_KEY' below with your key
// ═══════════════════════════════════════════════════════════════════════════
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY'; // ← APNA ACCESS KEY DAALO

export default function Contact() {
    const { isDark } = useTheme();
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const formData = new FormData(formRef.current);
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                formRef.current.reset();
            } else {
                throw new Error(result.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('Form error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: FiMail,
            label: 'Email',
            value: personalInfo.email,
            href: `mailto:${personalInfo.email}`,
        },
        {
            icon: FiMapPin,
            label: 'Location',
            value: personalInfo.location,
            href: null,
        },
    ];

    const socialLinks = [
        { icon: FiGithub, href: personalInfo.socials.github, label: 'GitHub' },
        { icon: FiLinkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
        { icon: FiTwitter, href: personalInfo.socials.twitter, label: 'Twitter' },
    ];

    return (
        <section id="contact" className="section relative">
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
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Have a project in mind? Let's work together to create something amazing.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Let's Talk
                        </h3>
                        <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-4 mb-8">
                            {contactInfo.map((item) => (
                                <div key={item.label} className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${isDark ? 'bg-dark-card' : 'bg-light-card'
                                        }`}>
                                        <item.icon size={20} className={isDark ? 'text-primary' : 'text-primary-light'} />
                                    </div>
                                    <div>
                                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {item.label}
                                        </p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className={`font-medium hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {item.value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div>
                            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Find me on
                            </p>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 ${isDark
                                            ? 'bg-dark-card hover:bg-dark-border text-gray-400 hover:text-white'
                                            : 'bg-light-card hover:bg-light-border text-gray-600 hover:text-gray-900'
                                            }`}
                                        aria-label={social.label}
                                    >
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="user_name"
                                    required
                                    className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${isDark
                                        ? 'bg-dark-card border-dark-border text-white placeholder-gray-500'
                                        : 'bg-white border-light-border text-gray-900 placeholder-gray-400'
                                        }`}
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="user_email"
                                    required
                                    className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${isDark
                                        ? 'bg-dark-card border-dark-border text-white placeholder-gray-500'
                                        : 'bg-white border-light-border text-gray-900 placeholder-gray-400'
                                        }`}
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-primary resize-none ${isDark
                                        ? 'bg-dark-card border-dark-border text-white placeholder-gray-500'
                                        : 'bg-white border-light-border text-gray-900 placeholder-gray-400'
                                        }`}
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-xl transition-all duration-300 ${isSubmitting
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25'
                                    } text-white`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="animate-spin">⏳</span>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FiSend size={18} />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <p className="text-green-500 text-center">
                                    ✅ Message sent successfully! I'll get back to you soon.
                                </p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-500 text-center">
                                    ❌ Something went wrong. Please try again or email me directly.
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
