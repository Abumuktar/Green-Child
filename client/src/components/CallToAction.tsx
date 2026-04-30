'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
        <span className="gc-pill">Engagement</span>
        <h2 className="gc-heading">Join the Surveillance Network</h2>
        <p className="gc-subtext" style={{marginBottom:'32px'}}>
          Whether you are a health worker, policy maker, or technology partner, your integration into the GreenChild network saves lives.
        </p>
        <div className="gc-cta-actions">
          <a href="mailto:pilot@greenchild.health" className="gc-btn-primary">
            Partner With Us <ArrowRight size={18} />
          </a>
          <a href="#brief" className="gc-btn-secondary">
            Technical Brief
          </a>
        </div>
      </motion.div>
    </section>
  );
}
