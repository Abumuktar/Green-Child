'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const phases = [
  { year: "2026", title: "Product Development", description: "Building and validating the core AI surveillance platform and USSD pipeline.", status: "Current" },
  { year: "2027", title: "Pilot Launch", description: "First deployment across 34 LGAs in Katsina State with community mother onboarding.", status: "Planned" },
  { year: "2028", title: "Regional Expansion", description: "Scaling to Kano and Jigawa with National Malaria Elimination Programme integration.", status: "Planned" },
  { year: "2030", title: "Continental Scale", description: "Multi-country deployment across high-burden West African regions.", status: "Vision" }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="gc-roadmap">
      <div className="gc-section-header">
        <span className="gc-pill">Operational Journey</span>
        <h2 className="gc-heading">The Road to Zero Malaria</h2>
      </div>

      <div className="gc-roadmap-grid">
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="gc-card gc-roadmap-card"
          >
            <div className="gc-phase-year">{phase.year}</div>
            <div className={`gc-phase-status ${phase.status.toLowerCase()}`}>{phase.status}</div>
            <h3>{phase.title}</h3>
            <p>{phase.description}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <Link to="/roadmap" className="gc-btn-secondary">
          View Detailed Roadmap <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
