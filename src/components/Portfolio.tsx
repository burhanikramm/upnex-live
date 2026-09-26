import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, X, TrendingUp, Users, Target } from 'lucide-react';
import SmartImage from './SmartImage';

const categories = ['All', 'Website', 'Marketing'];

const projects = [
  {
    id: 1,
    title: 'EsamMart Platform',
    category: 'Website',
    image: '/portfolio-1.jpg',
    client: 'EsamMart Global',
    tags: ['E-commerce', 'UI/UX', 'Next.js'],
    problem: 'The client needed a scalable, high-performance global e-commerce hub capable of handling diverse regional storefront discovery with localized asset presentation.',
    solution: 'Engineered a lightning-fast digital architecture complete with an integrated dynamic product carousel, visual category indices, and high-conversion layout hierarchies.',
    results: ['Optimized Core Web Vitals', 'Seamless localized UI discoverability', 'Accelerated product add-to-cart rates', 'Robust multithreaded storefront stability'],
  },
  {
    id: 2,
    title: 'UplixOrbit Ecosystem',
    category: 'Website',
    image: '/portfolio-2.jpg',
    client: 'UplixOrbit Tech',
    tags: ['Premium Dark UI', 'React', 'B2B Client Portal'],
    problem: 'A next-generation technology provider needed an elite, highly immersive web environment that visually reflected their forward-thinking identity and captured enterprise inquiries.',
    solution: 'Designed and deployed a stunning dark-green themed, premium web interface running smooth node-state interactions, sharp layout transitions, and high-intent structural call-to-actions.',
    results: ['Elevated brand positioning metrics', 'Enhanced interactive session dwell time', 'Streamlined user onboarding flow', 'Flawless global responsive design'],
  },
  {
    id: 3,
    title: 'MS Real Estate Portal',
    category: 'Website',
    image: '/portfolio-3.jpg',
    client: 'MS Real Estate & Property Management',
    tags: ['Property Sourcing', 'Web Development', 'Islamabad'],
    problem: 'A premium real estate firm in Islamabad needed a high-end digital real estate asset engine to showcase commercial and luxury residential properties across competitive local sectors.',
    solution: 'Constructed an immersive, imagery-focused property directory platform optimized for immediate lead qualification, call scheduling, and high-trust localization elements.',
    results: ['Drastic drop in bounce rates', 'Increased digital property viewing inquiries', 'Optimized multi-device real estate discoverability', 'Premium B2C digital asset equity'],
  },
  {
    id: 4,
    title: 'Bilal Smart Properties Campaign',
    category: 'Marketing',
    image: '/portfolio-4.jpg',
    client: 'Bilal Properties',
    tags: ['Lead Generation', 'Performance Ads', 'Real Estate Marketing'],
    problem: 'The client sought to capture aggressive investment capital and qualified buyer leads for prime residential and commercial plots across Islamabad and Rawalpindi.',
    solution: 'Deployed hyper-targeted multi-channel ad matrices combined with programmatic performance funnel landing flows, capturing high-intent overseas and local investors.',
    results: ['Surge in qualified plot booking leads', 'Highly optimized Cost-Per-Acquisition (CPA)', 'Massive target audience reach expansion', 'Substantial pipeline growth equity'],
  },
  {
    id: 5,
    title: 'AppPanda Scalability Matrix',
    category: 'Marketing',
    image: '/portfolio-5.jpg',
    client: 'AppPanda Subscriptions',
    tags: ['Conversion Optimization', 'Paid Ads Strategy', 'User Acquisition'],
    problem: 'A global digital subscriptions application needed to scale its paying user base rapidly while breaking through aggressive keyword competition and lowering customer acquisition costs.',
    solution: 'Formulated a comprehensive conversion rate optimization (CRO) architecture backed by laser-targeted social ad campaigns and trust-driven instant access validation funnels.',
    results: ['Scaled to 8k+ active customers', '4.9/5 average program rating metrics', 'Instant automated subscription access flow', 'Exceptional multi-channel ROAS validation'],
  },
];

interface PortfolioModalProps {
  project: typeof projects[0] | null;
  onClose: () => void;
}

function PortfolioModal({ project, onClose }: PortfolioModalProps) {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative glass-dark rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10 bg-[#070A14]"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-56 overflow-hidden">
          <SmartImage src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors bg-black/40 border border-white/10">
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-6">
            <div className="flex gap-2 flex-wrap">
              {project.tags.map(tag => (
                <span key={tag} className="tag-pill text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/90">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-white font-bold text-2xl mb-1">{project.title}</h3>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Users size={14} />
                <span>Client: {project.client}</span>
              </div>
            </div>
            <span className="tag-pill bg-[#8AA2E0]/10 border border-[#8AA2E0]/20 px-3 py-1 rounded-full text-[#8AA2E0] text-xs font-semibold">{project.category}</span>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="flex items-center gap-2 text-white font-semibold mb-2">
                <Target size={16} className="text-[#8AA2E0]" /> The Problem
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-white font-semibold mb-2">
                <ExternalLink size={16} className="text-[#8AA2E0]" /> Our Solution
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">{project.solution}</p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                <TrendingUp size={16} className="text-[#8AA2E0]" /> Case Metrics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.results.map(result => (
                  <div key={result} className="glass rounded-xl p-3 text-center bg-white/5 border border-white/5">
                    <span className="text-[#8AA2E0] font-bold text-sm">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary w-full justify-center mt-6 flex items-center gap-2 py-3 bg-[#8AA2E0] text-white font-bold rounded-xl hover:bg-[#4359A3] transition-colors"
          >
            Scale Your Brand <ExternalLink size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-optimised section-padding relative overflow-hidden py-24 bg-[#070A14]" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8AA2E0 0%, transparent 70%)' }} />

      <div ref={ref} className="container-custom max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="tag-pill mx-auto mb-4 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/60 text-xs w-max">Case Studies</div>
          <h2 className="heading-lg text-white text-4xl font-bold mb-5 font-space">
            Featured <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-inter">
            Real assets. Proven scalability. Explore high-performance platforms engineered and marketing systems scaled by our agency.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-space transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#4359A3] to-[#2B3D70] text-white border-transparent shadow-lg shadow-[#8AA2E0]/20 font-bold'
                  : 'glass text-white/60 hover:text-white border-white/10 hover:border-white/20 bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="glass rounded-3xl overflow-hidden group cursor-pointer border border-white/5 hover:border-[#8AA2E0]/20 transition-all duration-400 bg-white/[0.02]"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <SmartImage
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={534}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/90 via-[#070A14]/40 to-transparent" />
                  <div className="absolute inset-0 bg-[#8AA2E0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* View button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="glass rounded-full p-3 bg-black/50 border border-white/20">
                      <ExternalLink size={20} className="text-[#8AA2E0]" />
                    </div>
                  </div>

                  <span className="absolute top-4 left-4 tag-pill text-xs bg-black/60 border border-white/10 text-white/80 px-2.5 py-1 rounded-full">{project.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#8AA2E0] transition-colors font-space">{project.title}</h3>
                  <p className="text-white/40 text-xs mb-4 font-inter">Client: {project.client}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 text-white/50 text-xs font-inter border border-white/5">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-outline px-6 py-3 border border-white/10 rounded-xl text-white/80 hover:text-white hover:border-[#8AA2E0]/40 transition-colors inline-flex items-center gap-2 font-space"
          >
            Start Your Project <ExternalLink size={16} />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <PortfolioModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}