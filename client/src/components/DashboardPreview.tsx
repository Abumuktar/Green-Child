'use client';
import { motion } from 'framer-motion';
import { Activity, BarChart3, ShieldCheck } from 'lucide-react';

const wards = [
  { name: 'Katsina Ward A', region: 'Katsina Region', risk: 'Critical', score: 94, status: 'Alert Sent' },
  { name: 'Kano Central', region: 'Kano Region', risk: 'Moderate', score: 62, status: 'Monitoring' },
  { name: 'Jigawa South', region: 'Jigawa Region', risk: 'Low', score: 28, status: 'Safe' },
];

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="gc-dashboard">
      <div className="gc-section-header">
        <span className="gc-pill">Intelligence Platform</span>
        <h2 className="gc-heading">Operational Intelligence</h2>
        <p className="gc-subtext">
          Processing community signals every 24 hours to generate precision health scoring at the ward level.
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
              <h3>System Integrity</h3>
              <p>Secure ward-level surveillance across 34 LGAs with end-to-end data validation.</p>
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
              <h3>Smart Response</h3>
              <p>Automated alert routing to local field workers before outbreaks hit clinics.</p>
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
              <span className="gc-monitor-tag">Live Monitor</span>
              <h4 className="gc-monitor-title">Ward Risk Status</h4>
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
                  <span className="gc-ward-score">{ward.score}%</span>
                  <span className={`gc-ward-pill ${ward.risk.toLowerCase()}`}>
                    {ward.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="gc-monitor-footer">
            <button className="gc-monitor-btn">
              Access Field Data <BarChart3 size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
