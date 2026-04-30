'use client';
import { motion } from 'framer-motion';
import { Globe2, ShieldCheck, Database, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const impacts = [
  { icon: <Users size={22} />, label: '10,000+', sub: 'Mothers enrolled in pilot network' },
  { icon: <Database size={22} />, label: '3.6M', sub: 'Household signals processed annually' },
  { icon: <Globe2 size={22} />, label: '18', sub: 'Countries targeted for immediate scale' },
];

const features = [
  { icon: <Globe2 size={16} />, label: 'Multi-Country Support' },
  { icon: <ShieldCheck size={16} />, label: 'ISO 27001 Compliant' },
  { icon: <Database size={16} />, label: 'Data Sovereignty' },
];

export default function ImpactSection() {
  return (
    <section id="impact" className="gc-impact">
      <div className="gc-impact-layout">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="gc-impact-content"
        >
          <span className="pill-njfp-white" style={{
            padding: '6px 16px',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: '100px',
            fontSize: '0.72rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
            width: 'fit-content'
          }}>Strategic Impact</span>
          <h2 className="gc-impact-heading">Scale Beyond Borders</h2>
          <p className="gc-impact-desc">
            GreenChild's cloud-native architecture is designed for multi-country deployment, targeting high-burden regions across West Africa.
          </p>
          <div className="gc-impact-pills">
            {features.map((f, i) => (
              <div key={i} className="gc-impact-pill">
                {f.icon}
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <Link to="/impact" className="gc-btn-secondary" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
              View Impact Report <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        <div className="gc-impact-stats">
          {impacts.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="gc-impact-stat"
            >
              <div className="gc-impact-stat-icon">{s.icon}</div>
              <div>
                <div className="gc-impact-stat-value">{s.label}</div>
                <div className="gc-impact-stat-sub">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
