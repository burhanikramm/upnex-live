import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, X } from 'lucide-react';
import CountUp from 'react-countup';
import SmartImage from './SmartImage';

const stats = [
  { value: 100, suffix: '+', label: 'Brands Served', icon: '🏆' },
  { value: 500, suffix: '+', label: 'Projects Completed', icon: '🚀' },
  { value: 10, suffix: '+', label: 'Expert Team Members', icon: '👥' },
  { value: 98, suffix: '%', label: 'Client Success Rate', icon: '⭐' },
];

export default function VideoSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'rgba(67,89,163,0.02)' }}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden mb-16 group"
        >
          <div className="relative h-72 md:h-96 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(67,89,163,0.08) 0%, rgba(11,16,32,0.9) 50%, rgba(43,61,112,0.08) 100%)' }}>

            {/* Background image */}
            <SmartImage src="/about-image.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/80 to-transparent" />

            {/* Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/10" />

            {/* Green top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8AA2E0] to-transparent" />

            {/* Content overlay */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="mb-6"
              >
                <p className="text-white/50 text-sm tracking-widest uppercase mb-2">Watch Our Story</p>
                <h3 className="text-white font-bold text-3xl md:text-4xl">
                  See How We <span className="gradient-text">Transform</span> Businesses
                </h3>
              </motion.div>

              {/* Play button */}
              <motion.button
                onClick={() => setVideoOpen(true)}
                className="relative group/btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 rounded-full animate-ping gradient-brand opacity-20" />
                <div className="w-20 h-20 rounded-full gradient-brand flex items-center justify-center shadow-2xl relative z-10"
                  style={{ boxShadow: '0 0 40px rgba(67,89,163,0.4)' }}>
                  <Play size={28} fill="currentColor" className="text-white ml-1" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-3xl p-6 text-center border border-transparent hover:border-[#8AA2E0]/20 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-4xl font-bold text-white mb-1">
                {inView ? (
                  <>
                    <CountUp end={stat.value} duration={2.5} delay={0.4 + i * 0.1} />
                    <span className="text-[#8AA2E0]">{stat.suffix}</span>
                  </>
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-4xl glass rounded-3xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setVideoOpen(false)} className="absolute top-4 right-4 z-10 w-10 h-10 glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <X size={18} />
              </button>
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-white/60">Agency Introduction Video</p>
                  <p className="text-white/30 text-sm mt-2">Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
