import { motion } from 'framer-motion';

const companies = [
  'TechCorp', 'InnovateCo', 'BrandPro', 'DigitalMax', 'GrowthHub',
  'StartupX', 'NexGen', 'MediaFlow', 'BizScale', 'CloudPeak',
  'VentureUp', 'MarketEdge', 'LaunchPad', 'PixelBrand', 'WebForce',
];

export default function TrustedBy() {
  return (
    <section className="py-16 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="container-custom mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-2">Trusted By</p>
          <h3 className="text-white/60 text-xl font-semibold">Trusted by Growing Businesses Worldwide</h3>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #070A14, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #070A14, transparent)' }} />

        <div className="flex gap-8 animate-marquee w-max">
          {[...companies, ...companies].map((company, i) => (
            <div
              key={i}
              className="flex items-center gap-3 glass rounded-2xl px-6 py-3 whitespace-nowrap group"
            >
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white font-bold text-xs">
                {company[0]}
              </div>
              <span className="text-white/50 font-semibold text-sm group-hover:text-white/80 transition-colors duration-300">
                {company}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="container-custom mt-12">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
