'use client';
import { motion } from 'framer-motion';
import { MessageSquare, Cpu, Bell, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { icon: <MessageSquare size={24} />, title: "Signal", desc: "Mothers report symptoms via simple USSD codes." },
  { icon: <Cpu size={24} />, title: "Intelligence", desc: "AI predicts risk using climate & community data." },
  { icon: <Bell size={24} />, title: "Alert", desc: "Coordinators receive 14-day early warning alerts." },
  { icon: <Activity size={24} />, title: "Action", desc: "Supplies are prepositioned before outbreaks hit." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="gc-hiw">
      <div className="gc-section-header">
        <span className="gc-pill">The Process</span>
        <h2 className="gc-heading">Community-Driven Intelligence</h2>
        <p className="gc-subtext">
          Our four-stage surveillance loop turns household signals into life-saving clinical response.
        </p>
      </div>

      <div className="gc-hiw-grid">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="gc-card gc-hiw-card"
          >
            <div className="gc-icon-box">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <Link to="/how-it-works" className="gc-btn-secondary">
          Explore Technical Details <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
