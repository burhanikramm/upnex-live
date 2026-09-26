import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, FileText, LayoutTemplate, Palette, Code, TrendingUp, Rocket, BarChart3 } from 'lucide-react';

const steps = [
  { icon: Search, num: '01', title: 'Discovery', desc: 'We deep-dive into your business, goals, target audience, and competitors to understand exactly what you need.' },
  { icon: FileText, num: '02', title: 'Research', desc: 'Thorough market research and data analysis to identify opportunities and craft the optimal strategy.' },
  { icon: LayoutTemplate, num: '03', title: 'Planning', desc: 'A detailed project roadmap with timelines, deliverables, and clear milestones for transparent execution.' },
  { icon: Palette, num: '04', title: 'Design', desc: 'Premium creative design that captures your brand essence and delivers exceptional user experiences.' },
  { icon: Code, num: '05', title: 'Development', desc: 'Clean, fast, and scalable code built with the latest technologies for optimal performance.' },
  { icon: TrendingUp, num: '06', title: 'Marketing', desc: 'Strategic multi-channel marketing campaigns to drive traffic, leads, and conversions.' },
  { icon: Rocket, num: '07', title: 'Launch', desc: 'Seamless deployment and launch with thorough testing, QA, and performance optimization.' },
  { icon: BarChart3, num: '08', title: 'Growth', desc: 'Ongoing optimization, analytics, and continuous improvement to maximize your ROI.' },
];

export default function Process() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="process" className="section-optimised section-padding relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)' }}>
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="tag-pill mx-auto mb-4">How We Work</div>
          <h2 className="heading-lg text-white mb-5">
            Our Proven <span className="gradient-text">Process</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A systematic, results-driven approach that ensures every project delivers exceptional outcomes.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#8AA2E0]/50 via-[#8AA2E0]/20 to-transparent pointer-events-none" style={{ transform: 'translateX(-50%)' }} />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: 'easeOut' }}
                  className={`flex items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="glass rounded-2xl p-6 inline-block w-full max-w-sm border border-transparent hover:border-[#8AA2E0]/20 transition-all duration-300 cursor-default"
                      style={{ marginLeft: isLeft ? 'auto' : '0', marginRight: isLeft ? '0' : 'auto' }}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'flex-row-reverse justify-end' : 'flex-row'}`}>
                        <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0">
                          <Icon size={18} className="text-white" />
                        </div>
                        <span className="text-[#8AA2E0] font-bold text-3xl opacity-40">{step.num}</span>
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full gradient-brand border-4 border-[#070A14] animate-pulse-glow" />
                  </div>

                  {/* Empty space */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-5 border border-transparent hover:border-[#8AA2E0]/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-[#8AA2E0] font-bold text-2xl opacity-40">{step.num}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-white font-bold text-2xl mb-3">Ready to Start Your Project?</h3>
            <p className="text-white/50 mb-6">Let's take your business to the next level with our proven process.</p>
            <button
              onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-primary mx-auto"
            >
              Start Today <Rocket size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
