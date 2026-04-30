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
            <h4>Platform</h4>
            <ul>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/innovation">Our AI Engine</Link></li>
              <li><Link to="/roadmap">Roadmap</Link></li>
            </ul>
          </div>

          <div className="gc-footer-col">
            <h4>Demo</h4>
            <ul>
              <li><Link to="/demo/mother">Mother Report</Link></li>
              <li><Link to="/demo/dashboard">Risk Dashboard</Link></li>
              <li><Link to="/demo/alerts">Health Worker Alerts</Link></li>
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
