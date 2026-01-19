import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

// Scroll Progress Bar - Top pe progress dikhata hai
export function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;
            setProgress(scrolled);
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent">
            <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
            />
        </div>
    );
}

// Back to Top Button - Scroll to top smoothly
export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-110 transition-all duration-300"
                    aria-label="Back to top"
                >
                    <FiArrowUp size={24} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

// Cursor Glow Effect - Modern gradient glow following cursor
export function CursorGlow() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', updatePosition);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Hide on mobile/touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <div
            className={`pointer-events-none fixed z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
                left: position.x - 200,
                top: position.y - 200,
                width: 400,
                height: 400,
                background: 'radial-gradient(circle, rgba(129,140,248,0.15) 0%, rgba(34,211,238,0.08) 40%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
            }}
        />
    );
}

// Animated Counter for Stats
export function AnimatedCounter({ value, suffix = '', duration = 2 }) {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0;

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            setCount(Math.floor(progress * numericValue));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animationFrame = requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        const element = document.getElementById(`counter-${value}`);
        if (element) observer.observe(element);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
            observer.disconnect();
        };
    }, [numericValue, duration]);

    return (
        <span id={`counter-${value}`}>
            {count}{suffix}
        </span>
    );
}

// Section Reveal Animation Wrapper
export function RevealOnScroll({ children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

// Gradient Text Component
export function GradientText({ children, className = '' }) {
    return (
        <span className={`bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] ${className}`}>
            {children}
        </span>
    );
}

// Floating Animation Wrapper
export function FloatingElement({ children, delay = 0 }) {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay,
                ease: "easeInOut"
            }}
        >
            {children}
        </motion.div>
    );
}
