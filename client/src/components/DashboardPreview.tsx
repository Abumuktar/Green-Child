'use client';
import { motion } from 'framer-motion';
import { Activity, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const wards = [
  { name: 'Tudun Wada',  region: 'Katsina · Katsina State', score: 87, status: 'Alert Sent', color: '#ef4444' },
  { name: 'Dala',        region: 'Kano · Kano State',       score: 79, status: 'Monitoring', color: '#f97316' },
  { name: 'Dutsin-Ma',   region: 'Katsina · Katsina State', score: 21, status: 'All Clear',  color: '#22c55e' },
];

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="gc-dashboard">
      <div className="gc-section-header">
        <span className="gc-pill">Live Dashboard</span>
        <h2 className="gc-heading">See Risk Before It Becomes an Outbreak</h2>
        <p className="gc-subtext">
          Every community gets a live risk score, updated daily using mother reports and NASA climate data.
        </p>
      </div>

      <div className="gc-dash-layout">
        <div className="gc-dash-features">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="gc-card gc-dash-feature"
          >
            <div className="gc-icon-box" style={{width:'42px', height:'42px', borderRadius:'10px'}}><ShieldCheck size={20} /></div>
            <div>
              <h3>14-Day Early Warning</h3>
              <p>Health workers get alerts up to two weeks before an outbreak hits clinics.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="gc-card gc-dash-feature"
          >
            <div className="gc-icon-box" style={{width:'42px', height:'42px', borderRadius:'10px'}}><Activity size={20} /></div>
            <div>
              <h3>Automatic Alerts</h3>
              <p>When risk crosses a threshold, the nearest health worker is notified immediately.</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="gc-monitor"
        >
          <div className="gc-monitor-header">
            <div>
              <span className="gc-monitor-tag">Live</span>
              <h4 className="gc-monitor-title">Community Risk Today</h4>
            </div>
            <div className="gc-live-dot">
              <span className="gc-badge-dot" style={{width:'6px', height:'6px'}}></span>
              LIVE
            </div>
          </div>

          <div className="gc-ward-list">
            {wards.map((ward, i) => (
              <div key={i} className="gc-ward-row">
                <div className="gc-ward-info">
                  <span className="gc-ward-name">{ward.name}</span>
                  <div className="gc-ward-region">{ward.region}</div>
                </div>
                <div className="gc-ward-data">
                  <span className="gc-ward-score" style={{ color: ward.color }}>{ward.score}</span>
                  <span className="gc-ward-pill" style={{ background: ward.color + '18', color: ward.color }}>
                    {ward.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="gc-monitor-footer">
            <Link to="/demo/dashboard" className="gc-monitor-btn">
              Open Full Dashboard <BarChart3 size={16} />
            </Link>
          </div>
        </motion.div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/demo/mother" className="gc-btn-primary">
          Try the Demo <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
