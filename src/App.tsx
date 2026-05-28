import { useState, useEffect, useCallback } from 'react';
import {
  ChefHat,
  Menu,
  X,
  MapPin,
  ExternalLink,
  ShoppingBag,
  Users,
  Utensils,
  Sparkles,
  HandPlatter,
} from 'lucide-react';
import { TextEffect } from '@/components/ui/text-effect';

/* ─── Data ─── */

const dishes = [
  {
    name: 'Kozhikode Chicken Dum Biriyani',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Mutton Royal Biriyani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Beef Roast + Kuzhimandi',
    image: 'https://images.unsplash.com/photo-1603360946369-fa99608d8125?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Al Faham Combo Platter',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Special Fried Rice',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Tandoori Platter',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80',
  },
];

const services = [
  { title: 'Order Online', desc: 'Fast doorstep delivery', icon: ShoppingBag },
  { title: 'Corporate Events', desc: 'Custom meal plans', icon: Users },
  { title: 'Book for Catering', desc: 'Wedding & festivals', icon: Utensils },
  { title: 'Buffet Service', desc: 'All-you-can-eat spread', icon: HandPlatter },
  { title: 'Private Party', desc: 'Exclusive platters', icon: Sparkles },
];

const locations = [
  {
    branch: 'South Kalamassery',
    mapUrl: 'https://www.google.com/maps/place/BIRIYANI+SOUQ/@10.0384209,76.2816352,12.36z/data=!4m10!1m2!2m1!1sbiriyani+souq!3m6!1s0x3b080d001afb7605:0x1cfef9c90d870188!8m2!3d10.0451739!4d76.3306186',
  },
  {
    branch: 'Kakkanad',
    mapUrl: 'https://www.google.com/maps/place/BIRIYANI+SOUQ/@10.0384209,76.2816352,12.36z/data=!4m10!1m2!2m1!1sbiriyani+souq!3m6!1s0x3b080d005f847089:0x8e696f220c84ff0f!8m2!3d9.9958086!4d76.3524857',
  },
  {
    branch: 'University Road',
    mapUrl: 'https://www.google.com/maps/place/BIRIYANI+SOUQ/@10.0384209,76.2816352,12.36z/data=!4m10!1m2!2m1!1sbiriyani+souq!3m6!1s0x3b080d001a153333:0xeed6439a6dd7a55c!8m2!3d10.0466493!4d76.3216474',
  },
  {
    branch: 'HMT Junction',
    mapUrl: 'https://www.google.com/maps/place/BIRIYANI+SOUQ/@10.0384209,76.2816352,12.36z/data=!4m10!1m2!2m1!1sbiriyani+souq!3m6!1s0x3b080d001097f2f5:0x5b236180cc6fbc47!8m2!3d10.054218!4d76.325907',
  },
];

/* ─── Component ─── */

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  /* Scroll-driven header bg */
  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll-reveal observer */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      {/* Ambient glows */}
      <div className="glow glow--one" />
      <div className="glow glow--two" />

      {/* ── HEADER ── */}
      <header className={`site-header ${headerScrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="brand" onClick={closeMenu}>
          <ChefHat size={28} className="brand__icon" />
          <span className="brand__text">Biriyani Souq</span>
        </a>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((o) => !o)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`site-nav ${isMenuOpen ? 'is-open' : ''}`}>
          {['Home', 'About Us', 'Our Signature', 'Our Services', 'Contact'].map(
            (label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={closeMenu}
              >
                {label}
              </a>
            )
          )}
        </nav>
      </header>

      <main>
        {/* ═══════════════════════════════════════
            HERO
           ═══════════════════════════════════════ */}
        <section id="home" className="hero">
          <div className="hero__bg">
            <img
              src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1600&q=80"
              alt="Biriyani background"
              loading="eager"
            />
          </div>
          <div className="hero__overlay" />

          <div className="hero__content reveal">
            <p className="hero__eyebrow">Serving Since 2020</p>

            <h1 className="hero__title">
              <TextEffect
                as="span"
                per="char"
                preset="blur"
                delay={0.3}
                loop
                loopDuration={6}
                className="hero__title-line"
              >
                Biriyani Souq
              </TextEffect>
              <TextEffect
                as="span"
                per="char"
                preset="blur"
                delay={0.7}
                loop
                loopDuration={6}
                className="hero__title-line"
              >
                Authentic Taste of Kozhikode
              </TextEffect>
            </h1>

            <p className="hero__description">
              Rich dum aroma, slow-cooked spices, and legendary Malabar flavor.
              Step into the world of Biriyani Souq.
            </p>

            <div className="hero__actions">
              <a href="#our-signature" className="btn btn--gold">
                Explore Menu
              </a>
              <a href="#contact" className="btn btn--ghost">
                Find a Branch
              </a>
            </div>

            <div className="hero__feature-bar reveal">
              <span>Fresh spices</span>
              <span>Quick delivery</span>
              <span>Event catering</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            ABOUT / OUR STORY
           ═══════════════════════════════════════ */}
        <section id="about-us" className="about section">
          <div className="about__bg">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
              alt="Restaurant ambiance"
              loading="lazy"
            />
          </div>
          <div className="about__overlay" />

          <div className="about__content reveal">
            <p className="section-head__eyebrow">Our Story</p>
            <h2 className="section-head__title" style={{ marginBottom: '1.5rem' }}>
              Serving the authentic taste of Kozhikode Biriyani
            </h2>
            <p className="about__text">
              At Biriyani Souq, every handi is prepared with careful marination,
              premium ingredients, and traditional dum techniques. We bring
              together nostalgic flavor and modern presentation — serving
              happiness, one dum at a time.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SIGNATURE DISHES — Circular images with rotating effect
           ═══════════════════════════════════════ */}
        <section id="our-signature" className="section section--dark">
          <div className="section-head reveal">
            <p className="section-head__eyebrow">Our Signature Dishes</p>
            <h2 className="section-head__title">Crafted to be unforgettable</h2>
            <p className="section-head__subtitle">
              Crafted with passion using traditional Malabar recipes and the
              finest ingredients.
            </p>
          </div>

          <div className="dishes-grid">
            {dishes.map((dish, i) => (
              <div
                key={dish.name}
                className={`dish-circle reveal reveal-delay-${(i % 4) + 1}`}
              >
                <div className="dish-circle__image-wrap">
                  <img src={dish.image} alt={dish.name} loading="lazy" />
                </div>
                <p className="dish-circle__name">{dish.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SERVICES — Oval bubbles (from wireframe)
           ═══════════════════════════════════════ */}
        <section id="our-services" className="section section--panel">
          <div className="section-head reveal">
            <p className="section-head__eyebrow">Our Services</p>
            <h2 className="section-head__title">
              Crafting moments, serving memories
            </h2>
            <p className="section-head__subtitle">
              Whatever the occasion, we've got you covered with premium catering
              and delivery.
            </p>
          </div>

          <div className="services-grid">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className={`service-bubble reveal reveal-delay-${(i % 4) + 1}`}
                >
                  <Icon size={24} className="service-bubble__icon" />
                  <p className="service-bubble__title">{svc.title}</p>
                  <p className="service-bubble__desc">{svc.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            LOCATIONS / FIND US
           ═══════════════════════════════════════ */}
        <section id="contact" className="section section--dark">
          <div className="section-head reveal">
            <p className="section-head__eyebrow">Find Us</p>
            <h2 className="section-head__title">
              Visit any Biriyani Souq branch
            </h2>
            <p className="section-head__subtitle">
              Tap the outlet below to get directions on Google Maps.
            </p>
          </div>

          <div className="locations-grid">
            {locations.map((loc, i) => (
              <div
                key={`${loc.branch}-${i}`}
                className={`location-card reveal reveal-delay-${(i % 4) + 1}`}
              >
                <h3 className="location-card__name">
                  <MapPin size={18} />
                  {loc.branch}
                </h3>
                <p className="location-card__desc">
                  Tap below to open Google Maps location details for this branch.
                </p>
                <a
                  className="location-card__btn"
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Biriyani Souq — Serving happiness, one dum at a time.</p>
      </footer>
    </>
  );
}
