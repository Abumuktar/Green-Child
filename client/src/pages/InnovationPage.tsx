import { motion } from 'framer-motion';
import { Brain, Layers, TrendingUp, Microscope, ArrowRight, Quote, BarChart3, Cpu } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const pillars = [
  {
    icon: <Brain size={24} />,
    title: "Community Ground-Truth",
    desc: "Traditional surveillance depends on clinic data. GreenChild captures signals directly from community mothers weeks before patients reach hospitals.",
    stat: "14 days",
    statLabel: "Early detection window"
  },
  {
    icon: <Layers size={24} />,
    title: "Climate Data Fusion",
    desc: "We overlay satellite imagery—rainfall patterns, humidity indexes, temperature anomalies—with community health signals to predict outbreak corridors.",
    stat: "6 sources",
    statLabel: "Integrated data streams"
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Predictive Modeling",
    desc: "Our ensemble ML models generate ward-level risk scores that local coordinators use to preposition medical supplies and deploy field teams.",
    stat: "94%",
    statLabel: "Prediction accuracy"
  },
  {
    icon: <Microscope size={24} />,
    title: "Continuous Validation",
    desc: "Every prediction is validated against clinical outcomes. This closed feedback loop ensures the model improves with every outbreak cycle.",
    stat: "3.6M",
    statLabel: "Signals validated annually"
  }
];

const comparisons = [
  { traditional: "Reacts to clinic arrivals", greenchild: "Predicts outbreaks 14 days early" },
  { traditional: "Relies on hospital data only", greenchild: "Fuses community + climate + clinical data" },
  { traditional: "National-level aggregation", greenchild: "Ward-level granularity (500m resolution)" },
  { traditional: "Monthly reporting cycles", greenchild: "Real-time 24-hour processing" },
  { traditional: "Top-down resource allocation", greenchild: "Bottom-up, community-driven intelligence" },
];

export default function InnovationPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Hero */}
        <section className="gc-page-hero">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }} className="gc-page-hero-inner">
            <span className="gc-pill"><span className="gc-badge-dot"></span> Research & Innovation</span>
            <h1 className="gc-page-title">The Science Behind GreenChild</h1>
            <p className="gc-page-desc">
              Fusing community ground-truth with predictive AI to transform how Africa fights climate-driven disease.
            </p>
          </motion.div>
        </section>

        {/* Innovation Pillars */}
        <section className="gc-page-section">
          <div className="gc-page-container">
            <div className="gc-section-header">
              <span className="gc-pill">Core Innovation</span>
              <h2 className="gc-heading">Four Pillars of Intelligence</h2>
              <p className="gc-subtext">Each pillar represents a fundamental shift from reactive to predictive health surveillance.</p>
            </div>

            <div className="gc-pillars-grid">
              {pillars.map((p, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }} className="gc-card gc-pillar-card">
                  <div className="gc-icon-box">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="gc-pillar-stat">
                    <span className="gc-pillar-stat-value">{p.stat}</span>
                    <span className="gc-pillar-stat-label">{p.statLabel}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="gc-page-section gc-bg-warm">
          <div className="gc-page-container">
            <div className="gc-section-header">
              <span className="gc-pill">Paradigm Shift</span>
              <h2 className="gc-heading">Traditional vs. GreenChild</h2>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="gc-comparison-table">
              <div className="gc-comparison-header">
                <span>Traditional Surveillance</span>
                <span>GreenChild Approach</span>
              </div>
              {comparisons.map((c, i) => (
                <div key={i} className="gc-comparison-row">
                  <span className="gc-compare-old">{c.traditional}</span>
                  <span className="gc-compare-new">{c.greenchild}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Quote */}
        <section className="gc-page-section">
          <div className="gc-page-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="gc-quote-card">
              <div className="gc-quote-icon"><Quote size={40} fill="currentColor" stroke="none" /></div>
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
            </motion.div>
          </div>
        </section>

        {/* Model Architecture */}
        <section className="gc-page-section gc-bg-dark">
          <div className="gc-page-container">
            <div className="gc-section-header" style={{ marginBottom: '48px' }}>
              <span className="gc-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Architecture</span>
              <h2 className="gc-heading" style={{ color: '#fff' }}>Model Performance</h2>
            </div>
            <div className="gc-model-stats">
              {[
                { icon: <BarChart3 size={22} />, value: '94%', label: 'Prediction Accuracy', desc: 'Validated against clinical outcomes' },
                { icon: <Cpu size={22} />, value: '<200ms', label: 'Inference Latency', desc: 'TensorFlow Lite edge deployment' },
                { icon: <Layers size={22} />, value: '6', label: 'Data Sources Fused', desc: 'Community, climate, clinical, satellite' },
              ].map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} className="gc-model-stat-card">
                  <div className="gc-impact-stat-icon">{s.icon}</div>
                  <div className="gc-impact-stat-value">{s.value}</div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '4px' }}>{s.label}</div>
                  <div className="gc-impact-stat-sub">{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="gc-page-section">
          <div className="gc-page-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="gc-cta-card">
              <span className="gc-pill">See It In Action</span>
              <h2 className="gc-heading">Ready to Explore the Platform?</h2>
              <p className="gc-subtext" style={{ marginBottom: '32px' }}>Walk through the full GreenChild demo — from a mother submitting a report to a health worker receiving an alert.</p>
              <a href="/demo/mother" className="gc-btn-primary">Try the Demo <ArrowRight size={18} /></a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
