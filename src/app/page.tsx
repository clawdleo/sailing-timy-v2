'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import 'react-day-picker/dist/style.css';

// Smoother animation wrapper - reduced movement, earlier trigger
function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
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
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[110%] relative">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

// Icon components
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
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(4);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showCalendar, setShowCalendar] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checkIn = dateRange?.from ? format(dateRange.from, 'MMM dd, yyyy') : 'Not selected';
    const checkOut = dateRange?.to ? format(dateRange.to, 'MMM dd, yyyy') : 'Not selected';
    alert(`Thank you ${formData.name}!\n\nYour inquiry:\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\n\nPeter will contact you within 24 hours.`);
  };

  // Gallery images - sea and sailboats only, no people
  const galleryImages = [
    'https://static.wixstatic.com/media/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg/v1/fill/w_800,h_533,q_90/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg',
    'https://static.wixstatic.com/media/b9f14f_88f9842c7d444cbeaf3745ac9bf65436~mv2.jpg/v1/fill/w_800,h_400,q_90/b9f14f_88f9842c7d444cbeaf3745ac9bf65436~mv2.jpg',
    'https://static.wixstatic.com/media/b9f14f_9d647b671c1a44069866ea6239f142b7~mv2.jpg/v1/fill/w_800,h_533,q_90/croatia.jpg',
    'https://static.wixstatic.com/media/aa72d7_896ce0f3f252464fac4c411a586fd3af~mv2.jpg/v1/fill/w_800,h_600,q_90/lagoon46-ncz3830-a3-scaled-1_edited.jpg',
    'https://static.wixstatic.com/media/b9f14f_13eb81f6b6774cafa9ad22ff86fd0009~mv2.jpg/v1/fill/w_860,h_638,al_c,q_85/20180923_120820.jpg',
    'https://static.wixstatic.com/media/b9f14f_2d08e727c0394b2484b8a1851b3ed8dc~mv2.jpg/v1/fill/w_800,h_600,q_90/20210716_192742.jpg',
  ];

  return (
    <main className="bg-[#F8F8F8] text-black">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="flex justify-between items-center h-16 md:h-20">
            <a href="#" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-black rounded-full p-0.5 flex items-center justify-center">
                <Image
                  src="https://static.wixstatic.com/media/b9f14f_b7accfdba0874f60b68adc89cc58d6c0~mv2.png/v1/fill/w_96,h_96,al_c,q_85/logo%20png%20bel.png"
                  alt="Sailing Timy"
                  width={38}
                  height={38}
                  className="rounded-full"
                />
              </div>
              <span className="font-semibold text-lg tracking-tight hidden sm:block">Sailing Timy</span>
            </a>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#story" className="text-sm text-gray-600 hover:text-black transition">Our Story</a>
              <a href="#boat" className="text-sm text-gray-600 hover:text-black transition">The Boat</a>
              <a href="#gallery" className="text-sm text-gray-600 hover:text-black transition">Gallery</a>
              <a href="#reviews" className="text-sm text-gray-600 hover:text-black transition">Reviews</a>
              <a href="#book" className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition">
                Book Now
              </a>
            </div>

            <a href="#book" className="md:hidden bg-black text-white px-5 py-2 rounded-full text-sm font-medium">
              Book
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/12467b_0f77783bac784c6290be716da90eac60~mv2.jpg/v1/fill/w_1920,h_1080,q_90/12467b_0f77783bac784c6290be716da90eac60~mv2.jpg"
            alt="Sailing in Croatia"
            fill
            className="object-cover"
            priority
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://static.wixstatic.com/media/12467b_0f77783bac784c6290be716da90eac60~mv2.jpg/v1/fill/w_1920,h_1080,q_90/12467b_0f77783bac784c6290be716da90eac60~mv2.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Professional Skipper Service in Croatia
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-8"
          >
            Discover the Adriatic<br />Like Never Before
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience Croatia&apos;s hidden bays with Peter, a seasoned skipper with over 20 years of experience. No deposit. No stress. Just pure adventure.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#book" className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition inline-flex items-center justify-center gap-2">
              Check Availability
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@sailingtimy" target="_blank" rel="noopener noreferrer" className="border border-white/40 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition inline-flex items-center justify-center gap-2">
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
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/80 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '30,000+', label: 'Nautical Miles' },
              { number: '3', label: 'Years at Sea' },
              { number: '20+', label: 'Years Experience' },
              { number: '100%', label: 'Happy Guests' },
            ].map((stat, i) => (
              <FadeInSection key={i} delay={i * 0.1} className="text-center">
                <div className="text-3xl md:text-4xl font-light text-black mb-1">{stat.number}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeInSection>
              <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-6">
                From Dream to Circumnavigation
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Between 2021 and 2024, Peter and Natalija did what most only dream of — they sailed their 39-foot yacht <strong className="text-black">Timy</strong> around the entire world.
                </p>
                <p>
                  30,000 nautical miles. Ocean crossings. Remote islands most will never see. This wasn&apos;t a vacation — it was complete commitment to the sea.
                </p>
                <p>
                  Now, they bring that experience to you on the beautiful Croatian Adriatic.
                </p>
              </div>
              
              <div className="flex gap-3 mt-8">
                {[
                  { href: 'https://www.youtube.com/@sailingtimy', icon: 'youtube' },
                  { href: 'https://www.instagram.com/sailingtimy', icon: 'instagram' },
                  { href: 'https://www.facebook.com/sailingtimy', icon: 'facebook' },
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" 
                     className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition">
                    {social.icon === 'youtube' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>}
                    {social.icon === 'instagram' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>}
                    {social.icon === 'facebook' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
                  </a>
                ))}
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.15} className="relative">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                    <Image
                      src="https://static.wixstatic.com/media/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg/v1/fill/w_600,h_750,q_90/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg"
                      alt="Cyclades sailboat"
                      width={400}
                      height={500}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="space-y-3 pt-8">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src="https://static.wixstatic.com/media/b9f14f_9d647b671c1a44069866ea6239f142b7~mv2.jpg/v1/fill/w_500,h_500,q_90/croatia.jpg"
                      alt="Croatian coast"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src="https://static.wixstatic.com/media/b9f14f_13eb81f6b6774cafa9ad22ff86fd0009~mv2.jpg/v1/fill/w_600,h_450,q_90/20180923_120820.jpg"
                      alt="Cockpit"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 bg-black text-white px-5 py-2 rounded-full font-medium text-sm">
                2021–2024
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Boat Section */}
      <section className="relative h-[50vh] md:h-[70vh]">
        <ParallaxImage
          src="https://static.wixstatic.com/media/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg/v1/fill/w_1920,h_1080,q_90/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg"
          alt="Cyclades 50.5"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <FadeInSection>
            <span className="text-sm uppercase tracking-[0.2em] text-white/70 mb-3 block">The Vessel</span>
            <h2 className="text-4xl md:text-5xl font-medium">Cyclades 50.5</h2>
            <p className="text-white/70 mt-3 text-lg">51 ft of comfort and adventure</p>
          </FadeInSection>
        </div>
      </section>

      {/* Boat Details */}
      <section id="boat" className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeInSection className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Length', value: '51 ft / 15m' },
                  { label: 'Cabins', value: '5 Guest Cabins' },
                  { label: 'Bathrooms', value: '3' },
                  { label: 'Engine', value: 'Yanmar 100 HP' },
                  { label: 'Home Port', value: 'Krk, Croatia' },
                  { label: 'Year Built', value: '2007' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#F8F8F8] rounded-xl p-4">
                    <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-black text-white rounded-2xl p-6">
                <h3 className="font-medium text-lg mb-4">Fully Equipped</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {['GPS & Autopilot', 'Bow Thruster', 'Bimini & Sprayhood', 'Dinghy Included', 'Electric Windlass', 'Full Safety Gear', 'Outdoor Shower', 'Spacious Cockpit'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.15} className="order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg/v1/fill/w_1000,h_750,q_90/aa72d7_e231d5d26fac4181aeac43e6bd648947~mv2.jpg"
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

      {/* Gallery Section - Sea & Sailboats only */}
      <section id="gallery" className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <FadeInSection className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3 block">Gallery</span>
            <h2 className="text-3xl md:text-4xl font-medium">Moments at Sea</h2>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((src, i) => (
              <FadeInSection key={i} delay={i * 0.08}>
                <div className={`rounded-xl overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <Image
                    src={src}
                    alt={`Sailing gallery ${i + 1}`}
                    width={800}
                    height={600}
                    className={`object-cover w-full hover:scale-105 transition-transform duration-700 ${i === 0 ? 'h-full md:aspect-square' : 'aspect-[4/3]'}`}
                  />
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <FadeInSection className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-medium">More Than Just a Charter</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <CompassIcon />, title: 'Experienced Skipper', desc: 'Peter sailed 30,000+ nautical miles around the world. Your safety and adventure in expert hands.' },
              { icon: <ShieldIcon />, title: 'No Deposit', desc: 'We trust our guests. No security deposit means no stress before your holiday.' },
              { icon: <SparkleIcon />, title: 'Hassle-Free', desc: 'Skip terminal queues and paperwork. We handle everything for seamless boarding.' },
              { icon: <ChefIcon />, title: 'Hostess Available', desc: 'Natalija can join as chef, preparing gourmet meals while you enjoy the sea.' },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.08}>
                <div className="bg-[#F8F8F8] rounded-2xl p-6 h-full hover:shadow-md transition-shadow duration-500">
                  <div className="text-black mb-4">{item.icon}</div>
                  <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <FadeInSection className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3 block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-medium">What Our Guests Say</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { quote: '"Natalija\'s cuisine was truly top-notch. Both are friendly and flexible, always listening to guests\' wishes."', name: 'John & Grace', location: 'Australia' },
              { quote: '"We\'ve sailed with them four times. Peter shares experiences and explains everything clearly."', name: 'Toni', location: 'Slovenia' },
              { quote: '"Completely carefree sailing. Peter took us to beautiful bays we\'d never find alone."', name: 'Eric', location: 'England' },
            ].map((t, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 h-full border border-gray-100">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">{t.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.location}</div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section - Airbnb Style Calendar */}
      <section id="book" className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-12">
          <FadeInSection className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3 block">Book Your Trip</span>
            <h2 className="text-3xl md:text-4xl font-medium">Check Availability</h2>
            <p className="text-gray-500 mt-3">Select your dates and we&apos;ll get back to you within 24 hours</p>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <form onSubmit={handleSubmit} className="bg-[#F8F8F8] rounded-3xl p-6 md:p-10">
              {/* Date Selection - Airbnb Style */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Dates</label>
                <div 
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="bg-white rounded-2xl border border-gray-200 p-4 cursor-pointer hover:border-gray-300 transition"
                >
                  <div className="grid grid-cols-2 divide-x divide-gray-200">
                    <div className="pr-4">
                      <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Check-in</div>
                      <div className="font-medium">
                        {dateRange?.from ? format(dateRange.from, 'MMM dd, yyyy') : 'Add date'}
                      </div>
                    </div>
                    <div className="pl-4">
                      <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Check-out</div>
                      <div className="font-medium">
                        {dateRange?.to ? format(dateRange.to, 'MMM dd, yyyy') : 'Add date'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {showCalendar && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-white rounded-2xl border border-gray-200 p-4 overflow-hidden"
                  >
                    <DayPicker
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                      className="!font-sans"
                      classNames={{
                        months: "flex flex-col md:flex-row gap-4",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center",
                        caption_label: "text-sm font-medium",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-7 w-7 bg-transparent p-0 hover:bg-gray-100 rounded-full flex items-center justify-center",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal hover:bg-gray-100 rounded-full flex items-center justify-center",
                        day_selected: "bg-black text-white hover:bg-black",
                        day_today: "bg-gray-100",
                        day_outside: "text-gray-400 opacity-50",
                        day_disabled: "text-gray-400 opacity-50",
                        day_range_middle: "bg-gray-100 rounded-none",
                        day_range_end: "bg-black text-white rounded-full",
                        day_range_start: "bg-black text-white rounded-full",
                      }}
                    />
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowCalendar(false)}
                        className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Guests */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">Guests</label>
                <div className="bg-white rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{guests} Guests</div>
                      <div className="text-xs text-gray-500">Max 10 guests</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-medium">{guests}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  placeholder="Tell us about your group or any special requests..."
                />
              </div>

              {/* Pricing Summary */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Skipper (per day)</span>
                  <span className="font-medium">€200</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Transit log</span>
                  <span className="font-medium">€300</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Security deposit</span>
                  <span className="font-medium text-green-600">€0</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <p className="text-xs text-gray-500">Boat charter rates vary by season. We&apos;ll send you a detailed quote.</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition text-lg"
              >
                Request Booking
              </button>
            </form>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 md:px-12">
          <FadeInSection className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-medium">Common Questions</h2>
          </FadeInSection>

          <div className="space-y-3">
            {[
              { q: 'Do I need sailing experience?', a: "No experience needed! Peter handles everything. If you want to learn, he'll happily teach you." },
              { q: 'Do I need to pay a deposit?', a: "No. We don't require any security deposit. We trust our guests." },
              { q: 'Can I rent for less than a week?', a: 'Yes! We offer shorter 3-4 day trips outside the main season.' },
              { q: 'Is a hostess available?', a: 'Yes! Natalija can join as hostess, preparing two gourmet meals daily.' },
              { q: 'Where do you sail?', a: "We're based in Krk and sail the stunning Croatian coast — hidden bays, islands, and crystal-clear waters." },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.05}>
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition"
                  >
                    <span className="font-medium pr-4">{item.q}</span>
                    <motion.svg 
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
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
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full p-0.5 flex items-center justify-center">
                <Image
                  src="https://static.wixstatic.com/media/b9f14f_b7accfdba0874f60b68adc89cc58d6c0~mv2.png/v1/fill/w_96,h_96,al_c,q_85/logo%20png%20bel.png"
                  alt="Sailing Timy"
                  width={34}
                  height={34}
                  className="rounded-full"
                />
              </div>
              <span className="font-semibold">Sailing Timy</span>
            </div>
            
            <div className="flex gap-6">
              {[
                { href: 'https://www.youtube.com/@sailingtimy', label: 'YouTube' },
                { href: 'https://www.instagram.com/sailingtimy', label: 'Instagram' },
                { href: 'https://www.facebook.com/sailingtimy', label: 'Facebook' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black transition">
                  {s.label}
                </a>
              ))}
            </div>
            
            <div className="text-sm text-gray-500">
              © 2026 Sailing Timy
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
