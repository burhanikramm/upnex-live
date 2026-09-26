import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTABanner() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div ref={ref} className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(67,89,163,0.12) 0%, rgba(43,61,112,0.08) 50%, rgba(67,89,163,0.06) 100%)',
            border: '1px solid rgba(67,89,163,0.2)',
          }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8AA2E0] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8AA2E0]/30 to-transparent" />

          {/* Orbs */}
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(67,89,163,0.15) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(67,89,163,0.1) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div className="relative z-10 px-8 py-14 md:py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-5"
            >
              <div className="tag-pill">
                <Sparkles size={12} />
                Limited Spots Available This Month
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="heading-lg text-white mb-4"
            >
              Ready to <span className="gradient-text">Transform</span> Your
              <br className="hidden md:block" /> Digital Presence?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-white/60 text-lg max-w-2xl mx-auto mb-8"
            >
              Join 120+ businesses that have trusted Upnex Digital Agency to grow their
              brand online. Book your free 30-minute strategy call today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={handleContact}
                className="btn-primary text-base px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Book Free Consultation</span>
                <ArrowRight size={18} className="relative z-10" />
              </motion.button>
              <motion.button
                onClick={() => { const el = document.getElementById('portfolio'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-outline text-base px-8 py-4"
                whileHover={{ scale: 1.03 }}
              >
                View Our Work
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-6 mt-8 text-white/40 text-xs"
            >
              <span className="flex items-center gap-1.5">✅ No long-term contracts</span>
              <span className="flex items-center gap-1.5">✅ Free 30-min strategy call</span>
              <span className="flex items-center gap-1.5">✅ Results guaranteed</span>
              <span className="flex items-center gap-1.5">✅ 24/7 support</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
