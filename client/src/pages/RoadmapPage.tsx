import { motion } from 'framer-motion';
import { Rocket, Globe2, Cpu, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const phases = [
  {
    year: "2026",
    title: "Product Development",
    status: "Current",
    icon: <Rocket size={24} />,
    summary: "Building and validating the core surveillance platform",
    milestones: [
      "USSD/SMS signal collection pipeline built",
      "AI prediction engine prototype completed",
      "Ward-level risk scoring model trained",
      "Dashboard and monitoring interface designed"
    ]
  },
  {
    year: "2027",
    title: "Pilot Launch",
    status: "Planned",
    icon: <Globe2 size={24} />,
    summary: "First deployment across Katsina State LGAs",
    milestones: [
      "Partnership with Katsina State Ministry of Health",
      "34 LGA activation with USSD surveillance",
      "10,000 community mothers onboarded",
      "First live 14-day outbreak prediction"
    ]
  },
  {
    year: "2028",
    title: "Regional Expansion",
    status: "Planned",
    icon: <Cpu size={24} />,
    summary: "Scaling to neighboring states with validated model",
    milestones: [
      "Expansion to Kano and Jigawa states",
      "Integration with National Malaria Elimination Programme",
      "Satellite imagery fusion (Sentinel-2)",
      "50,000 mothers target enrollment"
    ]
  },
  {
    year: "2030",
    title: "Continental Scale",
    status: "Vision",
    icon: <Users size={24} />,
    summary: "Multi-country deployment across West Africa",
    milestones: [
      "18 country deployment roadmap",
      "Multi-language USSD support",
      "WHO partnership for standardized protocols",
      "1M+ mothers in the surveillance network"
    ]
  }
];

export default function RoadmapPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Hero */}
        <section className="gc-page-hero">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }} className="gc-page-hero-inner">
            <span className="gc-pill"><span className="gc-badge-dot"></span> Operational Journey</span>
            <h1 className="gc-page-title">The Road to Zero Malaria</h1>
            <p className="gc-page-desc">
              From a working product to continental health infrastructure — a phased approach to scaling community intelligence across Africa.
            </p>
          </motion.div>
        </section>

        {/* Timeline */}
        <section className="gc-page-section">
          <div className="gc-page-container">
            <div className="gc-timeline">
              {phases.map((phase, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="gc-timeline-item"
                >
                  <div className="gc-timeline-marker">
                    <div className={`gc-timeline-dot ${phase.status.toLowerCase()}`}></div>
                    {i < phases.length - 1 && <div className="gc-timeline-line"></div>}
                  </div>
                  <div className="gc-card gc-timeline-card">
                    <div className="gc-timeline-top">
                      <div className="gc-icon-box">{phase.icon}</div>
                      <div>
                        <div className="gc-phase-year">{phase.year}</div>
                        <div className={`gc-phase-status ${phase.status.toLowerCase()}`}>{phase.status}</div>
                      </div>
                    </div>
                    <h3>{phase.title}</h3>
                    <p className="gc-timeline-summary">{phase.summary}</p>
                    <ul className="gc-timeline-milestones">
                      {phase.milestones.map((m, j) => (
                        <li key={j}><CheckCircle2 size={15} /> {m}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision CTA */}
        <section className="gc-page-section gc-bg-dark">
          <div className="gc-page-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="gc-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Vision 2030</span>
              <h2 className="gc-heading" style={{ color: '#fff' }}>Join Our Journey</h2>
              <p className="gc-subtext" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>We have a working product ready for pilot deployment. Be part of the launch.</p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="mailto:pilot@greenchild.health" className="gc-btn-primary">Partner With Us <ArrowRight size={18} /></a>
                <a href="/" className="gc-btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff', background: 'transparent' }}>Back to Home</a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
