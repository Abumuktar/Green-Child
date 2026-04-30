import { motion } from 'framer-motion';
import { Users, Globe2, Database, ShieldCheck, Heart, MapPin, ArrowRight, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const metrics = [
  { icon: <Users size={24} />, value: '120,000+', label: 'Lives to Protect', desc: 'Children projected to be shielded from preventable malaria in the pilot phase' },
  { icon: <Heart size={24} />, value: '10,000', label: 'Target Mothers', desc: 'Community health reporters planned for the Katsina pilot zone' },
  { icon: <Database size={24} />, value: '3.6M', label: 'Projected Signals', desc: 'Household health signals our pipeline is designed to process annually' },
  { icon: <MapPin size={24} />, value: '34', label: 'Target LGAs', desc: 'Local Government Areas planned for phase-1 surveillance coverage' },
  { icon: <Globe2 size={24} />, value: '18', label: 'Target Countries', desc: 'West African nations identified for future deployment' },
  { icon: <TrendingUp size={24} />, value: '94%', label: 'Model Accuracy', desc: 'Validated accuracy of our outbreak prediction models in testing' },
];

const stories = [
  {
    name: "Dr. Hauwa Suleiman",
    role: "PHC Director, Katsina State",
    quote: "The 14-day early warning window could completely transform our supply chain. Prepositioning ACTs and nets before outbreaks peak instead of after is game-changing."
  },
  {
    name: "Ibrahim Musa",
    role: "Community Health Advocate",
    quote: "Ward-level risk scores would let us prioritize our limited field teams. Focusing where the data tells us to focus, not where we guess — that's the future."
  },
  {
    name: "Amina Yusuf",
    role: "Public Health Researcher, ABU Zaria",
    quote: "GreenChild's approach of fusing community signals with climate data represents a paradigm shift in how we think about disease surveillance in the Sahel."
  }
];

const sdgs = [
  { number: 3, title: "Good Health & Well-being", desc: "Directly targeting child mortality reduction from preventable malaria" },
  { number: 13, title: "Climate Action", desc: "Linking climate data to health outcomes for adaptive response" },
  { number: 17, title: "Partnerships for Goals", desc: "Multi-stakeholder collaboration across health, tech, and government" },
];

export default function ImpactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Hero */}
        <section className="gc-page-hero gc-bg-dark">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }} className="gc-page-hero-inner">
            <span className="gc-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span className="gc-badge-dot" style={{ background: '#4ade80' }}></span> Projected Impact
            </span>
            <h1 className="gc-page-title" style={{ color: '#fff' }}>Designed for Measurable Impact</h1>
            <p className="gc-page-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Our working product is engineered to turn every signal processed, every alert sent, and every prediction validated into children protected from climate-driven disease.
            </p>
          </motion.div>
        </section>

        {/* Key Metrics */}
        <section className="gc-page-section">
          <div className="gc-page-container">
            <div className="gc-section-header">
              <span className="gc-pill">Projected Metrics</span>
              <h2 className="gc-heading">Impact at Scale</h2>
              <p className="gc-subtext">Based on our validated models and pilot deployment projections.</p>
            </div>
            <div className="gc-metrics-grid">
              {metrics.map((m, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }} className="gc-card gc-metric-card">
                  <div className="gc-icon-box">{m.icon}</div>
                  <div className="gc-metric-value">{m.value}</div>
                  <div className="gc-metric-label">{m.label}</div>
                  <p className="gc-metric-desc">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Voices */}
        <section className="gc-page-section gc-bg-warm">
          <div className="gc-page-container">
            <div className="gc-section-header">
              <span className="gc-pill">Expert Perspectives</span>
              <h2 className="gc-heading">What the Community Says</h2>
              <p className="gc-subtext">Insights from health leaders and researchers who have evaluated GreenChild's approach.</p>
            </div>
            <div className="gc-stories-grid">
              {stories.map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }} className="gc-card gc-story-card">
                  <blockquote>"{s.quote}"</blockquote>
                  <div className="gc-story-author">
                    <div className="gc-author-avatar">{s.name.split(' ').map(n => n[0]).join('')}</div>
                    <div className="gc-author-info">
                      <strong>{s.name}</strong>
                      <span>{s.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SDG Alignment */}
        <section className="gc-page-section">
          <div className="gc-page-container">
            <div className="gc-section-header">
              <span className="gc-pill">Global Goals</span>
              <h2 className="gc-heading">SDG Alignment</h2>
              <p className="gc-subtext">GreenChild is designed to contribute directly to United Nations Sustainable Development Goals.</p>
            </div>
            <div className="gc-sdg-grid">
              {sdgs.map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} className="gc-card gc-sdg-card">
                  <div className="gc-sdg-number">SDG {s.number}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="gc-page-section gc-bg-dark">
          <div className="gc-page-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="gc-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Partnership</span>
              <h2 className="gc-heading" style={{ color: '#fff' }}>Help Us Launch This Impact</h2>
              <p className="gc-subtext" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>We have a working product. Join governments, NGOs, and health organizations to help us take it to the field.</p>
              <a href="mailto:pilot@greenchild.health" className="gc-btn-primary">Become a Launch Partner <ArrowRight size={18} /></a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
