import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, CheckCircle2, ArrowRight, Signal, Wifi, Battery, RefreshCw, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

// ─── data ─────────────────────────────────────────────────────────────────────

type Symptom = { id: string; label: string; hausa: string; emoji: string };

const SYMPTOMS: Symptom[] = [
  { id: 'fever',     label: 'Fever',      hausa: 'Zazzabi',    emoji: '🌡️' },
  { id: 'shivering', label: 'Shivering',  hausa: 'Rawar jiki', emoji: '🥶' },
  { id: 'appetite',  label: 'Not eating', hausa: 'Rashin ci',  emoji: '🍽️' },
  { id: 'tiredness', label: 'Tiredness',  hausa: 'Gajiya',     emoji: '😴' },
  { id: 'fine',      label: 'All fine',   hausa: 'Lafiya',     emoji: '✅' },
];

const TIPS: Record<string, string> = {
  fever:     'Keep your child hydrated and use a mosquito net tonight. A health worker will follow up if needed.',
  shivering: 'Wrap your child warmly. Your ward has been flagged. A health worker will be in touch soon.',
  appetite:  'Try small, frequent feeds. Your report is logged. Visit a clinic if this continues.',
  tiredness: 'Ensure rest and fluids. Your ward has been flagged for health worker follow-up.',
  fine:      'Wonderful! A healthy child is a blessing. Keep using the mosquito net every night. 🙏',
};

const STEPS = [
  { icon: '🌅', title: 'Morning alert sent',      desc: 'Bot message sent at 8 AM via WhatsApp or USSD' },
  { icon: '👆', title: 'Mother replies in 10 sec', desc: 'One tap or one keypress — no typing required' },
  { icon: '🤖', title: 'AI processes the signal',  desc: 'Report joins thousands to compute ward risk score' },
  { icon: '📡', title: 'Health network updated',   desc: 'Risk scores refresh every 24 hours across all wards' },
];

const USSD_OPTS = [
  { num: '1', label: 'Fever',      hausa: 'Zazzabi'    },
  { num: '2', label: 'Shivering',  hausa: 'Rawar jiki' },
  { num: '3', label: 'Not eating', hausa: 'Rashin ci'  },
  { num: '4', label: 'Tiredness',  hausa: 'Gajiya'     },
  { num: '0', label: 'All fine',   hausa: 'Lafiya'     },
];

const KEY_ROWS = [
  [{ k:'1', s:'' },   { k:'2', s:'ABC' }, { k:'3', s:'DEF'  }],
  [{ k:'4', s:'GHI'}, { k:'5', s:'JKL'}, { k:'6', s:'MNO'  }],
  [{ k:'7', s:'PQRS'},{ k:'8', s:'TUV'}, { k:'9', s:'WXYZ' }],
  [{ k:'*', s:'' },   { k:'0', s:'+' },  { k:'#', s:''     }],
];

// ─── helpers ──────────────────────────────────────────────────────────────────

const now = () => {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
};

// ─── WhatsApp chat ─────────────────────────────────────────────────────────────

type ChatMsg = { id: number; from: 'bot' | 'user'; text: string; time: string };

function WhatsAppChat() {
  const [msgs, setMsgs]       = useState<ChatMsg[]>([]);
  const [typing, setTyping]   = useState(false);
  const [showOpts, setShowOpts] = useState(false);
  const [done, setDone]       = useState(false);
  const [started, setStarted] = useState(false);
  const idRef                 = useRef(0);
  const chatRef               = useRef<HTMLDivElement>(null);

  const scroll = () =>
    setTimeout(() => chatRef.current?.scrollTo({ top: 9999, behavior: 'smooth' }), 60);

  const push = (msg: Omit<ChatMsg, 'id' | 'time'>) => {
    setMsgs(prev => [...prev, { ...msg, id: ++idRef.current, time: now() }]);
    scroll();
  };

  const botSay = (text: string, delay: number, typingMs = 700): Promise<void> =>
    new Promise(res => {
      setTimeout(() => {
        setTyping(true); scroll();
        setTimeout(() => { setTyping(false); push({ from: 'bot', text }); res(); }, typingMs);
      }, delay);
    });

  const start = async () => {
    if (started) return;
    setStarted(true);
    await botSay('Ina kwana, Fatima 👋\nGood morning, Fatima', 300, 600);
    await botSay('Yaya lafiyar ɗanka yau?\nHow is your child today?', 200, 750);
    setTimeout(() => setShowOpts(true), 300);
  };

  const pick = async (s: Symptom) => {
    setShowOpts(false);
    push({ from: 'user', text: `${s.emoji} ${s.hausa} · ${s.label}` });
    await botSay(`An karɓi rahotonku ✓\n${s.label} reported — Tudun Wada, Katsina.`, 400, 650);
    await botSay(TIPS[s.id], 200, 800);
    setTimeout(() => setDone(true), 300);
  };

  const reset = () => {
    setMsgs([]); setTyping(false);
    setShowOpts(false); setDone(false); setStarted(false);
  };

  return (
    <div className="gc-phone-frame">
      <div className="gc-phone-statusbar">
        <span>{now()}</span>
        <div className="gc-phone-statusicons"><Signal size={9}/><Wifi size={9}/><Battery size={10}/></div>
      </div>
      <div className="gc-phone-screen">
        <div className="gc-wa-header">
          <div className="gc-wa-avatar">GC</div>
          <div className="gc-wa-info">
            <div className="gc-wa-name">GreenChild</div>
            <div className="gc-wa-sub"><span className="gc-wa-dot"/> Health Network · Active</div>
          </div>
        </div>

        <div className="gc-wa-chat" ref={chatRef}>
          {!started && (
            <motion.div className="gc-wa-idle" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>💬</div>
              <p>Daily symptom check-in</p>
              <button className="gc-wa-start-btn" onClick={start}>Begin Check-in</button>
            </motion.div>
          )}

          <AnimatePresence>
            {msgs.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22 }}
                className={`gc-wa-row ${m.from}`}
              >
                <div className={`gc-wa-bubble ${m.from}`}>
                  <span className="gc-wa-text">{m.text}</span>
                  <span className="gc-wa-time">{m.time}{m.from === 'user' ? ' ✓✓' : ''}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gc-wa-typing-wrap">
              <div className="gc-wa-typing"><span/><span/><span/></div>
            </motion.div>
          )}

          {showOpts && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="gc-symptom-chips">
              {SYMPTOMS.map(s => (
                <button key={s.id} className="gc-symptom-chip" onClick={() => pick(s)}>
                  {s.emoji} {s.hausa} · {s.label}
                </button>
              ))}
            </motion.div>
          )}

          {done && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gc-wa-sent-bar">
              <CheckCircle2 size={12}/>
              <span>Report sent to health network</span>
            </motion.div>
          )}
        </div>

        <div className="gc-wa-inputbar">
          {done
            ? <button className="gc-wa-reset-btn" onClick={reset}><RefreshCw size={11}/> Restart demo</button>
            : <span className="gc-wa-placeholder">Reply...</span>
          }
        </div>
      </div>
    </div>
  );
}

// ─── Tecno handset ────────────────────────────────────────────────────────────

type TecnoPhase = 'idle' | 'dialing' | 'connecting' | 'menu' | 'sending' | 'done';

function TecnoPhone() {
  const [phase, setPhase]   = useState<TecnoPhase>('idle');
  const [buffer, setBuffer] = useState('');
  const [picked, setPicked] = useState('');

  const pressKey = (k: string) => {
    if (phase === 'idle') {
      if (k === '*') { setPhase('dialing'); setBuffer('*'); }
    } else if (phase === 'dialing') {
      if (k === '*') {
        setBuffer('*'); // reset to start
      } else {
        const next = buffer + k;
        setBuffer(next);
        if (next === '*384#') {
          setPhase('connecting');
          setTimeout(() => setPhase('menu'), 1300);
        }
      }
    } else if (phase === 'menu') {
      const opt = USSD_OPTS.find(o => o.num === k);
      if (opt) {
        setPicked(opt.label);
        setPhase('sending');
        setTimeout(() => setPhase('done'), 1400);
      }
    }
  };

  const pressEnd = () => { setPhase('idle'); setBuffer(''); setPicked(''); };

  const isLit = (k: string): boolean => {
    if (phase === 'idle') return k === '*';
    if (phase === 'dialing') return true;
    if (phase === 'menu') return ['1','2','3','4','0'].includes(k);
    return false;
  };

  return (
    <div className="gc-tecno-phone">

      {/* earpiece */}
      <div className="gc-tecno-top">
        <div className="gc-tecno-earpiece">
          {[...Array(11)].map((_, i) => <span key={i} className="gc-tecno-hole"/>)}
        </div>
      </div>

      {/* screen */}
      <div className="gc-tecno-screen-wrap">
        <div className="gc-tecno-screen">
          <AnimatePresence mode="wait">

            {phase === 'idle' && (
              <motion.div key="idle" className="gc-ts-home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="gc-ts-time">{now()}</div>
                <div className="gc-ts-network">MTN NG · Katsina</div>
                <div className="gc-ts-hint">
                  Press <span className="gc-ts-code">✱</span> to dial<br/>
                  <span className="gc-ts-code">✱ 3 8 4 #</span><br/>
                  <span className="gc-ts-hint-sub">GreenChild daily check-in</span>
                </div>
              </motion.div>
            )}

            {(phase === 'dialing' || phase === 'connecting') && (
              <motion.div key="dialing" className="gc-ts-dial-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="gc-ts-dial-label">
                  {phase === 'connecting' ? 'Connecting...' : 'Dial USSD Code'}
                </div>
                <div className="gc-ts-dial-num">
                  {buffer}{phase === 'dialing' ? <span className="gc-ts-cursor">|</span> : ''}
                </div>
                {phase === 'dialing' && (
                  <div className="gc-ts-dial-hint">
                    {buffer === '*384#' ? 'Connecting...' : `Type: *384# (${buffer.length}/6)`}
                  </div>
                )}
              </motion.div>
            )}

            {phase === 'menu' && (
              <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="gc-ts-header">GreenChild · Kiwon Lafiya</div>
                <div className="gc-ts-hr"/>
                <div className="gc-ts-q">Yaya lafiyar ɗanka yau?</div>
                <div className="gc-ts-q-sub">How is your child today?</div>
                <div className="gc-ts-opts">
                  {USSD_OPTS.map(o => (
                    <div key={o.num} className="gc-ts-opt">
                      <span className="gc-ts-num">{o.num}.</span> {o.hausa} · {o.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'sending' && (
              <motion.div key="sending" className="gc-ts-dial-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="gc-ts-dial-label">GreenChild</div>
                <div className="gc-ts-sending-text">Sending your report...</div>
              </motion.div>
            )}

            {phase === 'done' && (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="gc-ts-header gc-ts-ok">✓ An Karɓi Rahoto</div>
                <div className="gc-ts-hr"/>
                <div className="gc-ts-confirm-line">An sami rahotonku — <span className="gc-ts-picked">{picked}</span></div>
                <div className="gc-ts-confirm-line gc-ts-dim">Ma'aikacin lafiya zai tuntube ku.</div>
                <div className="gc-ts-confirm-line gc-ts-dim gc-ts-sm">A health worker will follow up.</div>
                <div className="gc-ts-confirm-line gc-ts-dim gc-ts-sm">Na gode, mama 🙏</div>
                <div className="gc-ts-end-hint">Press red key to exit</div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* TECNO brand strip */}
      <div className="gc-tecno-brand-strip">
        <span className="gc-tecno-brand-text">TECNO</span>
      </div>

      {/* soft keys + d-pad */}
      <div className="gc-tecno-nav">
        <button className="gc-tecno-soft">Menu</button>
        <div className="gc-tecno-dpad">
          <div className="gc-tecno-dpad-up">▲</div>
          <div className="gc-tecno-dpad-mid">
            <div className="gc-tecno-dpad-lr">◀</div>
            <div className="gc-tecno-dpad-ok">OK</div>
            <div className="gc-tecno-dpad-lr">▶</div>
          </div>
          <div className="gc-tecno-dpad-down">▼</div>
        </div>
        <button className="gc-tecno-soft">Back</button>
      </div>

      {/* call / end */}
      <div className="gc-tecno-call-row">
        <button className="gc-tecno-call-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
        </button>
        <button className="gc-tecno-end-btn" onClick={pressEnd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>

      {/* numpad */}
      <div className="gc-tecno-numpad">
        {KEY_ROWS.flat().map(({ k, s }) => (
          <button
            key={k}
            className={`gc-tecno-key${isLit(k) ? ' gc-tecno-key-lit' : ''}`}
            onClick={() => pressKey(k)}
          >
            <span className="gc-tecno-key-main">{k}</span>
            {s && <span className="gc-tecno-key-sub">{s}</span>}
          </button>
        ))}
      </div>

      {/* chin */}
      <div className="gc-tecno-chin"/>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MotherReportPage() {
  const [tab, setTab] = useState<'whatsapp' | 'ussd'>('whatsapp');

  return (
    <>
      <Navbar />
      <main>

        {/* ── Full-screen hero with phone visible above fold ── */}
        <section className="gc-mother-hero">
          <div className="gc-mother-hero-inner">

            {/* left: text + controls */}
            <motion.div
              className="gc-mother-hero-text"
              initial="hidden" animate="visible"
              variants={fadeUp} transition={{ duration: 0.65 }}
            >
              <span className="gc-pill" style={{ alignSelf: 'flex-start', marginBottom: 20 }}>
                <span className="gc-badge-dot"/> Demo Screen 01 of 03
              </span>
              <h1 className="gc-mother-title">
                Mother Reporting<br/>Interface
              </h1>
              <p className="gc-mother-desc">
                Every morning, enrolled mothers receive a 10-second symptom check-in —
                via WhatsApp or on a Tecno feature phone with USSD — in their language,
                on any phone, zero data required.
              </p>

              {/* tab toggle */}
              <div className="gc-demo-tabs" style={{ alignSelf: 'flex-start' }}>
                <button
                  className={`gc-demo-tab ${tab === 'whatsapp' ? 'active' : ''}`}
                  onClick={() => setTab('whatsapp')}
                >
                  <MessageSquare size={13}/> WhatsApp
                </button>
                <button
                  className={`gc-demo-tab ${tab === 'ussd' ? 'active' : ''}`}
                  onClick={() => setTab('ussd')}
                >
                  <Phone size={13}/> USSD *384#
                </button>
              </div>

              <div className="gc-mother-channel-note">
                {tab === 'whatsapp'
                  ? '📱 Smartphone — familiar WhatsApp interface, works with data'
                  : '📞 Tecno T-series feature phone — works on 2G, zero data cost'}
              </div>
            </motion.div>

            {/* right: phone */}
            <motion.div
              className="gc-mother-hero-phone"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
            >
              <AnimatePresence mode="wait">
                {tab === 'whatsapp' ? (
                  <motion.div
                    key="wa"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.22 }}
                  >
                    <WhatsAppChat />
                  </motion.div>
                ) : (
                  <motion.div
                    key="tecno"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                  >
                    <TecnoPhone />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* scroll hint */}
          <div className="gc-mother-scroll-hint">
            <span>Scroll to explore</span>
            <ChevronDown size={16}/>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="gc-hiw" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div className="gc-section-header">
            <span className="gc-pill">The Process</span>
            <h2 className="gc-heading">How each check-in works</h2>
            <p className="gc-subtext">From morning alert to health network update — the full loop in under 24 hours.</p>
          </div>
          <div className="gc-hiw-grid">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                className="gc-hiw-card"
                initial="hidden" whileInView="visible"
                viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.09, duration: 0.5 }}
              >
                <div className="gc-icon-box" style={{ fontSize: '1.2rem', width: 52, height: 52 }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Info cards ── */}
        <section className="gc-page-section" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div className="gc-page-container">
            <div className="gc-section-header" style={{ marginBottom: 48 }}>
              <span className="gc-pill">By the numbers</span>
              <h2 className="gc-heading">Built for the last mile</h2>
              <p className="gc-subtext">Every design decision was made for mothers with basic phones, low literacy, and no reliable internet.</p>
            </div>
            <div className="gc-demo-cards">
              {[
                {
                  icon: '⚡',
                  stat: '10 sec',
                  label: 'Average report time',
                  desc: 'One question. One tap. Even the least tech-savvy mother completes the check-in in under 10 seconds.',
                },
                {
                  icon: '📡',
                  stat: 'Zero data',
                  label: 'Required for USSD',
                  desc: 'USSD works on any Tecno or Nokia feature phone on 2G — no internet or data bundle needed.',
                },
                {
                  icon: '🗣️',
                  stat: '3 languages',
                  label: 'Hausa · Yoruba · Igbo',
                  desc: "Every message, confirmation, and health tip is sent in the mother's preferred language — building community trust.",
                },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  className="gc-card"
                  style={{ textAlign: 'center', padding: '40px 32px' }}
                  initial="hidden" whileInView="visible"
                  viewport={{ once: true }} variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: 14 }}>{c.icon}</div>
                  <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{c.stat}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', margin: '8px 0 16px' }}>{c.label}</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="gc-page-section gc-bg-warm" style={{ paddingTop: 72, paddingBottom: 80 }}>
          <div className="gc-page-container">
            <motion.div
              className="gc-cta-card"
              initial="hidden" whileInView="visible"
              viewport={{ once: true }} variants={fadeUp}
            >
              <span className="gc-pill">Next: Demo Screen 02</span>
              <h2 className="gc-heading">See How Reports Become Intelligence</h2>
              <p className="gc-subtext" style={{ marginBottom: 32 }}>
                10,000 mother reports. Real rainfall data. One AI risk map. See how the outbreak prediction engine works.
              </p>
              <a href="/demo/dashboard" className="gc-btn-primary">
                View AI Risk Dashboard <ArrowRight size={18}/>
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
