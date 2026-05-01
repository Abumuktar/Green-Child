'use client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ArrowLeft, ArrowRight, AlertTriangle, Activity,
  Users, TrendingUp, TrendingDown, Minus, Bell,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Ward {
  id: string; name: string; lga: string; state: string;
  lat: number; lng: number; risk: number;
  mothers: number; rainfall: number; tempDelta: number;
  childrenAtRisk: number; daysToOutbreak: number | null;
  trend: number[];
}

// ─── Ward data ────────────────────────────────────────────────────────────────
// Coordinates are spread across Katsina & Kano states so markers don't overlap
const BASE_WARDS: Ward[] = [
  { id:'w1',  name:'Tudun Wada',     lga:'Katsina',       state:'Katsina', lat:12.9908, lng:7.6017, risk:87, mothers:142, rainfall:84, tempDelta:2.4, childrenAtRisk:340, daysToOutbreak:3,    trend:[41,47,52,58,61,65,68,72,74,78,80,83,85,87] },
  { id:'w2',  name:'Dala',           lga:'Kano',          state:'Kano',    lat:12.0022, lng:8.5167, risk:79, mothers:118, rainfall:76, tempDelta:2.1, childrenAtRisk:268, daysToOutbreak:6,    trend:[30,36,40,46,51,55,59,62,65,68,71,74,76,79] },
  { id:'w3',  name:'Sabuwar Kofa',   lga:'Daura',         state:'Katsina', lat:13.0383, lng:8.2300, risk:74, mothers:97,  rainfall:79, tempDelta:1.8, childrenAtRisk:214, daysToOutbreak:8,    trend:[28,33,37,42,46,50,54,57,60,64,67,70,72,74] },
  { id:'w4',  name:'Gwale',          lga:'Wudil',         state:'Kano',    lat:11.8044, lng:8.8525, risk:62, mothers:86,  rainfall:71, tempDelta:1.5, childrenAtRisk:178, daysToOutbreak:10,   trend:[18,22,26,30,34,38,42,46,49,52,55,57,60,62] },
  { id:'w5',  name:'Nassarawa',      lga:'Bichi',         state:'Kano',    lat:12.2307, lng:8.1800, risk:51, mothers:74,  rainfall:63, tempDelta:1.1, childrenAtRisk:142, daysToOutbreak:12,   trend:[12,16,19,23,27,30,33,36,39,41,44,47,49,51] },
  { id:'w6',  name:'Magaji Maje',    lga:'Funtua',        state:'Katsina', lat:11.5238, lng:7.3129, risk:44, mothers:61,  rainfall:55, tempDelta:0.8, childrenAtRisk:96,  daysToOutbreak:null, trend:[10,12,15,17,20,22,25,28,31,34,37,39,41,44] },
  { id:'w7',  name:'Kano Municipal', lga:'Rano',          state:'Kano',    lat:11.5501, lng:8.5850, risk:38, mothers:55,  rainfall:49, tempDelta:0.6, childrenAtRisk:76,  daysToOutbreak:null, trend:[8,10,12,14,16,18,21,24,26,28,31,33,35,38] },
  { id:'w8',  name:'Unguwar Sarki',  lga:'Malumfashi',    state:'Katsina', lat:11.7968, lng:7.6268, risk:29, mothers:44,  rainfall:40, tempDelta:0.3, childrenAtRisk:48,  daysToOutbreak:null, trend:[5,7,8,10,12,14,16,18,20,22,24,25,27,29] },
  { id:'w9',  name:'Dutsin-Ma',      lga:'Dutsin-Ma',     state:'Katsina', lat:12.4595, lng:7.5015, risk:21, mothers:38,  rainfall:31, tempDelta:0.1, childrenAtRisk:32,  daysToOutbreak:null, trend:[4,5,6,7,8,9,11,12,14,15,16,17,19,21] },
  { id:'w10', name:'Tarauni',        lga:'Gaya',          state:'Kano',    lat:11.8900, lng:9.0133, risk:14, mothers:28,  rainfall:22, tempDelta:-0.1,childrenAtRisk:18,  daysToOutbreak:null, trend:[2,3,3,4,5,6,7,8,8,9,10,11,12,14] },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function riskColor(r: number) {
  if (r >= 75) return '#ef4444';
  if (r >= 50) return '#f97316';
  if (r >= 30) return '#eab308';
  return '#22c55e';
}
function riskLabel(r: number) {
  if (r >= 75) return 'Danger';
  if (r >= 50) return 'High Risk';
  if (r >= 30) return 'Watch Area';
  return 'All Clear';
}
function riskRadius(r: number) { return 6 + (r / 100) * 13; }
function trendDir(t: number[]): 'up' | 'down' | 'flat' {
  const d = t[t.length - 1] - t[t.length - 4];
  return d > 4 ? 'up' : d < -4 ? 'down' : 'flat';
}

// ─── Leaflet size fix ─────────────────────────────────────────────────────────
function InvalidateSize() {
  const map = useMap();
  useEffect(() => { setTimeout(() => map.invalidateSize(), 80); }, [map]);
  return null;
}

// ─── Custom map node ──────────────────────────────────────────────────────────
function makeIcon(risk: number, selected: boolean): L.DivIcon {
  const color  = riskColor(risk);
  const rad    = Math.round(riskRadius(risk));
  const D      = rad * 2;
  const pulse  = risk >= 50;
  const danger = risk >= 75;
  const cls = ['gcn', pulse && 'gcn-p', danger && 'gcn-d', selected && 'gcn-sel'].filter(Boolean).join(' ');
  return L.divIcon({
    html: `<div class="${cls}" style="--c:${color};width:${D}px;height:${D}px;"></div>`,
    className: '',
    iconSize: [D, D],
    iconAnchor: [rad, rad],
    tooltipAnchor: [0, -rad - 2],
  });
}

// ─── Community info card (below map) ─────────────────────────────────────────
function WardBar({ ward }: { ward: Ward }) {
  const color = riskColor(ward.risk);
  const label = riskLabel(ward.risk);

  return (
    <motion.div
      className="gc-ward-bar"
      key={ward.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
    >
      {/* Risk score circle */}
      <div
        className="gc-ward-bar-score"
        style={{ background: color + '12', borderColor: color + '40' }}
      >
        <span className="gc-ward-bar-score-num" style={{ color }}>{ward.risk}</span>
        <span className="gc-ward-bar-score-sub">/ 100</span>
      </div>

      {/* Name + location + badge */}
      <div className="gc-ward-bar-info">
        <div className="gc-ward-bar-name">{ward.name}</div>
        <div className="gc-ward-bar-loc">{ward.lga} · {ward.state} State</div>
        <span className="gc-ward-bar-badge" style={{ background: color + '15', color }}>{label}</span>
      </div>

      <div className="gc-ward-bar-divider" />

      {/* Key numbers */}
      <div className="gc-ward-bar-stats">
        <div className="gc-ward-bar-stat">
          <span className="gc-ward-bar-val" style={{ color: ward.childrenAtRisk > 100 ? '#ef4444' : color }}>
            {ward.childrenAtRisk}
          </span>
          <span className="gc-ward-bar-key">Children who<br/>need protection</span>
        </div>
        {ward.daysToOutbreak !== null && (
          <div className="gc-ward-bar-stat">
            <span className="gc-ward-bar-val" style={{ color }}>{ward.daysToOutbreak} days</span>
            <span className="gc-ward-bar-key">Until possible<br/>outbreak</span>
          </div>
        )}
        <div className="gc-ward-bar-stat">
          <span className="gc-ward-bar-val">{ward.mothers}</span>
          <span className="gc-ward-bar-key">Mothers reporting<br/>symptoms</span>
        </div>
      </div>

      <Link to="/demo/alerts" className="gc-btn-primary gc-ward-bar-btn">
        <Bell size={13} /> Alert Health Workers
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [wards, setWards]           = useState<Ward[]>(BASE_WARDS);
  const [selectedId, setSelectedId] = useState<string>('w1');
  const [reports, setReports]       = useState(2847);

  const selected = wards.find(w => w.id === selectedId) ?? wards[0];

  useEffect(() => {
    const iv = setInterval(() => {
      setReports(r => r + Math.floor(Math.random() * 4) + 1);
      setWards(prev => {
        const next = [...prev];
        const idx  = Math.floor(Math.random() * next.length);
        const nr   = Math.min(99, Math.max(2, next[idx].risk + (Math.random() > 0.45 ? 1 : -1)));
        next[idx]  = { ...next[idx], risk: nr, trend: [...next[idx].trend.slice(1), nr] };
        return next;
      });
    }, 6000);
    return () => clearInterval(iv);
  }, []);

  const sorted        = [...wards].sort((a, b) => b.risk - a.risk);
  const dangerCount   = wards.filter(w => w.risk >= 75).length;
  const watchCount    = wards.filter(w => w.risk >= 50 && w.risk < 75).length;
  const totalChildren = wards.reduce((s, w) => s + w.childrenAtRisk, 0);

  return (
    <div className="gc-dash-wrap">

      {/* ── Topbar ── */}
      <header className="gc-dash-topbar">
        <div className="gc-dash-topbar-left">
          <Link to="/demo/mother" className="gc-dash-back">
            <ArrowLeft size={14} /> Back
          </Link>
          <div className="gc-dash-brand">
            <img src="/logo.png" alt="GreenChild" className="gc-dash-logo" />
            <div>
              <div className="gc-dash-title">Community Health Dashboard</div>
              <div className="gc-dash-subtitle">Katsina &amp; Kano · Watching for malaria outbreaks</div>
            </div>
          </div>
        </div>
        <div className="gc-dash-topbar-right">
          <div className="gc-dash-live-badge">
            <span className="gc-dash-live-dot" /> LIVE
          </div>
          <div className="gc-dash-reports">
            <span className="gc-dash-reports-num">{reports.toLocaleString()}</span>
            <span className="gc-dash-reports-label">mother reports received</span>
          </div>
          <Link to="/demo/alerts" className="gc-btn-primary gc-dash-alerts-btn">
            View Alerts <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="gc-dash-body">

        {/* ── KPI cards ── */}
        <div className="gc-dash-kpis">
          <div className="gc-dash-kpi">
            <div className="gc-dash-kpi-icon" style={{ background:'#fef2f2' }}>
              <AlertTriangle size={20} color="#ef4444" />
            </div>
            <div className="gc-dash-kpi-text">
              <div className="gc-dash-kpi-num" style={{ color:'#ef4444' }}>{dangerCount}</div>
              <div className="gc-dash-kpi-label">Danger areas — act now</div>
            </div>
          </div>
          <div className="gc-dash-kpi">
            <div className="gc-dash-kpi-icon" style={{ background:'#fff7ed' }}>
              <Activity size={20} color="#f97316" />
            </div>
            <div className="gc-dash-kpi-text">
              <div className="gc-dash-kpi-num" style={{ color:'#f97316' }}>{watchCount}</div>
              <div className="gc-dash-kpi-label">High risk — watch closely</div>
            </div>
          </div>
          <div className="gc-dash-kpi">
            <div className="gc-dash-kpi-icon" style={{ background:'#f0fdf4' }}>
              <Users size={20} color="#006838" />
            </div>
            <div className="gc-dash-kpi-text">
              <div className="gc-dash-kpi-num" style={{ color:'#006838' }}>{totalChildren.toLocaleString()}</div>
              <div className="gc-dash-kpi-label">Children who need protection</div>
            </div>
          </div>
          <div className="gc-dash-kpi">
            <div className="gc-dash-kpi-icon" style={{ background:'#f0fdf4' }}>
              <TrendingUp size={20} color="#006838" />
            </div>
            <div className="gc-dash-kpi-text">
              <div className="gc-dash-kpi-num" style={{ color:'#014431' }}>{wards.length}</div>
              <div className="gc-dash-kpi-label">Communities being watched</div>
            </div>
          </div>
        </div>

        {/* ── Map card ── */}
        <div className="gc-dash-map-card">
          <div className="gc-dash-map-label">
            <span className="gc-dash-map-title">Community Risk Map</span>
            <span className="gc-dash-map-hint">Tap any circle to learn about that community · Larger circle = higher risk</span>
          </div>
          <div className="gc-dash-map-wrap">
            <MapContainer
              center={[12.28, 8.05]}
              zoom={8}
              style={{ width:'100%', height:'100%' }}
              scrollWheelZoom={false}
              zoomControl
            >
              <InvalidateSize />
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              />
              {wards.map(w => (
                <Marker
                  key={w.id}
                  position={[w.lat, w.lng]}
                  icon={makeIcon(w.risk, w.id === selectedId)}
                  zIndexOffset={w.id === selectedId ? 500 : 0}
                  eventHandlers={{ click: () => setSelectedId(w.id) }}
                >
                  <Tooltip direction="top" offset={[0, -4]} opacity={0.97}>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'0.76rem', lineHeight:1.6 }}>
                      <strong>{w.name}</strong> — {riskLabel(w.risk)}<br />
                      {w.childrenAtRisk} children need protection
                    </div>
                  </Tooltip>
                </Marker>
              ))}
            </MapContainer>

            <div className="gc-map-legend">
              <div className="gc-map-legend-title">Colour guide</div>
              {([
                ['#ef4444', 'Danger — act now'],
                ['#f97316', 'High risk — watch closely'],
                ['#eab308', 'Some risk — keep watching'],
                ['#22c55e', 'Low risk — all clear'],
              ] as [string, string][]).map(([c, l]) => (
                <div key={l} className="gc-map-legend-row">
                  <span className="gc-map-legend-dot" style={{ background: c }} />
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Community info bar (selected) ── */}
        <AnimatePresence mode="wait">
          <WardBar key={selectedId} ward={selected} />
        </AnimatePresence>

        {/* ── Community table ── */}
        <div className="gc-dash-table-card">
          <div className="gc-dash-table-header">
            <span className="gc-dash-table-title">All Communities — Sorted by Risk</span>
            <span className="gc-dash-table-hint">Click a row to highlight it on the map</span>
          </div>
          <div className="gc-dash-table">
            <div className="gc-dash-th-row">
              <span>Community</span>
              <span>Location</span>
              <span>Risk Level</span>
              <span>Children at Risk</span>
              <span>Getting Worse?</span>
            </div>
            {sorted.map((w, i) => {
              const dir = trendDir(w.trend);
              const col = riskColor(w.risk);
              return (
                <div
                  key={w.id}
                  className={`gc-dash-tr${w.id === selectedId ? ' gc-dash-tr-active' : ''}`}
                  onClick={() => setSelectedId(w.id)}
                >
                  <span className="gc-dash-td-rank">
                    <span className="gc-dash-rank-num">{i + 1}</span>
                    <span className="gc-dash-ward-name">{w.name}</span>
                  </span>
                  <span className="gc-dash-td-lga">{w.lga} · {w.state}</span>
                  <span className="gc-dash-td-risk">
                    <span className="gc-dash-risk-badge" style={{ background: col+'1a', color: col }}>{w.risk}</span>
                    <span className="gc-dash-risk-label" style={{ color: col }}>{riskLabel(w.risk)}</span>
                  </span>
                  <span className="gc-dash-td" style={{ fontWeight: 600, color: w.childrenAtRisk > 100 ? '#ef4444' : 'inherit' }}>
                    {w.childrenAtRisk.toLocaleString()}
                  </span>
                  <span className="gc-dash-td">
                    {dir === 'up'   && <span className="gc-dash-trend gc-dash-trend-up"><TrendingUp size={13} /> Yes</span>}
                    {dir === 'down' && <span className="gc-dash-trend gc-dash-trend-dn"><TrendingDown size={13} /> Improving</span>}
                    {dir === 'flat' && <span className="gc-dash-trend gc-dash-trend-fl"><Minus size={13} /> Stable</span>}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
