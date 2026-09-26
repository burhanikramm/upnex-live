import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 120, suffix: '+', label: 'Happy Clients' },
  { value: 7, suffix: '+', label: 'Countries Served' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref: statsRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    // Cap the device pixel ratio: rendering at 3x on a phone triples the
    // fill cost for no visible benefit.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Scale particle count to the viewport instead of a fixed 80 everywhere.
    const area = width * height;
    const PARTICLE_COUNT = reduceMotion
      ? 0
      : Math.max(18, Math.min(coarse ? 26 : 52, Math.round(area / 26000)));
    const SHAPE_COUNT = reduceMotion ? 0 : coarse ? 3 : 6;
    const LINK_DIST = 118;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; life: number; maxLife: number;
    }

    const createParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.45 + 0.1;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.25,
        size: Math.random() * 1.9 + 0.5,
        opacity: Math.random() * 0.55 + 0.12,
        life: Math.random() * 120,
        maxLife: Math.random() * 200 + 120,
      };
    };

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, createParticle);

    const shapes = Array.from({ length: SHAPE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 78 + 30,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.004,
      opacity: Math.random() * 0.055 + 0.02,
      type: ['circle', 'hex', 'triangle'][Math.floor(Math.random() * 3)],
    }));

    let animId = 0;
    let visible = true;
    let onScreen = true;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const shape of shapes) {
        shape.rotation += shape.rotationSpeed;
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.strokeStyle = `rgba(138, 162, 224, ${shape.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (shape.type === 'circle') {
          ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
        } else if (shape.type === 'hex') {
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i;
            const px = shape.size * Math.cos(a);
            const py = shape.size * Math.sin(a);
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
        } else {
          ctx.moveTo(0, -shape.size);
          ctx.lineTo(shape.size * 0.866, shape.size * 0.5);
          ctx.lineTo(-shape.size * 0.866, shape.size * 0.5);
          ctx.closePath();
        }
        ctx.stroke();
        ctx.restore();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const ratio = p.life / p.maxLife;
        const fade = ratio < 0.1 ? ratio * 10 : ratio > 0.9 ? (1 - ratio) * 10 : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 162, 224, ${p.opacity * fade})`;
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -12 || p.x < -12 || p.x > width + 12) {
          particles[i] = createParticle();
        }
      }

      // Link lines. Squared-distance comparison avoids a sqrt per pair,
      // and the particle budget above keeps this loop cheap.
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST_SQ) {
            const alpha = 0.06 * (1 - Math.sqrt(d2) / LINK_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(138, 162, 224, ${alpha})`;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      draw();
      animId = requestAnimationFrame(loop);
    };

    const setRunning = (shouldRun: boolean) => {
      if (shouldRun && !animId) {
        animId = requestAnimationFrame(loop);
      } else if (!shouldRun && animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    };

    // Only animate while the hero is actually on screen and the tab is active.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        setRunning(onScreen && visible);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      setRunning(onScreen && visible);
    };
    document.addEventListener('visibilitychange', onVisibility);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    if (reduceMotion) {
      draw();
    } else {
      setRunning(true);
    }

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-gradient bg-grid">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(67,89,163,0.15) 0%, transparent 70%)' }} />

      {/* Light rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-px opacity-10"
            style={{
              left: `${20 + i * 15}%`,
              height: '60%',
              background: 'linear-gradient(to bottom, rgba(67,89,163,0.6), transparent)',
            }}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(67,89,163,0.06) 0%, transparent 70%)' }}
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(67,89,163,0.04) 0%, transparent 70%)' }}
        animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Content */}
      <div className="container-custom relative z-10 pt-28 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="tag-pill">
              <span className="w-2 h-2 rounded-full bg-[#8AA2E0] animate-pulse" />
              🏆 &nbsp;Premium Digital Agency · Est. 2022
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1 variants={itemVariants} className="heading-xl mb-6 text-white leading-tight">
            We Build{' '}
            <span className="relative inline-block">
              <span className="gradient-text">Digital Experiences</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4359A3] to-[#2B3D70] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span>{' '}
            That{' '}
            <br className="hidden md:block" />
            <span className="text-white">Grow Businesses</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            We help businesses dominate online through powerful websites, SEO, branding,
            social media marketing, paid advertising, and AI automation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => handleNavClick('#services')}
              className="btn-primary text-base px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight size={18} className="relative z-10" />
            </motion.button>
            <motion.button
              onClick={() => handleNavClick('#contact')}
              className="btn-outline text-base px-8 py-4"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Play size={16} fill="currentColor" />
              Book Consultation
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-16"
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>Scroll Down</span>
              <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="container-custom relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass rounded-3xl p-8 md:p-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {inView ? (
                    <>
                      <CountUp end={stat.value} duration={2.5} delay={0.5} />
                      <span className="text-[#8AA2E0]">{stat.suffix}</span>
                    </>
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>
                <div className="text-white/50 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
