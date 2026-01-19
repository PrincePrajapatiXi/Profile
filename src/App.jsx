import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ScrollProgress, BackToTop, CursorGlow } from './components/UIEffects';

function App() {
    const { isDark } = useTheme();

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'
            }`}>
            {/* Premium UI Effects */}
            <ScrollProgress />
            <CursorGlow />
            <BackToTop />

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="overflow-hidden">
                <Hero />
                <Projects />
                <Skills />
                <Timeline />
                <Testimonials />
                <About />
                <Certifications />
                <Contact />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default App;
