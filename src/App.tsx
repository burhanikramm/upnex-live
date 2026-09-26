import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';

/* --- Above the fold: loaded in the main bundle --- */
import LoadingScreen from './components/LoadingScreen';
import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';

/* --- Below the fold: split into separate chunks and fetched on demand.
       Keeps the initial JS payload small so the hero paints fast. --- */
const About        = lazy(() => import('./components/About'));
const Services     = lazy(() => import('./components/Services'));
const Portfolio    = lazy(() => import('./components/Portfolio'));
const Process      = lazy(() => import('./components/Process'));
const VideoSection = lazy(() => import('./components/VideoSection'));
const Pricing      = lazy(() => import('./components/Pricing'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const CTABanner    = lazy(() => import('./components/CTABanner'));
const FAQ          = lazy(() => import('./components/FAQ'));
const Blog         = lazy(() => import('./components/Blog'));
const Contact      = lazy(() => import('./components/Contact'));
const Footer       = lazy(() => import('./components/Footer'));
const AIChatWidget = lazy(() => import('./components/AIChatWidget'));

const WHATSAPP_URL = 'https://wa.me/923313050461';

/** Reserved-space placeholder while a chunk streams in. */
function SectionFallback({ height = 420 }: { height?: number }) {
  return <div aria-hidden="true" style={{ minHeight: height }} />;
}

function Divider() {
  return (
    <div
      aria-hidden="true"
      className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mx-auto max-w-6xl"
    />
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* Loading screen ---------------------------------------------------- */
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, reduceMotion ? 300 : 2200);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  /* Back-to-top visibility - rAF throttled so scrolling stays smooth ---- */
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setShowScrollTop(window.scrollY > 500);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--surface-0)' }}>
      <LoadingScreen isLoading={isLoading} />

      <div className="noise-overlay" aria-hidden="true" />
      <CursorGlow />
      <ScrollProgress />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Navbar />

        <main>
          <Hero />
          <TrustedBy />
          <Divider />

          <Suspense fallback={<SectionFallback height={900} />}>
            <About />
            <Divider />
            <Services />
            <Divider />
            <Portfolio />
            <Divider />
            <Process />
            <Divider />
            <VideoSection />
            <Divider />
            <Pricing />
            <Divider />
            <Testimonials />
            <Divider />
            <CTABanner />
            <Divider />
            <FAQ />
            <Divider />
            <Blog />
            <Divider />
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={<SectionFallback height={520} />}>
          <Footer />
        </Suspense>
      </motion.div>

      {/* Floating action stack */}
      <div className="fixed bottom-6 right-6 z-[9990] flex flex-col gap-4 items-center">
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.35)' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Chat with Upnex on WhatsApp"
        >
          <MessageCircle size={22} className="text-white" />
        </motion.a>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #4359A3 0%, #2B3D70 100%)',
                boxShadow: '0 4px 16px rgba(43,61,112,0.5)',
              }}
              aria-label="Scroll back to top"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <Suspense fallback={null}>
        <AIChatWidget />
      </Suspense>
    </div>
  );
}
