import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Clock, Image as ImageIcon, ChevronUp } from 'lucide-react';
import SmartImage from './SmartImage';

const posts = [
  {
    id: 1,
    title: '10 SEO Strategies That Will Dominate Search Rankings in 2025',
    excerpt: 'Discover the most powerful SEO techniques that top-ranking websites are using right now to capture organic traffic and dominate their niches.',
    content: 'To dominate search algorithms going forward, agencies must transition toward programmatic user-intent matching and technical optimization frameworks. This includes structural schematic markups, rendering lightning-fast localized core web vital metrics, prioritizing mobile-first viewport scaling, and shifting heavily toward semantic keyword hubs rather than single keyword string stuffing. Incorporating AI-assisted structural architecture enables real-time search footprint monitoring to capture elite high-intent customer traffic before conversion loops even trigger.',
    category: 'SEO',
    readTime: '8 min read',
    date: 'Dec 15, 2024',
    featured: true,
    image: '/blog-seo.jpg',
  },
  {
    id: 2,
    title: 'How AI Automation is Revolutionizing Digital Marketing',
    excerpt: 'AI is changing the marketing landscape. Learn how to leverage automation tools to save time, reduce costs, and scale your marketing efforts.',
    content: 'Deploying algorithmic automation transforms programmatic client scaling vectors entirely. By combining predictive behavioral datasets with responsive cross-channel retargeting structures, businesses can drastically cut down overhead costs while maintaining 24/7 engagement footprints. This framework covers machine-learning asset generation, multi-variant predictive ad testing metrics, and automated dynamic customer journey maps built to convert cold traffic loops automatically.',
    category: 'AI Marketing',
    readTime: '6 min read',
    date: 'Dec 10, 2024',
    featured: false,
    image: '/blog-ai-marketing.jpg',
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Facebook Ads That Convert in 2025',
    excerpt: 'Master the art of Facebook advertising with proven strategies for targeting, creative testing, and scaling your campaigns profitably.',
    content: 'Profitable scaling within modern privacy ecosystems requires an aggressive focus on macro-funnel creative testing systems rather than granular profile targeting tweaks. Our agency framework utilizes dynamic multi-asset variable matrices alongside target audience conversion landing pages designed to hold high retention scores, maximizing return-on-ad-spend (ROAS) and driving down baseline customer acquisition values effectively.',
    category: 'Paid Ads',
    readTime: '10 min read',
    date: 'Dec 5, 2024',
    featured: false,
    image: '/blog-paid-ads.jpg',
  },
  {
    id: 4,
    title: 'Why Your Website Design is Killing Your Conversions',
    excerpt: 'Poor website design costs businesses millions in lost revenue. Here are the design principles that the highest-converting websites share.',
    content: 'Elite web applications must serve as frictionless, hyper-fast interactive operational tunnels. Missing localized conversion assets, bloated technical scripts, and unstructured layout patterns cost brands massive prospective revenue. Upgrading to immersive dark-mode hierarchies, clean viewport responsive nodes, and rapid intuitive call-to-actions directly fixes user drop-offs and skyrockets baseline storefront engagement indices.',
    category: 'Web Design',
    readTime: '7 min read',
    date: 'Nov 28, 2024',
    featured: false,
    image: '/team-photo.jpg',
  },
];

const categories = ['All', 'SEO', 'Paid Ads', 'Web Design', 'AI Marketing', 'Social Media', 'Branding'];

export default function Blog() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const listPosts = filteredPosts.filter(p => p.id !== (featuredPost?.id || null));

  const toggleExpand = (id: number) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-[#070A14]">
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8AA2E0 0%, transparent 70%)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="bg-white/5 border border-white/10 text-white/60 text-xs px-3 py-1 rounded-full w-max mb-4 font-space">Latest Articles</div>
            <h2 className="text-4xl font-bold text-white font-space">
              Digital Marketing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4359A3] to-[#2B3D70]">Insights</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md leading-relaxed font-inter text-sm">
            Stay ahead with our latest insights on digital marketing, SEO, and growth strategies.
          </p>
        </motion.div>

        {/* Categories Selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2.5 mb-10"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedPostId(null); // Reset layout shifts on category swap
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold font-space transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#4359A3] to-[#2B3D70] text-white border-transparent font-bold'
                  : 'bg-white/5 text-white/60 hover:text-white hover:border-[#8AA2E0]/30 border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Content Layout Area */}
        {filteredPosts.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            
            {/* Left Column: Featured Post Block */}
            <AnimatePresence mode="popLayout">
              {featuredPost && (
                <motion.article
                  layout
                  key={featuredPost.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/[0.02] rounded-3xl overflow-hidden border border-white/5 hover:border-[#8AA2E0]/20 transition-all duration-400"
                >
                  <div className="h-64 sm:h-80 relative overflow-hidden bg-neutral-900 group cursor-pointer" onClick={() => toggleExpand(featuredPost.id)}>
                    <SmartImage
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <span className="bg-[#8AA2E0]/10 border border-[#8AA2E0]/20 text-[#8AA2E0] text-xs font-semibold px-3 py-1 rounded-full font-space">
                        {featuredPost.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-[#8AA2E0] text-white text-xs font-bold px-3 py-1 rounded-full font-space">
                      Featured
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-4 text-white/40 text-xs mb-3 font-inter">
                      <span className="flex items-center gap-1"><Clock size={12} /> {featuredPost.readTime}</span>
                      <span>{featuredPost.date}</span>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3 leading-tight font-space cursor-pointer hover:text-[#8AA2E0] transition-colors" onClick={() => toggleExpand(featuredPost.id)}>
                      {featuredPost.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4 font-inter">{featuredPost.excerpt}</p>
                    
                    {/* Inline Content Drawer Extension */}
                    <AnimatePresence>
                      {expandedPostId === featuredPost.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mb-4 border-t border-white/5 pt-4"
                        >
                          <p className="text-white/80 text-sm font-inter leading-relaxed bg-white/[0.01] p-4 rounded-xl border border-white/5">
                            {featuredPost.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button 
                      onClick={() => toggleExpand(featuredPost.id)}
                      className="flex items-center gap-2 text-[#8AA2E0] text-sm font-bold hover:gap-3 transition-all duration-200 font-space"
                    >
                      {expandedPostId === featuredPost.id ? (
                        <>Collapse Article <ChevronUp size={14} /></>
                      ) : (
                        <>Read Full Article <ArrowRight size={14} /></>
                      )}
                    </button>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>

            {/* Right Column: Mini List Grid */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {listPosts.map((post, i) => (
                  <motion.article
                    layout
                    key={post.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/[0.02] rounded-2xl p-5 flex flex-col group border border-white/5 hover:border-[#8AA2E0]/20 transition-all duration-300"
                  >
                    <div className="flex gap-5 items-center w-full cursor-pointer" onClick={() => toggleExpand(post.id)}>
                      <div className="w-24 h-20 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0 relative border border-white/5">
                        {post.image ? (
                          <SmartImage src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <ImageIcon className="text-white/20 w-6 h-6 absolute inset-0 m-auto" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-[#8AA2E0] text-xs font-bold font-space">{post.category}</span>
                          <span className="text-white/30 text-xs flex items-center gap-1 font-inter">
                            <Clock size={10} /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-[#8AA2E0] transition-colors line-clamp-2 font-space">
                          {post.title}
                        </h3>
                      </div>
                    </div>

                    {/* Inline Content Drawer Extension for List view */}
                    <AnimatePresence>
                      {expandedPostId === post.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4 border-t border-white/5 pt-4 w-full"
                        >
                          <p className="text-white/80 text-xs font-inter leading-relaxed bg-white/[0.01] p-3 rounded-xl border border-white/5 mb-2">
                            {post.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-end pt-2">
                      <button 
                        onClick={() => toggleExpand(post.id)}
                        className="flex items-center gap-1 text-[#8AA2E0] text-xs font-bold opacity-80 hover:opacity-100 transition-opacity font-space"
                      >
                        {expandedPostId === post.id ? (
                          <>Close <ChevronUp size={12} /></>
                        ) : (
                          <>Read More <ArrowRight size={12} /></>
                        )}
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white/[0.01] rounded-2xl border border-dashed border-white/10">
            <p className="text-white/40 font-inter text-sm">No insight articles found under this category.</p>
          </div>
        )}

        {/* Bottom CTA to link back up into core forms */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 border border-white/10 rounded-xl text-white/80 hover:text-white hover:border-[#8AA2E0]/40 transition-colors inline-flex items-center gap-2 text-sm font-space"
          >
            Request Brand Strategy Consultation <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}