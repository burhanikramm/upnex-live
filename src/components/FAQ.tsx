import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What makes Upnex Digital Agency different from other agencies?',
    a: 'We combine premium design, data-driven strategies, and cutting-edge AI technology to deliver measurable results. Unlike generic agencies, we provide fully customized solutions tailored to your specific business goals, with transparent reporting and dedicated support.',
  },
  {
    q: 'How long does it take to build a website?',
    a: 'Typical website projects take 2-6 weeks depending on complexity. A 5-page business site takes about 2 weeks, while custom e-commerce platforms can take 4-8 weeks. We always provide a detailed timeline at the start of your project.',
  },
  {
    q: 'Do you offer ongoing support after project completion?',
    a: 'Absolutely! All our plans include ongoing support. We offer 24/7 priority support for Professional and Enterprise clients, and email support for Starter clients. We also provide monthly maintenance, updates, and performance optimization.',
  },
  {
    q: 'How soon can I expect results from SEO and marketing?',
    a: 'SEO typically shows meaningful results within 3-6 months. Paid advertising (Facebook/Google Ads) can deliver results within days. Social media growth usually sees significant traction within 30-60 days of consistent strategy implementation.',
  },
  {
    q: 'Can you work with businesses outside of your country?',
    a: 'Yes! We work with clients across 7+ countries globally. We operate fully remotely and use collaborative tools to ensure seamless communication regardless of time zone. International clients are always welcome.',
  },
  {
    q: 'What is your pricing structure?',
    a: 'We offer transparent monthly plans starting at $999/month for Starter, $2,499/month for Professional, and custom pricing for Enterprise. We also offer project-based pricing for one-time work like website builds or brand identity packages.',
  },
  {
    q: 'Do you require long-term contracts?',
    a: 'No long-term contracts required! We work on a month-to-month basis. We\'re confident in our results, so we don\'t lock you into anything. That said, most clients choose to stay long-term because of the consistent growth they experience.',
  },
  {
    q: 'How do you measure the success of your campaigns?',
    a: 'We use comprehensive analytics tracking including Google Analytics, Meta Pixel, conversion tracking, and custom dashboards. You\'ll receive weekly/monthly reports showing key metrics like traffic, conversions, ROAS, engagement rates, and ROI.',
  },
  {
    q: 'Can you help rebrand an existing business?',
    a: 'Absolutely! Rebranding is one of our specialties. From logo redesigns and brand identity overhauls to complete digital transformation, we help established businesses modernize their image while preserving what makes them unique.',
  },
  {
    q: 'What information do you need to get started?',
    a: 'To get started, we need your business goals, target audience, current marketing challenges, budget, and any existing brand materials. We start with a free 30-minute strategy consultation to understand your needs before proposing solutions.',
  },
];

export default function FAQ() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-optimised section-padding relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div ref={ref} className="container-custom">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28"
          >
            <div className="tag-pill mb-4">FAQ</div>
            <h2 className="heading-lg text-white mb-5">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Have questions? We have answers. If you don't find what you're looking for,
              feel free to reach out directly.
            </p>
            <button
              onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-primary"
            >
              Ask Us Anything
            </button>

            {/* Decorative */}
            <div className="mt-12 glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
                  <span className="text-white font-bold text-sm">💬</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Still have questions?</div>
                  <div className="text-white/40 text-xs">We respond within 2 hours</div>
                </div>
              </div>
              <p className="text-white/50 text-sm">
                Chat with our team on WhatsApp or send us an email. We're always here to help.
              </p>
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.05 }}
                className={`glass rounded-2xl overflow-hidden transition-all duration-300 border ${
                  openIndex === i ? 'border-[#8AA2E0]/30' : 'border-transparent'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className={`font-semibold text-base transition-colors ${
                    openIndex === i ? 'text-[#8AA2E0]' : 'text-white'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === i ? 'gradient-brand' : 'bg-white/5'
                  }`}>
                    {openIndex === i ? (
                      <Minus size={14} className="text-white" />
                    ) : (
                      <Plus size={14} className="text-white/60" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px bg-white/5 mb-4" />
                        <p className="text-white/60 leading-relaxed text-sm">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
