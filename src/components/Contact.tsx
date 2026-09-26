import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const services = [
  'Website Development', 'UI/UX Design', 'SEO Optimization', 'Social Media Marketing',
  'Facebook Ads', 'Google Ads', 'Content Marketing', 'Graphic Design',
  'Video Editing', 'Brand Identity', 'Email Marketing', 'AI Automation', 'Business Consulting',
];

const budgets = [
  'Under $500', '$500 - $1,000', '$1,000 - $2,500', '$2,500 - $5,000',
  'Keep $5,000 - $10,000', '$10,000+', 'Not sure yet',
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@upnexagency.com', link: 'mailto:hello@upnexagency.com' },
  { icon: Phone, label: 'Phone', value: '+92 331 3050461', link: 'tel:+923313050461' },
  { icon: MapPin, label: 'Address', value: 'Office 4083 4th floor Giga Mall Islamabad', link: '#' },
  { icon: Clock, label: 'Office Hours', value: 'Mon-Fri: 10:00 AM - 5:00 PM PKT', link: '#' },
];

interface FormData {
  name: string; email: string; phone: string; company: string;
  service: string; budget: string; message: string;
}

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email address';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-optimised section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(67,89,163,0.04) 0%, transparent 70%)' }} />

      <div ref={ref} className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="tag-pill mx-auto mb-4">Get In Touch</div>
          <h2 className="heading-lg text-white mb-5">
            Let's Grow Your <span className="gradient-text">Business</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Ready to take your digital presence to the next level? Fill out the form below
            and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Logo card */}
            <div className="glass rounded-3xl p-6 border border-white/8">
              <div className="flex items-center gap-4 mb-4">
                <img src="/logo-light.png" alt="Upnex Digital Agency" width={48} height={48} loading="lazy" decoding="async" className="h-12 w-auto object-contain" />
                <div>
                  <div className="text-white font-bold">Upnex Digital</div>
                  <div className="text-[#8AA2E0] text-sm font-medium">Agency</div>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                We Grow Brands Digitally. A premium digital agency delivering world-class marketing solutions.
              </p>
            </div>

            {/* Info items */}
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.link}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="glass rounded-2xl p-5 flex items-center gap-4 group border border-transparent hover:border-[#8AA2E0]/20 transition-all duration-300 block"
              >
                <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0 service-icon-glow">
                  <item.icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-0.5">{item.label}</div>
                  <div className="text-white font-medium text-sm group-hover:text-[#8AA2E0] transition-colors">{item.value}</div>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <div className="glass rounded-2xl p-5">
              <div className="text-white/40 text-xs mb-4">Follow Us</div>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/upnexagency" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-[#8AA2E0] hover:border-[#8AA2E0]/30 border border-transparent transition-all duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/upnexagency" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-[#8AA2E0] hover:border-[#8AA2E0]/30 border border-transparent transition-all duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.tiktok.com/@upnexagency" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-[#8AA2E0] hover:border-[#8AA2E0]/30 border border-transparent transition-all duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.14a8.16 8.16 0 004.77 1.52V7.21a4.85 4.85 0 01-1-.52z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-3xl p-12 text-center border border-[#8AA2E0]/20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full gradient-brand flex items-center justify-center mx-auto mb-6 animate-pulse-glow"
                  >
                    <CheckCircle size={40} className="text-white" />
                  </motion.div>
                  <h3 className="text-white font-bold text-2xl mb-3">Message Sent! 🎉</h3>
                  <p className="text-white/60 leading-relaxed mb-6">
                    Thank you for reaching out! Our team will review your inquiry and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' }); }}
                    className="btn-outline"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass rounded-3xl p-8 border border-white/8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-white/50 text-xs font-medium mb-1.5 block">Full Name *</label>
                      <input
                        type="text" name="name" value={formData.name} onChange={handleChange}
                        placeholder="John Smith"
                        className={`form-input ${errors.name ? 'border-red-500/50' : ''}`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-white/50 text-xs font-medium mb-1.5 block">Email Address *</label>
                      <input
                        type="email" name="email" value={formData.email} onChange={handleChange}
                        placeholder="john@company.com"
                        className={`form-input ${errors.email ? 'border-red-500/50' : ''}`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-white/50 text-xs font-medium mb-1.5 block">Phone Number</label>
                      <input
                        type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        placeholder="+92 331 3050461"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs font-medium mb-1.5 block">Company Name</label>
                      <input
                        type="text" name="company" value={formData.company} onChange={handleChange}
                        placeholder="Your Company"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-white/50 text-xs font-medium mb-1.5 block">Service Needed</label>
                      <select name="service" value={formData.service} onChange={handleChange} className="form-input">
                        <option value="" style={{ background: '#070A14' }}>Select a service</option>
                        {services.map(s => <option key={s} value={s} style={{ background: '#070A14' }}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-white/50 text-xs font-medium mb-1.5 block">Monthly Budget</label>
                      <select name="budget" value={formData.budget} onChange={handleChange} className="form-input">
                        <option value="" style={{ background: '#070A14' }}>Select budget range</option>
                        {budgets.map(b => <option key={b} value={b} style={{ background: '#070A14' }}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="text-white/50 text-xs font-medium mb-1.5 block">Your Message *</label>
                    <textarea
                      name="message" value={formData.message} onChange={handleChange}
                      rows={5} placeholder="Tell us about your project and goals..."
                      className={`form-input resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className="btn-primary w-full justify-center text-base py-4 disabled:opacity-70"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Message...
                      </div>
                    ) : (
                      <>
                        <span className="relative z-10">Send Message</span>
                        <Send size={18} className="relative z-10" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-white/30 text-xs text-center mt-4">
                    🔒 Your information is secure and will never be shared with third parties.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}