'use client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, AlertTriangle, CheckCircle2, Clock,
  MapPin, Users, X, Bell, CheckCheck, ShieldCheck,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
type Status = 'new' | 'acknowledged' | 'responded';
interface Action { id: string; text: string; done: boolean; }
interface Alert {
  id: string;
  community: string; lga: string; state: string;
  risk: number; childrenAtRisk: number;
  daysToOutbreak: number | null;
  receivedAt: string;
  status: Status;
  actions: Action[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function riskColor(r: number) {
  if (r >= 75) return '#ef4444';
  if (r >= 50) return '#f97316';
  if (r >= 30) return '#eab308';
  return '#22c55e';
}
function riskLabel(r: number) {
  if (r >= 75) return 'Danger — act now';
  if (r >= 50) return 'High risk';
  if (r >= 30) return 'Watch area';
  return 'All clear';
}

// ─── Action lists ─────────────────────────────────────────────────────────────
const CRITICAL_ACTIONS = [
  'Visit this community today — do not delay',
  'Distribute mosquito nets to every household',
  'Report the situation to the State Health Authority',
  'Arrange emergency medication for children under 5',
  'Set up a community health screening point',
];
const HIGH_ACTIONS = [
  'Visit the community within 48 hours',
  'Check that households are using their mosquito nets',
  'Teach mothers how to spot early signs of malaria',
  'Confirm medical supply stock is ready',
];
const WATCH_ACTIONS = [
  'Review weekly reports closely',
  'Remind families to use mosquito nets every night',
  'Check for standing water sources near homes',
];
function makeActions(risk: number, prefix: string, allDone = false): Action[] {
  const src = risk >= 75 ? CRITICAL_ACTIONS : risk >= 50 ? HIGH_ACTIONS : WATCH_ACTIONS;
  return src.map((text, i) => ({ id: `${prefix}-${i}`, text, done: allDone }));
}

// ─── Seed data ────────────────────────────────────────────────────────────────
const SEED: Alert[] = [
  { id:'a1', community:'Tudun Wada',   lga:'Katsina',  state:'Katsina', risk:87, childrenAtRisk:340, daysToOutbreak:3,  receivedAt:'Today, 9:14 AM',    status:'new',          actions:makeActions(87,'a1') },
  { id:'a2', community:'Dala',         lga:'Dala',      state:'Kano',    risk:79, childrenAtRisk:268, daysToOutbreak:6,  receivedAt:'Today, 9:14 AM',    status:'acknowledged', actions:makeActions(79,'a2').map((a,i)=>({...a,done:i<2})) },
  { id:'a3', community:'Sabuwar Kofa', lga:'Katsina',  state:'Katsina', risk:74, childrenAtRisk:214, daysToOutbreak:8,  receivedAt:'Yesterday, 6:45 PM',status:'responded',    actions:makeActions(74,'a3',true) },
  { id:'a4', community:'Gwale',        lga:'Gwale',     state:'Kano',    risk:62, childrenAtRisk:178, daysToOutbreak:10, receivedAt:'Today, 9:14 AM',    status:'new',          actions:makeActions(62,'a4') },
  { id:'a5', community:'Nassarawa',    lga:'Nassarawa', state:'Kano',    risk:51, childrenAtRisk:142, daysToOutbreak:12, receivedAt:'Today, 9:14 AM',    status:'new',          actions:makeActions(51,'a5') },
];

const STATUS_CFG = {
  new:          { label:'New',         bg:'#fef2f2', color:'#ef4444', dot:'#ef4444' },
  acknowledged: { label:'In Progress', bg:'#fffbeb', color:'#d97706', dot:'#f59e0b' },
  responded:    { label:'Resolved',    bg:'#f0fdf4', color:'#15803d', dot:'#22c55e' },
};

// ─── Compact list card ────────────────────────────────────────────────────────
function AlertCard({ alert, onClick }: { alert: Alert; onClick: () => void }) {
  const color = riskColor(alert.risk);
  const scfg  = STATUS_CFG[alert.status];

  return (
    <motion.div
      className="gc-alert-card"
      style={{ borderLeftColor: color }}
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      whileHover={{ backgroundColor: '#f9fafb' }}
    >
      <div className="gc-alert-card-main">
        <div className="gc-alert-card-left">
          <div className="gc-alert-community">{alert.community}</div>
          <div className="gc-alert-loc"><MapPin size={11} /> {alert.lga} · {alert.state} State</div>
        </div>
        <div className="gc-alert-card-right">
          <span className="gc-alert-risk-pill" style={{ background: color + '15', color }}>
            {riskLabel(alert.risk)}
          </span>
          <span className="gc-alert-status-chip" style={{ background: scfg.bg, color: scfg.color }}>
            <span className="gc-alert-status-dot" style={{ background: scfg.dot }} />
            {scfg.label}
          </span>
        </div>
      </div>
      <div className="gc-alert-card-stats">
        <span className="gc-alert-card-stat"><Users size={11} /> {alert.childrenAtRisk} children at risk</span>
        {alert.daysToOutbreak !== null && (
          <span className="gc-alert-card-stat" style={{ color, fontWeight: 600 }}>
            <AlertTriangle size={11} /> Outbreak in {alert.daysToOutbreak} days
          </span>
        )}
        <span className="gc-alert-card-stat gc-alert-card-time"><Clock size={11} /> {alert.receivedAt}</span>
      </div>
    </motion.div>
  );
}

// ─── Detail modal ─────────────────────────────────────────────────────────────
function AlertModal({ alert, onClose, onStatusChange, onActionToggle }: {
  alert: Alert;
  onClose: () => void;
  onStatusChange: (id: string, s: Status) => void;
  onActionToggle: (alertId: string, actionId: string) => void;
}) {
  const color = riskColor(alert.risk);
  const scfg  = STATUS_CFG[alert.status];

  return (
    <motion.div
      className="gc-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        className="gc-modal"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="gc-modal-header" style={{ borderLeftColor: color }}>
          <div>
            <div className="gc-modal-title">{alert.community}</div>
            <div className="gc-modal-sub"><MapPin size={11} /> {alert.lga} · {alert.state} State</div>
          </div>
          <button className="gc-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Key numbers */}
        <div className="gc-modal-meta">
          <span className="gc-alert-risk-pill" style={{ background: color + '15', color }}>
            {riskLabel(alert.risk)} · {alert.risk}/100
          </span>
          <span className="gc-modal-stat"><Users size={12} /> {alert.childrenAtRisk} children at risk</span>
          {alert.daysToOutbreak !== null && (
            <span className="gc-modal-stat" style={{ color, fontWeight: 600 }}>
              <AlertTriangle size={12} /> Outbreak in {alert.daysToOutbreak} days
            </span>
          )}
          <span className="gc-alert-status-chip" style={{ background: scfg.bg, color: scfg.color }}>
            <span className="gc-alert-status-dot" style={{ background: scfg.dot }} />
            {scfg.label}
          </span>
        </div>

        <div className="gc-modal-divider" />

        {/* Checklist */}
        <div className="gc-modal-body">
          <div className="gc-modal-section-label">What to do</div>
          <div className="gc-alert-actions">
            {alert.actions.map(action => (
              <label
                key={action.id}
                className={`gc-alert-action${action.done ? ' gc-alert-action-done' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={action.done}
                  onChange={() => onActionToggle(alert.id, action.id)}
                  className="gc-alert-checkbox"
                />
                <span
                  className="gc-alert-action-box"
                  style={{
                    borderColor: action.done ? color : undefined,
                    background:  action.done ? color : undefined,
                  }}
                >
                  {action.done && <CheckCheck size={10} color="#fff" />}
                </span>
                <span className="gc-alert-action-text">{action.text}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="gc-modal-footer">
          {alert.status === 'new' && (
            <button
              className="gc-btn-primary gc-modal-cta"
              onClick={() => onStatusChange(alert.id, 'acknowledged')}
            >
              <Bell size={14} /> I'm On It
            </button>
          )}
          {alert.status === 'acknowledged' && (
            <button
              className="gc-btn-primary gc-modal-cta"
              style={{ background: 'linear-gradient(135deg,#d97706,#b45309)' }}
              onClick={() => onStatusChange(alert.id, 'responded')}
            >
              <ShieldCheck size={14} /> Mark as Done
            </button>
          )}
          {alert.status === 'responded' && (
            <div className="gc-alert-resolved">
              <CheckCircle2 size={16} color="#22c55e" />
              <span>All done — this community is protected</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AlertsPage() {
  const [alerts, setAlerts]       = useState<Alert[]>(SEED);
  const [activeId, setActiveId]   = useState<string | null>(null);

  const activeAlert    = alerts.find(a => a.id === activeId) ?? null;
  const newCount       = alerts.filter(a => a.status === 'new').length;
  const urgentCount    = alerts.filter(a => a.status === 'new' && a.risk >= 75).length;
  const respondedCount = alerts.filter(a => a.status === 'responded').length;

  const changeStatus = (id: string, next: Status) => {
    setAlerts(prev => prev.map(a => {
      if (a.id !== id) return a;
      return {
        ...a, status: next,
        actions: next === 'new' ? a.actions.map(x => ({ ...x, done: false })) : a.actions,
      };
    }));
  };

  const toggleAction = (alertId: string, actionId: string) => {
    setAlerts(prev => prev.map(a => {
      if (a.id !== alertId) return a;
      return { ...a, actions: a.actions.map(x => x.id === actionId ? { ...x, done: !x.done } : x) };
    }));
  };

  return (
    <div className="gc-alerts-wrap">

      {/* ── Topbar ── */}
      <header className="gc-alerts-topbar">
        <div className="gc-alerts-topbar-left">
          <Link to="/demo/dashboard" className="gc-dash-back">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="gc-dash-brand">
            <img src="/logo.png" alt="GreenChild" className="gc-dash-logo" />
            <div>
              <div className="gc-dash-title">Health Worker Alerts</div>
              <div className="gc-dash-subtitle">Katsina &amp; Kano · Your communities</div>
            </div>
          </div>
        </div>
        <div className="gc-alerts-topbar-right">
          {newCount > 0 && (
            <div className="gc-alerts-badge">
              <Bell size={13} /> {newCount} new {newCount === 1 ? 'alert' : 'alerts'}
            </div>
          )}
          <div className="gc-alerts-step">Screen 3 of 3</div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="gc-alerts-body">

        {/* Summary stat cards */}
        <div className="gc-alerts-summary">
          <div className="gc-alerts-sum-card" style={{ borderLeftColor:'#ef4444' }}>
            <div className="gc-alerts-sum-icon" style={{ background:'#fef2f2' }}><AlertTriangle size={18} color="#ef4444" /></div>
            <div><div className="gc-alerts-sum-num" style={{ color:'#ef4444' }}>{urgentCount}</div><div className="gc-alerts-sum-label">Need urgent action</div></div>
          </div>
          <div className="gc-alerts-sum-card" style={{ borderLeftColor:'#f97316' }}>
            <div className="gc-alerts-sum-icon" style={{ background:'#fff7ed' }}><Bell size={18} color="#f97316" /></div>
            <div><div className="gc-alerts-sum-num" style={{ color:'#f97316' }}>{newCount}</div><div className="gc-alerts-sum-label">Waiting for response</div></div>
          </div>
          <div className="gc-alerts-sum-card" style={{ borderLeftColor:'#22c55e' }}>
            <div className="gc-alerts-sum-icon" style={{ background:'#f0fdf4' }}><CheckCircle2 size={18} color="#22c55e" /></div>
            <div><div className="gc-alerts-sum-num" style={{ color:'#22c55e' }}>{respondedCount}</div><div className="gc-alerts-sum-label">Resolved today</div></div>
          </div>
          <div className="gc-alerts-sum-card" style={{ borderLeftColor:'#6b7280' }}>
            <div className="gc-alerts-sum-icon" style={{ background:'#f9fafb' }}><Users size={18} color="#6b7280" /></div>
            <div><div className="gc-alerts-sum-num">{alerts.length}</div><div className="gc-alerts-sum-label">Total alerts today</div></div>
          </div>
        </div>

        {/* Alert list */}
        <div className="gc-alerts-list-wrap">
          <div className="gc-alerts-list-header">
            <span className="gc-alerts-list-title">Alerts — Highest Risk First</span>
            <span className="gc-alerts-list-hint">Tap an alert to see what to do</span>
          </div>
          <div className="gc-alerts-list">
            {alerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onClick={() => setActiveId(alert.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="gc-alerts-explainer">
          <ShieldCheck size={18} color="#006838" />
          <p>
            Alerts are generated automatically by GreenChild's AI, using symptom reports from mothers and NASA climate data.
            Health workers receive warnings up to <strong>14 days before</strong> an outbreak — enough time to act.
          </p>
        </div>

      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {activeAlert && (
          <AlertModal
            alert={activeAlert}
            onClose={() => setActiveId(null)}
            onStatusChange={changeStatus}
            onActionToggle={toggleAction}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
