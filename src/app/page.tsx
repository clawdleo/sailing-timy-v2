'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Animation wrapper component
function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax image component
function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] relative">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

// Icon components (professional SVGs)
const CompassIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v2m0 16v2m10-10h-2M4 12H2m15.07-5.07l-1.41 1.41M8.34 15.66l-1.41 1.41m0-11.14l1.41 1.41m7.32 7.32l1.41 1.41M12 8l-2 4 4 2-2-6z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const ChefIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
  </svg>
);

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', date: '', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Peter will contact you within 24 hours.');
  };

  return (
    <main className="bg-[#F8F8F8] text-black overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-[1660px] mx-auto px-5 md:px-12">
          <div className="flex justify-between items-center h-16 md:h-20">
            <a href="#" className="flex items-center gap-3">
              <Image
                src="https://static.wixstatic.com/media/b9f14f_b7accfdba0874f60b68adc89cc58d6c0~mv2.png/v1/fill/w_96,h_96,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo%20png%20bel.png"
                alt="Sailing Timy"
                width={44}
                height={44}
                className="rounded-full"
              />
              <span className="font-medium text-lg tracking-tight hidden sm:block">Sailing Timy</span>
            </a>
            
            <div className="hidden md:flex items-center gap-10">
              <a href="#story" className="text-sm text-gray-600 hover:text-black transition">Our Story</a>
              <a href="#boat" className="text-sm text-gray-600 hover:text-black transition">The Boat</a>
              <a href="#services" className="text-sm text-gray-600 hover:text-black transition">Services</a>
              <a href="#reviews" className="text-sm text-gray-600 hover:text-black transition">Reviews</a>
              <a href="#contact" className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition">
                Book Now
              </a>
            </div>

            <a href="#contact" className="md:hidden bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium">
              Book Now
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Aerial Croatian Coast */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1555990538-1e7f4f134722?w=1920&q=80"
            alt="Croatian Coast Aerial View"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Professional Skipper Service in Croatia
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-8"
          >
            Discover the Adriatic<br />Like Never Before
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience Croatia&apos;s hidden bays with Peter, a seasoned skipper with over 20 years of experience. No deposit. No stress. Just pure adventure.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#contact" className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition inline-flex items-center justify-center gap-2">
              Book Your Adventure
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@sailingtimy" target="_blank" rel="noopener noreferrer" className="border border-white/50 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch Our Journey
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1660px] mx-auto px-5 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '30,000+', label: 'Nautical Miles' },
              { number: '3', label: 'Years at Sea' },
              { number: '20+', label: 'Years Experience' },
              { number: '100%', label: 'Happy Guests' },
            ].map((stat, i) => (
              <FadeInSection key={i} delay={i * 0.1} className="text-center">
                <div className="text-4xl md:text-5xl font-light text-black mb-2">{stat.number}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-20 md:py-32">
        <div className="max-w-[1660px] mx-auto px-5 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection>
              <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">Our Story</span>
              <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-8">
                From Dream to<br />Circumnavigation
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Between 2021 and 2024, Peter and Natalija did what most only dream of — they sailed their 39-foot yacht <strong className="text-black">Timy</strong> around the entire world.
                </p>
                <p>
                  30,000 nautical miles. Ocean crossings. Remote islands most will never see. This wasn&apos;t a vacation — it was complete commitment to the sea and to each other.
                </p>
                <p>
                  Now, they bring that world-class experience to you on the beautiful Croatian Adriatic. When you sail with Peter, you&apos;re not just getting a skipper — you&apos;re getting stories, knowledge, and expertise earned across every ocean.
                </p>
              </div>
              
              <div className="flex gap-4 mt-10">
                {[
                  { href: 'https://www.youtube.com/@sailingtimy', icon: 'youtube' },
                  { href: 'https://www.instagram.com/sailingtimy', icon: 'instagram' },
                  { href: 'https://www.facebook.com/sailingtimy', icon: 'facebook' },
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" 
                     className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition">
                    {social.icon === 'youtube' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    )}
                    {social.icon === 'instagram' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    )}
                    {social.icon === 'facebook' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    )}
                  </a>
                ))}
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                    <Image
                      src="https://static.wixstatic.com/media/b9f14f_14f3ce0d2de14d41b76a729d0056d8e9~mv2.jpg/v1/crop/x_167,y_0,w_3300,h_2252/fill/w_990,h_676,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/20210716_192712.jpg"
                      alt="Sailing Timy"
                      width={400}
                      height={500}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src="https://static.wixstatic.com/media/b9f14f_2d08e727c0394b2484b8a1851b3ed8dc~mv2.jpg/v1/fill/w_910,h_676,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/20210716_192742.jpg"
                      alt="Boat interior"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src="https://static.wixstatic.com/media/b9f14f_13eb81f6b6774cafa9ad22ff86fd0009~mv2.jpg/v1/fill/w_860,h_638,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/20180923_120820.jpg"
                      alt="Cockpit"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-black text-white px-6 py-3 rounded-full font-medium text-sm shadow-lg">
                2021–2024
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Full Width Image Section */}
      <section className="relative h-[60vh] md:h-[80vh]">
        <ParallaxImage
          src="https://static.wixstatic.com/media/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg/v1/fill/w_1920,h_1080,al_c/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg"
          alt="Cyclades 50.5"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <FadeInSection>
            <span className="text-sm uppercase tracking-[0.2em] text-white/80 mb-4 block">The Vessel</span>
            <h2 className="text-4xl md:text-6xl font-medium">Cyclades 50.5</h2>
            <p className="text-white/80 mt-4 text-lg">51 ft of comfort and adventure</p>
          </FadeInSection>
        </div>
      </section>

      {/* Boat Details Section */}
      <section id="boat" className="py-20 md:py-32 bg-white">
        <div className="max-w-[1660px] mx-auto px-5 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Length', value: '51 ft / 15m' },
                  { label: 'Cabins', value: '5 Guest Cabins' },
                  { label: 'Bathrooms', value: '3' },
                  { label: 'Engine', value: 'Yanmar 100 HP' },
                  { label: 'Home Port', value: 'Krk, Croatia' },
                  { label: 'Year Built', value: '2007' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#F8F8F8] rounded-xl p-5 border border-gray-100">
                    <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">{item.label}</div>
                    <div className="font-medium text-lg">{item.value}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-black text-white rounded-2xl p-8">
                <h3 className="font-medium text-xl mb-6">Fully Equipped for Comfort</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    'GPS & Autopilot',
                    'Bow Thruster',
                    'Bimini & Sprayhood',
                    'Dinghy Included',
                    'Electric Windlass',
                    'Full Safety Gear',
                    'Outdoor Shower',
                    'Spacious Cockpit',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2} className="order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg/v1/fill/w_1070,h_713,al_c/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg"
                  alt="Cyclades 50.5"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Services Section - Professional SVG Icons */}
      <section id="services" className="py-20 md:py-32">
        <div className="max-w-[1660px] mx-auto px-5 md:px-12">
          <FadeInSection className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-5xl font-medium">More Than Just a Charter</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <CompassIcon />,
                title: 'Experienced Skipper',
                desc: 'Peter has sailed over 30,000 nautical miles including a complete circumnavigation. Your safety and adventure are in expert hands.'
              },
              {
                icon: <ShieldIcon />,
                title: 'No Deposit Required',
                desc: 'We trust our guests. No security deposit means no stress before your holiday begins.'
              },
              {
                icon: <SparkleIcon />,
                title: 'Hassle-Free Boarding',
                desc: 'Skip the terminal queues and paperwork. We handle everything for seamless boarding.'
              },
              {
                icon: <ChefIcon />,
                title: 'Hostess Available',
                desc: 'Natalija can join as chef, preparing gourmet meals daily while you enjoy the sea.'
              },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 h-full hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                  <div className="text-black mb-6">{item.icon}</div>
                  <h3 className="font-medium text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-20 md:py-32 bg-white">
        <div className="max-w-[1660px] mx-auto px-5 md:px-12">
          <FadeInSection className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-medium">What Our Guests Say</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: '"Natalija\'s cuisine was truly top-notch, tastier than many restaurants. Both are friendly and flexible, always listening to guests\' wishes."',
                name: 'John & Grace',
                location: 'Australia',
              },
              {
                quote: '"We\'ve sailed with them four times. I love that I can participate in sailing under Peter\'s watchful eye. He shares experiences and explains everything."',
                name: 'Toni',
                location: 'Slovenia',
              },
              {
                quote: '"Completely carefree sailing. Peter is extremely professional — you feel safe at all times. He took us to beautiful bays we\'d never find alone."',
                name: 'Eric',
                location: 'England',
              },
            ].map((t, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-[#F8F8F8] rounded-2xl p-8 h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed">{t.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-medium">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.location}</div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-5 md:px-12">
          <FadeInSection className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-medium">Simple, Transparent Pricing</h2>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-medium text-lg mb-6">Additional Costs</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Skipper (per day)', value: '€200' },
                      { label: 'Transit log', value: '€300' },
                      { label: 'Tourist tax (per week)', value: '€74' },
                      { label: 'Security deposit', value: '€0', highlight: true },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600">{item.label}</span>
                        <span className={`font-medium ${item.highlight ? 'text-green-600' : ''}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-6">What&apos;s Included</h3>
                  <ul className="space-y-3">
                    {[
                      'Professional skipper (Peter)',
                      'Full boat equipment',
                      'Dinghy with outboard',
                      'All safety equipment',
                      'Bed linens',
                      'Final cleaning',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-500 mb-6">Boat charter rates vary by season. Contact us for a custom quote.</p>
                <a href="#contact" className="inline-block bg-black text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition">
                  Get Your Quote
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-5 md:px-12">
          <FadeInSection className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-medium">Frequently Asked Questions</h2>
          </FadeInSection>

          <div className="space-y-4">
            {[
              {
                q: 'Do I need sailing experience?',
                a: "No experience needed! Peter handles everything. If you want to learn, he'll happily teach you. Or just relax and enjoy the ride."
              },
              {
                q: 'Do I need to pay a deposit?',
                a: "No. We don't require any security deposit. We trust our guests and want you to have a stress-free experience from the start."
              },
              {
                q: 'Can I rent for less than a week?',
                a: 'Yes! We offer shorter 3-4 day trips outside the main season. Contact us for availability.'
              },
              {
                q: 'Is a hostess available?',
                a: 'Yes! Natalija can join as hostess, preparing two gourmet meals daily. She sailed around the world and worked on charter catamarans.'
              },
              {
                q: 'Where do you sail?',
                a: "We're based in Krk and sail the stunning Croatian coast — hidden bays, islands, and crystal-clear Adriatic waters. Peter knows the best spots."
              },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.05}>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition"
                  >
                    <span className="font-medium text-lg pr-4">{item.q}</span>
                    <motion.svg 
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      className="w-5 h-5 text-gray-400 flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920&q=80"
            alt="Croatian Islands"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-12">
          <FadeInSection className="text-center text-white mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-white/60 mb-4 block">Ready to Set Sail?</span>
            <h2 className="text-3xl md:text-5xl font-medium mb-6">Your perfect adventure awaits</h2>
            <p className="text-white/70 text-lg">Send us an inquiry and Peter will get back to you within 24 hours.</p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F8F8F8] border-0 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8F8F8] border-0 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred start date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#F8F8F8] border-0 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-[#F8F8F8] border-0 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  placeholder="Tell us about your group, dates, or any questions..."
                />
              </div>
              
              <button
                type="submit"
                className="mt-8 w-full bg-black text-white py-5 rounded-full font-medium hover:bg-gray-800 transition text-lg"
              >
                Send Inquiry
              </button>
            </form>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#F8F8F8] border-t border-gray-100">
        <div className="max-w-[1660px] mx-auto px-5 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <Image
                src="https://static.wixstatic.com/media/b9f14f_b7accfdba0874f60b68adc89cc58d6c0~mv2.png/v1/fill/w_96,h_96,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo%20png%20bel.png"
                alt="Sailing Timy"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-medium">Sailing Timy</span>
            </div>
            
            <div className="flex gap-6">
              {[
                { href: 'https://www.youtube.com/@sailingtimy', label: 'YouTube' },
                { href: 'https://www.instagram.com/sailingtimy', label: 'Instagram' },
                { href: 'https://www.facebook.com/sailingtimy', label: 'Facebook' },
                { href: 'https://www.tiktok.com/@sailingtimy', label: 'TikTok' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" 
                   className="text-sm text-gray-500 hover:text-black transition">
                  {s.label}
                </a>
              ))}
            </div>
            
            <div className="text-sm text-gray-500">
              © 2026 Sailing Timy. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
