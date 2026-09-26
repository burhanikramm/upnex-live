import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Globe, Palette, Search, Share2, BarChart3, FileText, Pen, Video, Star, Mail, Bot, TrendingUp, X } from 'lucide-react';

const services = [
  { icon: Globe, title: 'Website Development', desc: 'Premium, high-performance websites that convert visitors into customers with stunning design and flawless functionality.', features: ['Custom Design', 'Mobile Responsive', 'Fast Loading', 'SEO Ready'], color: 'from-blue-500/20 to-blue-600/5' },
  { icon: Palette, title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces that deliver exceptional user experiences and keep your customers engaged.', features: ['User Research', 'Wireframing', 'Prototyping', 'Design System'], color: 'from-purple-500/20 to-purple-600/5' },
  { icon: Search, title: 'SEO Optimization', desc: 'Data-driven SEO strategies that push your business to the top of search results and drive organic traffic.', features: ['Keyword Research', 'On-Page SEO', 'Link Building', 'Analytics'], color: 'from-emerald-500/20 to-emerald-600/5' },
  { icon: Share2, title: 'Social Media Marketing', desc: 'Strategic social media management that builds your brand, grows your audience, and drives real engagement.', features: ['Content Strategy', 'Community Management', 'Growth Hacking', 'Reporting'], color: 'from-pink-500/20 to-pink-600/5' },
  { icon: Share2, title: 'Facebook Ads', desc: 'Highly targeted Facebook and Instagram advertising campaigns that deliver measurable ROI and scale your business.', features: ['Audience Targeting', 'Ad Creatives', 'A/B Testing', 'Optimization'], color: 'from-blue-400/20 to-blue-500/5' },
  { icon: BarChart3, title: 'Google Ads', desc: 'Expert Google Ads management with smart bidding strategies that maximize your ad spend and drive conversions.', features: ['Campaign Setup', 'Keyword Strategy', 'Bid Management', 'Conversion Tracking'], color: 'from-yellow-500/20 to-yellow-600/5' },
  { icon: FileText, title: 'Content Marketing', desc: 'Compelling content that educates, engages, and converts — from blog posts to video scripts and everything in between.', features: ['Blog Writing', 'Copywriting', 'Email Sequences', 'Landing Pages'], color: 'from-orange-500/20 to-orange-600/5' },
  { icon: Pen, title: 'Graphic Design', desc: 'Eye-catching visual designs for every touchpoint — from social media graphics to marketing materials and banners.', features: ['Social Graphics', 'Banners', 'Infographics', 'Print Design'], color: 'from-red-500/20 to-red-600/5' },
  { icon: Video, title: 'Video Editing', desc: 'Professional video production and editing services that tell your brand story and captivate your audience.', features: ['Promotional Videos', 'Reels/TikToks', 'Motion Graphics', 'Testimonial Videos'], color: 'from-cyan-500/20 to-cyan-600/5' },
  { icon: Star, title: 'Brand Identity', desc: 'Complete brand identity systems that make your business memorable, professional, and instantly recognizable.', features: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography'], color: 'from-amber-500/20 to-amber-600/5' },
  { icon: Mail, title: 'Email Marketing', desc: 'Automated email campaigns that nurture leads, retain customers, and generate consistent revenue on autopilot.', features: ['Email Automation', 'Segmentation', 'Templates', 'A/B Testing'], color: 'from-teal-500/20 to-teal-600/5' },
  { icon: Bot, title: 'AI Automation', desc: 'Leverage the power of AI to automate repetitive tasks, streamline operations, and scale your business faster.', features: ['Chatbots', 'Workflow Automation', 'AI Content', 'CRM Integration'], color: 'from-violet-500/20 to-violet-600/5' },
  { icon: TrendingUp, title: 'Business Consulting', desc: 'Strategic business consulting to align your digital presence with your growth objectives and business goals.', features: ['Growth Strategy', 'Market Analysis', 'Competitor Research', 'Roadmap Planning'], color: 'from-indigo-500/20 to-indigo-600/5' },
];

interface ServiceModalProps {
  service: typeof services[0] | null;
  onClose: () => void;
}

function ServiceModal({ service, onClose }: ServiceModalProps) {
  if (!service) return null;
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative glass-dark rounded-3xl p-8 max-w-lg w-full border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} border border-white/10 flex items-center justify-center mb-6`}>
          <Icon size={30} className="text-[#8AA2E0]" />
        </div>
        <h3 className="text-white font-bold text-2xl mb-3">{service.title}</h3>
        <p className="text-white/60 leading-relaxed mb-6">{service.desc}</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {service.features.map(f => (
            <div key={f} className="flex items-center gap-2 text-white/70 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8AA2E0]" />
              {f}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="btn-primary w-full justify-center"
        >
          Get Started <ArrowRight size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section id="services" className="section-optimised section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8AA2E0 0%, transparent 70%)' }} />

      <div ref={ref} className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="tag-pill mx-auto mb-4">Our Services</div>
          <h2 className="heading-lg text-white mb-5">
            Everything You Need To <span className="gradient-text">Dominate</span> Online
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A full suite of premium digital marketing services designed to grow your business
            and maximize your online presence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass rounded-3xl p-6 group border border-transparent hover:border-[#8AA2E0]/20 transition-all duration-400 cursor-default relative overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(67,89,163,0.05) 0%, transparent 70%)' }} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} border border-white/10 flex items-center justify-center mb-5 service-icon-glow transition-all duration-300`}>
                  <Icon size={22} className="text-[#8AA2E0]" />
                </div>

                {/* Content */}
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#8AA2E0] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed mb-5 line-clamp-3">
                  {service.desc}
                </p>

                {/* Learn More */}
                <button
                  onClick={() => setSelectedService(service)}
                  className="flex items-center gap-1 text-[#8AA2E0] text-xs font-semibold opacity-70 group-hover:opacity-100 transition-all duration-300 hover:gap-2"
                >
                  Learn More <ArrowRight size={12} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
