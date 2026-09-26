import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Process', href: '#process' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const services = [
  'Website Development', 'UI/UX Design', 'SEO Optimization',
  'Social Media Marketing', 'Facebook Ads', 'Google Ads',
  'Content Marketing', 'Graphic Design', 'Brand Identity',
  'Email Marketing', 'AI Automation', 'Business Consulting',
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'rgba(5,8,16,0.98)' }}>
      {/* Top green line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#8AA2E0]/50 to-transparent" />

      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo-light.png" alt="Upnex Agency" width={40} height={40} loading="lazy" decoding="async" className="h-10 w-auto object-contain" />
              <div>
                <div className="text-white font-bold text-lg leading-none">Upnex</div>
                <div className="text-[#8AA2E0] font-bold text-lg mt-1 leading-none">Agency</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              We Grow Brands Digitally. A premium digital marketing agency delivering world-class results for ambitious businesses worldwide.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a href="https://www.instagram.com/upnexagency?igsh=MWRuN2IzaDY4d2N6NA==" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 hover:text-[#8AA2E0] border border-transparent hover:border-[#8AA2E0]/30 transition-all duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.tiktok.com/@upnexagency?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 hover:text-[#8AA2E0] border border-transparent hover:border-[#8AA2E0]/30 transition-all duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.14a8.16 8.16 0 004.77 1.52V7.21a4.85 4.85 0 01-1-.52z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/upnexagency" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 hover:text-[#8AA2E0] border border-transparent hover:border-[#8AA2E0]/30 transition-all duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-white/50 hover:text-[#8AA2E0] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#8AA2E0]/40 group-hover:bg-[#8AA2E0] transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">Services</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <a
                    href="#services"
                    onClick={e => { e.preventDefault(); handleNavClick('#services'); }}
                    className="text-white/50 hover:text-[#8AA2E0] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#8AA2E0]/40 group-hover:bg-[#8AA2E0] transition-colors" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">Get In Touch</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Mail size={14} className="text-[#8AA2E0] mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@upnexagency.com" className="text-white/50 hover:text-[#8AA2E0] text-sm transition-colors">
                  hello@upnexagency.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-[#8AA2E0] mt-0.5 flex-shrink-0" />
                <a href="tel:+923313050461" className="text-white/50 hover:text-[#8AA2E0] text-sm transition-colors">
                  +92 331 3050461
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#8AA2E0] mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm">Office 4083 4th floor Giga Mall Islamabad</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={14} className="text-[#8AA2E0] mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm">Mon - Fri: 10:00 AM - 5:00 PM PKT</span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-white/50 text-xs mb-3">Subscribe to our newsletter for marketing tips:</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#8AA2E0]/40 transition-colors min-w-0"
                />
                <button className="gradient-brand text-white font-bold text-xs px-3 py-2 rounded-xl flex-shrink-0 hover:opacity-90 transition-opacity">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-white/5 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>© {new Date().getFullYear()} Upnex Agency. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#8AA2E0] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#8AA2E0] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#8AA2E0] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>


    </footer>
  );
}