'use client';
import { Mail, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="gc-footer">
      <div className="gc-footer-inner">
        <div className="gc-footer-grid">
          <div className="gc-footer-brand">
            <img src="/logo.png" alt="GreenChild" className="gc-footer-logo" />
            <p className="gc-footer-tagline">
              Community intelligence for the climate age. AI-powered early warning systems protecting every child from malaria.
            </p>
          </div>

          <div className="gc-footer-col">
            <h4>Technology</h4>
            <ul>
              <li><Link to="/how-it-works">Surveillance Loop</Link></li>
              <li><Link to="/innovation">Intelligence Brief</Link></li>
              <li><Link to="/roadmap">Operational Journey</Link></li>
            </ul>
          </div>

          <div className="gc-footer-col">
            <h4>Organization</h4>
            <ul>
              <li><Link to="/impact">Our Impact</Link></li>
              <li><Link to="/roadmap">2030 Roadmap</Link></li>
              <li><a href="#">Technical Brief</a></li>
            </ul>
          </div>

          <div className="gc-footer-col">
            <h4>Contact</h4>
            <ul>
              <li><MapPin size={14} /> Katsina, Nigeria</li>
              <li><Mail size={14} /> contact@greenchild.health</li>
              <li><Globe size={14} /> www.greenchild.health</li>
            </ul>
          </div>
        </div>

        <div className="gc-footer-bottom">
          <p>&copy; 2026 GreenChild Platform. Independent Technology Organization.</p>
          <div className="gc-footer-legal">
            <a href="#">Privacy Policy <ArrowUpRight size={12} /></a>
            <a href="#">Terms of Service <ArrowUpRight size={12} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
