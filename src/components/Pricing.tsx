import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star, Zap, Crown } from 'lucide-react';

const plans = [
  {
    icon: Zap,
    name: 'Starter',
    desc: 'Perfect for small businesses and startups looking to establish their online presence.',
    badge: null,
    features: [
      '5-page website design',
      'Basic SEO setup',
      'Social media management (2 platforms)',
      'Monthly performance report',
      '5 graphic designs per month',
      'Email support',
      'Google Analytics setup',
      '1 revision round',
    ],
    notIncluded: ['Paid advertising', 'Video production', 'AI automation'],
    cta: 'Get Started',
    popular: false,
  },
  {
    icon: Star,
    name: 'Professional',
    desc: 'For growing businesses ready to scale with comprehensive digital marketing.',
    badge: 'Most Popular',
    features: [
      '10-page custom website',
      'Advanced SEO & content marketing',
      'Social media management (4 platforms)',
      'Facebook & Google Ads (up to $5K budget)',
      '15 graphic designs per month',
      'Email marketing automation',
      'Weekly performance reports',
      'Priority support (24/7)',
      'Brand identity package',
      '3 revision rounds',
    ],
    notIncluded: ['Full AI automation suite'],
    cta: 'Get Started',
    popular: true,
  },
  {
    icon: Crown,
    name: 'Enterprise',
    desc: 'Full-scale digital transformation for established businesses with aggressive growth goals.',
    badge: 'Best Value',
    features: [
      'Unlimited page website development',
      'Full SEO & content strategy',
      'Social media management (all platforms)',
      'Unlimited ad budget management',
      'Unlimited graphic designs & videos',
      'Full email marketing automation',
      'AI chatbots & automation',
      'Dedicated account manager',
      'Daily reporting & analytics',
      'Business consulting sessions',
      'Custom integrations & APIs',
      'Priority 24/7 support',
    ],
    notIncluded: [],
    cta: 'Contact Us',
    popular: false,
  },
];

export default function Pricing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="pricing" className="section-optimised section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #8AA2E0 0%, transparent 70%)' }} />

      <div ref={ref} className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="tag-pill mx-auto mb-4">Pricing Plans</div>
          <h2 className="heading-lg text-white mb-5">
            Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your business goals and scale your growth with our premium solutions.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.15 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-400 cursor-default ${
                  plan.popular
                    ? 'border-2 border-[#8AA2E0]'
                    : 'glass border border-white/10 hover:border-[#8AA2E0]/30'
                }`}
                style={plan.popular ? {
                  background: 'linear-gradient(135deg, rgba(67,89,163,0.08) 0%, rgba(11,16,32,0.95) 100%)',
                } : {}}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold ${
                    plan.popular ? 'gradient-brand text-white' : 'glass border border-[#8AA2E0]/40 text-[#8AA2E0]'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                {/* Glow for popular */}
                {plan.popular && (
                  <div className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{ boxShadow: '0 0 50px rgba(67,89,163,0.1), inset 0 0 50px rgba(67,89,163,0.02)' }} />
                )}

                {/* Header */}
                <div className="mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    plan.popular ? 'gradient-brand' : 'glass border border-white/10'
                  }`}>
                    <Icon size={22} className={plan.popular ? 'text-white' : 'text-[#8AA2E0]'} />
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-2">{plan.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{plan.desc}</p>
                </div>

                {/* Features */}
                <div className="flex-1 space-y-3 mb-8">
                  {plan.features.map(feature => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full gradient-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={11} className="text-white" strokeWidth={3} />
                      </div>
                      <span className="text-white/70 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map(feature => (
                    <div key={feature} className="flex items-start gap-3 opacity-40">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-3 h-px bg-white/40" />
                      </div>
                      <span className="text-white/40 text-sm line-through">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    plan.popular
                      ? 'btn-primary justify-center'
                      : 'btn-outline justify-center'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10 text-white/40 text-sm"
        >
          All plans include a free 30-minute strategy consultation. No long-term contracts required.
        </motion.div>
      </div>
    </section>
  );
}