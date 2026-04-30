'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <section id="contact" className="gc-cta">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="gc-cta-card"
      >
        <span className="gc-pill">Get Involved</span>
        <h2 className="gc-heading">Ready to Protect More Children?</h2>
        <p className="gc-subtext" style={{marginBottom:'32px'}}>
          Whether you are a health worker, policy maker, or technology partner — GreenChild is built for you. Join the network saving lives across West Africa.
        </p>
        <div className="gc-cta-actions">
          <a href="mailto:pilot@greenchild.health" className="gc-btn-primary">
            Partner With Us <ArrowRight size={18} />
          </a>
          <Link to="/demo/mother" className="gc-btn-secondary">
            Try the Demo <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
