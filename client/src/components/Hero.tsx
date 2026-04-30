'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="gc-hero">
      <div className="gc-hero-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gc-pill">
            <span className="gc-badge-dot"></span> 
            Active Pilot: Katsina State
          </span>
          
          <h1 className="gc-hero-title">
            Protecting Every Child in <span className="gc-highlight">Nigeria's</span> Climate Age
          </h1>
          
          <p className="gc-hero-desc">
            GreenChild uses community intelligence and predictive AI to provide a 14-day early warning window against malaria outbreaks.
          </p>
          
          <div className="gc-hero-actions">
            <Link to="/how-it-works" className="gc-btn-primary">
              See How It Works <ArrowRight size={18} />
            </Link>
            <Link to="/demo/mother" className="gc-btn-secondary">
              Try the Demo <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
