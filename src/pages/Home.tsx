import React from 'react';
import { motion } from 'motion/react';
import { BRAND } from '../config';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Star } from 'lucide-react';
import { LazyVideo } from '../components/LazyVideo';
import { SEO } from '../components/SEO';
import { DynamicHomeSections } from '../components/DynamicHomeSections';

export const Home = () => {
  return (
    <div className="w-full">
      <SEO />
      {/* Cinematic Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-0 p-4 md:p-0">
          <div className="w-full max-w-[450px] aspect-square md:max-w-none md:aspect-auto md:w-full md:h-full overflow-hidden rounded-2xl md:rounded-none border border-white/5 md:border-none shadow-[0_0_50px_rgba(212,175,55,0.05)] md:shadow-none bg-black/40">
            <LazyVideo
              src={BRAND.heroVideoUrl}
              className="w-full h-full object-cover opacity-50 md:opacity-60"
            />
          </div>
        </div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-1 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,rgba(0,0,0,0.85)_100%)] z-1 pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 flex flex-col items-center mt-20 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6 flex items-center justify-center gap-3 w-fit mx-auto px-4 py-1.5 rounded-full border border-gold-500/30 bg-black/50 backdrop-blur-md"
          >
            <Star size={14} className="text-gold-500" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-gray-300">New Arrivals</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-tight leading-tight"
          >
            PRIME <span className="gold-gradient-text">ELITE</span> STORE
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Welcome to Prime Elite Store. We offer a curated selection of premium products for our members. Log in with your Google account to browse our catalog, manage your orders, track shipping, and access exclusive member-only deals.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto"
          >
            <Link
              to="/products"
              className="group relative overflow-hidden bg-white text-black px-8 py-4 flex items-center justify-center gap-3 rounded hover:scale-105 transition-transform"
            >
              <div className="absolute inset-0 gold-gradient-bg opacity-0 group-hover:opacity-10 transition-opacity" />
              <ShoppingBag size={18} />
              <span className="font-semibold uppercase tracking-widest text-sm">Shop Now</span>
            </Link>
            
            <Link
              to="/products"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              <span className="uppercase tracking-widest text-sm font-medium">View Offers</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Google Consent Screen Compliance & Welcome Card Section */}
      <section className="py-20 bg-zinc-950 border-t border-b border-white/5 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03),transparent_70%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6 inline-flex items-center justify-center p-4 rounded-full bg-gold-500/5 border border-gold-500/20 text-gold-500">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-light text-white mb-6 uppercase tracking-wider">
            About <span className="font-bold gold-gradient-text">Prime Elite Store</span>
          </h2>
          <p className="text-gray-300 text-base md:text-xl leading-relaxed mb-10 font-light max-w-4xl mx-auto">
            Welcome to <strong className="text-white">Prime Elite Store</strong>. We offer a curated selection of premium products for our members. Log in with your Google account to browse our catalog, manage your orders, track shipping, and access exclusive member-only deals.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 text-left">
            <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/30 backdrop-blur-md hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-gold-500 font-bold mb-3 uppercase tracking-widest text-xs font-mono">Premium Inventory</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Discover a carefully handpicked selection of top-tier consumer technology, exquisite designer watches, and professional acoustical soundscapes.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/30 backdrop-blur-md hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-gold-500 font-bold mb-3 uppercase tracking-widest text-xs font-mono">Secure Authorization</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Securely authenticate using Google OAuth to personalize your wishlist, review custom orders, track active shipments, and verify purchase histories.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/30 backdrop-blur-md hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-gold-500 font-bold mb-3 uppercase tracking-widest text-xs font-mono">Exclusive Offers</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Access custom member-only pricing, priority fast shipping options, bulk discount catalogs, and personalized virtual consultants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories (Minimalist Concept) */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row gap-12 items-end justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-light text-white mb-4">
                The <span className="font-bold gold-gradient-text">Collection</span>
              </h2>
              <p className="text-gray-400 max-w-md">Discover our meticulously curated selection of premium electronics.</p>
            </div>
            <Link to="/products" className="text-gold-500 uppercase tracking-widest text-xs flex items-center gap-2 hover:text-gold-400 transition-colors group">
              Explore All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Luxury Watches',
                categoryKey: 'Watches',
                videoUrl: 'https://res.cloudinary.com/dxegdaylf/video/upload/v1779982835/WhatsApp_Video_2026-05-28_at_13.52.26_mqbsbs.mp4'
              },
              {
                name: 'High-Fidelity Audio',
                categoryKey: 'EarPods',
                videoUrl: 'https://res.cloudinary.com/dxegdaylf/video/upload/v1779982535/WhatsApp_Video_2026-05-28_at_13.41.54_2_nsaops.mp4'
              },
              {
                name: 'Smart Devices',
                categoryKey: 'Smartwatches',
                videoUrl: 'https://res.cloudinary.com/dxegdaylf/video/upload/v1779982551/WhatsApp_Video_2026-05-18_at_17.07.22_pamdz3.mp4'
              }
            ].map((col, i) => (
              <Link 
                to={`/products?category=${col.categoryKey}`}
                key={col.name} 
                className="group relative h-96 overflow-hidden rounded-xl border border-white/5 cursor-pointer bg-zinc-950 flex flex-col justify-end p-8 hover:border-gold-500/30 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                
                {/* Background Looping Video */}
                <div className="absolute inset-0 z-0 bg-zinc-950 group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center overflow-hidden">
                  <LazyVideo
                    src={col.videoUrl}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity"
                  />
                </div>
                
                <div className="relative z-20">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-wide group-hover:text-gold-400 transition-colors">{col.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-gold-500/80 font-bold flex items-center gap-1 opacity-90 group-hover:opacity-100 translation-transform duration-300">
                    Explore Collection <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inject New Arrivals and Best Sellers */}
      <DynamicHomeSections />

    </div>
  );
};
