'use client';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <nav className={`gc-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="gc-nav-inner">
        <Link to="/" className="flex items-center gap-4">
          <img src="/logo.png" alt="GreenChild Logo" className="gc-nav-logo" />
        </Link>

        {/* Desktop Links */}
        <div className="gc-nav-links">
          <Link to="/" className="gc-nav-link">Home</Link>
          <Link to="/how-it-works" className="gc-nav-link">How It Works</Link>
          <Link to="/innovation" className="gc-nav-link">Our AI</Link>
          <Link to="/impact" className="gc-nav-link">Impact</Link>
          <Link to="/roadmap" className="gc-nav-link">Roadmap</Link>
          <Link to="/demo/mother" className="gc-btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            Try Demo <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="gc-nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="gc-mobile-menu">
          <Link to="/" className="gc-mobile-link">Home</Link>
          <Link to="/how-it-works" className="gc-mobile-link">How It Works</Link>
          <Link to="/innovation" className="gc-mobile-link">Our AI</Link>
          <Link to="/impact" className="gc-mobile-link">Impact</Link>
          <Link to="/roadmap" className="gc-mobile-link">Roadmap</Link>
          <Link to="/demo/mother" className="gc-mobile-cta">
            Try Demo <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </nav>
  );
}
