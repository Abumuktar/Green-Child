'use client';
import { motion } from 'framer-motion';
import { Users, Shield, Zap, Globe } from 'lucide-react';

const stats = [
  { icon: <Users size={22} />, value: '120k+', label: 'Lives Impacted', sub: 'Children Protected' },
  { icon: <Shield size={22} />, value: '94%', label: 'Accuracy', sub: 'Prediction Precision' },
  { icon: <Zap size={22} />, value: '24h', label: 'Response', sub: 'Early Alert Speed' },
  { icon: <Globe size={22} />, value: '34', label: 'Regions', sub: 'Active LGAs' },
];

export default function Stats() {
  return (
    <section className="gc-stats">
      <div className="gc-stats-grid">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{delay:i*0.08,duration:0.5}} viewport={{once:true}} className="gc-card gc-stat-card">
            <div className="gc-icon-box">{s.icon}</div>
            <div className="gc-stat-value">{s.value}</div>
            <div className="gc-stat-label">{s.label}</div>
            <div className="gc-stat-sub">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
