'use client';
import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Innovation() {
  return (
    <section id="innovation" className="gc-innovation">
      <div className="gc-section-header">
        <span className="gc-pill">Core Insight</span>
        <h2 className="gc-heading">Fusing Community Ground-Truth with Predictive AI</h2>
        <p className="gc-subtext">
          Traditional health systems react to clinic arrivals. GreenChild listens to community signals weeks before cases reach hospital gates.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="gc-quote-card"
      >
        <div className="gc-quote-icon">
          <Quote size={40} fill="currentColor" stroke="none" />
        </div>
        <blockquote className="gc-quote-text">
          "The challenge isn't a lack of medicine; it's the timing. By the time we see the spike in clinics, the outbreak is already full-scale. GreenChild gives us the 14-day window we never had."
        </blockquote>
        <div className="gc-quote-author">
          <div className="gc-author-avatar">AG</div>
          <div className="gc-author-info">
            <strong>Dr. Abubakar Garba</strong>
            <span>LGA Health Coordinator, Katsina Pilot</span>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <Link to="/innovation" className="gc-btn-primary">
            Read Our Intelligence Brief <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
