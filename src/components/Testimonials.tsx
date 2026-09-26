import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'James Mitchell',
    role: 'CEO',
    company: 'TechNova Inc.',
    avatar: '👨‍💼',
    rating: 5,
    text: 'Upnex Digital Agency completely transformed our online presence. Our website traffic increased by 400% in just 3 months, and our conversion rate doubled. Their team is incredibly professional and results-driven.',
  },
  {
    name: 'Sarah Williams',
    role: 'Marketing Director',
    company: 'LuxeBrand Co.',
    avatar: '👩‍💼',
    rating: 5,
    text: 'Working with Upnex has been the best investment we\'ve made. They delivered a stunning website and our social media following grew from 2K to 150K in 6 months. Absolutely phenomenal team!',
  },
  {
    name: 'David Chen',
    role: 'Founder',
    company: 'ScaleUp Ventures',
    avatar: '👨‍🚀',
    rating: 5,
    text: 'The Facebook and Google ads campaigns Upnex ran for us achieved a 487% ROAS. I\'ve worked with many agencies, but none come close to the level of expertise and dedication Upnex brings.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'E-commerce Manager',
    company: 'ShopElite',
    avatar: '👩‍💻',
    rating: 5,
    text: 'Our e-commerce revenue grew by $2.4M after Upnex redesigned our platform and implemented their SEO strategy. The ROI has been incredible. Best agency decision we ever made.',
  },
  {
    name: 'Michael Thompson',
    role: 'Restaurant Owner',
    company: 'Meridian Bistro',
    avatar: '🧑‍🍳',
    rating: 5,
    text: 'From our logo to our Instagram page, Upnex handled everything with pure excellence. Our restaurant went from empty weeknights to fully booked after their marketing campaign. Outstanding!',
  },
  {
    name: 'Priya Patel',
    role: 'Startup Founder',
    company: 'InnovateTech',
    avatar: '👩‍🔬',
    rating: 5,
    text: 'Upnex helped us secure $500K in funding by creating a stunning brand identity and investor pitch. Their understanding of design and business strategy is unmatched. Highly recommended!',
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const prev = () => { setCurrent(p => (p - 1 + testimonials.length) % testimonials.length); setIsPlaying(false); };
  const next = () => { setCurrent(p => (p + 1) % testimonials.length); setIsPlaying(false); };

  return (
    <section id="testimonials" className="section-optimised section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(67,89,163,0.04) 0%, transparent 70%)',
      }} />

      <div ref={ref} className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="tag-pill mx-auto mb-4">Testimonials</div>
          <h2 className="heading-lg text-white mb-5">
            What Our <span className="gradient-text">Clients</span> Say
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real clients say about working with us.
          </p>
        </motion.div>

        {/* Main testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-4xl mx-auto mb-12"
        >
          <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/8">
            {/* Green glow */}
            <div className="absolute top-0 left-0 w-64 h-64 opacity-5 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #8AA2E0 0%, transparent 70%)' }} />

            <Quote size={48} className="text-[#8AA2E0] opacity-20 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#8AA2E0" className="text-[#8AA2E0]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  "{testimonials[current].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center text-2xl">
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{testimonials[current].name}</div>
                    <div className="text-white/50 text-sm">
                      {testimonials[current].role} · {testimonials[current].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setIsPlaying(false); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-[#8AA2E0]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-[#8AA2E0] hover:border-[#8AA2E0]/30 transition-all border border-transparent"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-[#8AA2E0] hover:border-[#8AA2E0]/30 transition-all border border-transparent"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.06 }}
              onClick={() => { setCurrent(i); setIsPlaying(false); }}
              className={`glass rounded-2xl p-4 text-center transition-all duration-300 border ${
                i === current
                  ? 'border-[#8AA2E0]/40 bg-[#8AA2E0]/5'
                  : 'border-transparent hover:border-white/10'
              }`}
            >
              <div className="text-2xl mb-2">{t.avatar}</div>
              <div className="text-white text-xs font-semibold truncate">{t.name}</div>
              <div className="text-white/40 text-xs truncate">{t.company}</div>
            </motion.button>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: '100+', label: 'Brands Served' },
            { value: '500+', label: 'Projects Done' },
            { value: '10+', label: 'Expert Team' },
            { value: '98%', label: 'Success Rate' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-[#8AA2E0] mb-1">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
