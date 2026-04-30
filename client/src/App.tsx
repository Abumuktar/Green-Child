import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import DashboardPreview from './components/DashboardPreview';
import Innovation from './components/Innovation';
import ImpactSection from './components/ImpactSection';
import Roadmap from './components/Roadmap';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

import HowItWorksPage from './pages/HowItWorksPage';
import InnovationPage from './pages/InnovationPage';
import ImpactPage from './pages/ImpactPage';
import RoadmapPage from './pages/RoadmapPage';
import MotherReportPage from './pages/MotherReportPage';
import DashboardPage from './pages/DashboardPage';
import AlertsPage from './pages/AlertsPage';

function HomePage() {
  return (
    <>
      <Navbar />
      <article>
        {/* الحمد لله - Design Transformation Complete */}
        <Hero />
        <Stats />
        <HowItWorks />
        <DashboardPreview />
        <Innovation />
        <ImpactSection />
        <Roadmap />
        <CallToAction />
      </article>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className="app-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/innovation" element={<InnovationPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/demo/mother" element={<MotherReportPage />} />
          <Route path="/demo/dashboard" element={<DashboardPage />} />
          <Route path="/demo/alerts" element={<AlertsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
