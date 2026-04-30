import { motion } from 'framer-motion';
import { MessageSquare, Cpu, Bell, Activity, ArrowRight, CheckCircle2, Smartphone, Cloud, Radio } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const steps = [
  {
    icon: <MessageSquare size={28} />,
    title: "Signal Collection",
    desc: "Community mothers report health indicators through simple SMS/USSD codes—no internet required.",
    details: [
      "Works on any basic phone",
      "Structured symptom reporting via USSD menus",
      "Geolocation tagging per ward",
      "Real-time data ingestion pipeline"
    ]
  },
  {
    icon: <Cpu size={28} />,
    title: "AI Analysis",
    desc: "Our prediction engine fuses community signals with satellite climate data to forecast outbreak probability.",
    details: [
      "Multi-variable regression models",
      "Satellite rainfall & humidity data fusion",
      "Ward-level granularity scoring",
      "14-day advance outbreak prediction"
    ]
  },
  {
    icon: <Bell size={28} />,
    title: "Early Warning",
    desc: "Automated alerts are dispatched to local health workers and LGA coordinators before outbreaks peak.",
    details: [
      "SMS & WhatsApp alert channels",
      "Tiered severity classification",
      "Resource deployment recommendations",
      "Escalation protocols for critical zones"
    ]
  },
  {
    icon: <Activity size={28} />,
    title: "Impact Loop",
    desc: "Continuous feedback between communities and coordinators validates predictions and improves accuracy.",
    details: [
      "Post-intervention outcome tracking",
      "Model retraining with ground-truth data",
      "Monthly accuracy benchmarking",
      "Community trust score metrics"
    ]
  }
];

const techStack = [
  { icon: <Smartphone size={22} />, title: "USSD Gateway", desc: "Africa's Talking API for zero-data signal collection" },
  { icon: <Cloud size={22} />, title: "Cloud Pipeline", desc: "Serverless data processing on AWS Lambda" },
  { icon: <Cpu size={22} />, title: "ML Engine", desc: "TensorFlow Lite models optimized for low-latency inference" },
  { icon: <Radio size={22} />, title: "Alert System", desc: "Multi-channel dispatch via Twilio and WhatsApp Business API" },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Hero */}
        <section className="gc-page-hero">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }} className="gc-page-hero-inner">
            <span className="gc-pill"><span className="gc-badge-dot"></span> Technical Overview</span>
            <h1 className="gc-page-title">How GreenChild Works</h1>
            <p className="gc-page-desc">
              A closed-loop surveillance system that bridges rural communities and clinical response through automated intelligence and community trust.
            </p>
          </motion.div>
        </section>

        {/* Detailed Steps */}
        <section className="gc-page-section">
          <div className="gc-page-container">
            <div className="gc-section-header">
              <span className="gc-pill">The Process</span>
              <h2 className="gc-heading">Four Stages of Protection</h2>
              <p className="gc-subtext">Each stage builds on the previous, creating an unbroken chain from community signal to clinical action.</p>
            </div>

            <div className="gc-steps-detailed">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`gc-step-row ${i % 2 === 1 ? 'reverse' : ''}`}
                >
                  <div className="gc-step-visual">
                    <div className="gc-step-number">{String(i + 1).padStart(2, '0')}</div>
                    <div className="gc-step-icon-lg">{step.icon}</div>
                  </div>
                  <div className="gc-step-content">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                    <ul className="gc-step-details">
                      {step.details.map((d, j) => (
                        <li key={j}><CheckCircle2 size={16} /> {d}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="gc-page-section gc-bg-warm">
          <div className="gc-page-container">
            <div className="gc-section-header">
              <span className="gc-pill">Infrastructure</span>
              <h2 className="gc-heading">Technology Stack</h2>
            </div>
            <div className="gc-tech-grid">
              {techStack.map((t, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }} className="gc-card gc-tech-card">
                  <div className="gc-icon-box">{t.icon}</div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="gc-page-section">
          <div className="gc-page-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="gc-cta-card">
              <span className="gc-pill">Get Involved</span>
              <h2 className="gc-heading">Want to Integrate With Our Pipeline?</h2>
              <p className="gc-subtext" style={{ marginBottom: '32px' }}>We welcome health ministries, NGOs, and technology partners to join our surveillance network.</p>
              <a href="mailto:pilot@greenchild.health" className="gc-btn-primary">Request Technical Brief <ArrowRight size={18} /></a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
