import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, Heart, CheckCircle } from 'lucide-react';
import SmartImage from './SmartImage';

const values = [
  { icon: Target, title: 'Mission', desc: 'To empower brands with cutting-edge strategies, hybrid marketing frameworks, and digital execution that drive real-world revenue.' },
  { icon: Eye, title: 'Vision', desc: 'To become the premier engine of digital growth across global markets, redefining what it means to scale a brand with precision.' },
  { icon: Heart, title: 'Core Values', desc: 'Radical transparency, data-backed strategy, aggressive innovation, and an unwavering commitment to our clients’ bottom line.' },
];

const whyUs = [
  { icon: '⚡', title: 'Agile Delivery', desc: 'Flawless execution deployed at hyper-speed.' },
  { icon: '🎯', title: 'ROI Obsessed', desc: 'Every campaign built explicitly to maximize scale and margin.' },
  { icon: '💡', title: 'AI-Enhanced Systems', desc: 'Leveraging next-gen intelligence and premium technical automation.' },
  { icon: '🎨', title: 'Elite Creative', desc: 'Bespoke designs and positioning that dominate consumer attention.' },
  { icon: '💰', title: 'Value Engineered', desc: 'Premium-tier execution optimized for highly competitive markets.' },
  { icon: '🕐', title: 'Constant Synced Support', desc: 'Reliable, seamless communication at every step.' },
  { icon: '📊', title: 'Custom Architecture', desc: 'Tailored marketing pipelines native to your specific revenue goals.' },
  { icon: '👥', title: 'Expert Team', desc: 'Built by experienced digital architects and strategic problem-solvers.' },
];

const timeline = [
  { year: '2022', title: 'The Framework', desc: 'Upnex began as an elite performance initiative focusing on hyper-growth direct-to-consumer pipelines.' },
  { year: '2023', title: 'Strategic Scale', desc: 'Expanded into performance advertising and deep technical optimizations across multiple global markets.' },
  { year: '2024', title: 'AI Infrastructure', desc: 'Integrated custom workflows and intelligent automation systems directly into our deployment stack.' },
  { year: '2025', title: 'Enterprise Expansion', desc: 'Grew our client base internationally, managing multi-channel acquisition funnels for high-growth brands.' },
  { year: '2026', title: 'The Upnex Headquarters', desc: 'Established our primary agency hub to provide unified full-service strategy, web engineering, and performance marketing.' },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-optimised section-padding relative overflow-hidden bg-[#070A14]">
      {/* Background decoration */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8AA2E0 0%, transparent 70%)' }} 
      />

      <div ref={ref} className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="tag-pill mx-auto mb-4">About Us</div>
          <h2 className="heading-lg text-white mb-5">
            Who We <span className="gradient-text">Are</span>
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed font-inter">
            Upnex Digital Agency is an elite, modern creative partner built to aggressively scale brands. 
            We turn traffic into profit through high-impact advertising, hybrid marketing systems, premium web 
            infrastructure, and high-performance branding solutions.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Image Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-white/5">
              <SmartImage
                src="/about-image.jpg"
                alt="The Upnex team at work"
                width={1280}
                height={853}
                className="w-full h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#070A14]/80 via-[#070A14]/20 to-transparent" />

              {/* Floating badge */}
              <motion.div
                className="absolute bottom-6 left-6 glass-dark rounded-2xl p-4 border border-[#8AA2E0]/20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-space font-bold text-sm">Enterprise Scale</div>
                    <div className="text-white/50 text-xs">Proven Growth Pipelines</div>
                  </div>
                </div>
              </motion.div>

              {/* Top border accent line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#4359A3] to-[#2B3D70]" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#8AA2E0]/10 rounded-2xl animate-spin-slow pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#8AA2E0]/5 rounded-xl animate-float pointer-events-none" />
          </motion.div>

          {/* Mission, Vision, Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="glass rounded-2xl p-6 card-hover group border border-transparent hover:border-[#8AA2E0]/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0 shadow-md">
                    <item.icon size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-space font-bold text-lg mb-2 group-hover:text-[#8AA2E0] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm font-inter leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Company Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-24"
        >
          <h3 className="heading-md text-white text-center mb-12">
            Our <span className="gradient-text">Growth</span> Journey
          </h3>
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#8AA2E0]/30 via-[#2B3D70]/10 to-transparent hidden md:block" style={{ transform: 'translateX(-50%)' }} />
            
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className={`flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="glass rounded-2xl p-6 card-hover group inline-block w-full md:w-auto max-w-md border border-transparent hover:border-[#8AA2E0]/10">
                      <span className="text-[#8AA2E0] font-space font-bold text-2xl glow-brand-text">{item.year}</span>
                      <h4 className="text-white font-space font-bold text-lg mt-1 group-hover:text-[#8AA2E0] transition-colors">{item.title}</h4>
                      <p className="text-white/50 text-sm font-inter mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-4 h-4 rounded-full gradient-brand border-4 border-[#070A14] flex-shrink-0 relative z-10 animate-pulse-glow" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="heading-md text-white text-center mb-12">
            Why Capital Brands <span className="gradient-text">Choose Us</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="glass rounded-2xl p-5 text-center group cursor-default border border-transparent hover:border-[#8AA2E0]/20 transition-all duration-300"
              >
                <div className="text-3xl mb-3 filter drop-shadow-[0_0_10px_rgba(67,89,163,0.2)]">{item.icon}</div>
                <h4 className="text-white font-space font-bold text-sm mb-2 group-hover:text-[#8AA2E0] transition-colors">{item.title}</h4>
                <p className="text-white/40 text-xs font-inter leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}