# 🌿 GreenChild

> *"When communities speak, children live."*

GreenChild is an open-source, AI-powered community health 
surveillance platform that predicts malaria outbreaks 
7–14 days before they hit clinics — by collecting daily 
symptom reports from mothers via WhatsApp and USSD, 
fusing them with hyperlocal climate data, and alerting 
health workers to act before children die.

## 🚨 The Problem
Nigeria accounts for one-third of all global under-5 
malaria deaths — 340 children every day. Climate change 
is expanding mosquito breeding zones and extending 
transmission seasons. Yet no system captures the 
earliest signal: mothers noticing their children 
are sick before any clinic does.

## 💡 The Innovation
GreenChild turns every mother with a basic phone into 
a health sensor. When multiple mothers in the same 
ward report fever on the same day — combined with 
rainfall and temperature data — the AI detects an 
outbreak forming and alerts the nearest health worker 
days before it explodes.

## 🛠️ How It Works
1. **Mother Reports** — Daily WhatsApp/USSD check-in
2. **AI Detects** — Fuses symptom clusters + climate data
3. **Alert Fires** — Health worker gets precise ward alert
4. **UNICEF Sees** — Live national risk dashboard updates

## 👥 Who Uses It
- **Mothers** — Report child symptoms in 10 seconds
- **Health Workers** — Receive early outbreak alerts
- **UNICEF/Government** — View live national health map

## 🌍 Impact
- Works on basic phones — no internet, no app required
- Supports Hausa, Yoruba, and Igbo
- Generates real-time child health data at household level
- Deployable across 18+ West African countries

## 🧰 Tech Stack
- **Frontend** — Next.js, React, TypeScript
- **Backend** — Python, FastAPI
- **AI Engine** — Scikit-learn, Prophet
- **Map** — Leaflet.js / Mapbox
- **Climate Data** — NASA CHIRPS API
- **Database** — PostgreSQL
- **Hosting** — Vercel + Railway

## 📁 Project Structure
\`\`\`
greenchild/
├── apps/
│   ├── web/          # Next.js dashboard
│   ├── api/          # FastAPI backend
│   └── ai/           # ML outbreak prediction engine
├── docs/             # Documentation
├── data/             # Sample datasets
└── README.md
\`\`\`

## 🚀 Getting Started
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/greenchild
cd greenchild
\`\`\`

## 📄 License
MIT License — open source from day one.

## 🤝 Built For
UNICEF Venture Fund — Climate Ventures Cohort 2026

## 👨‍💻 Team
- **Abubakar Muktar** — Founder & CEO
- **Maryam Abdulmalik** — Co-Founder & Head of Health Science

---
*GreenChild — Community eyes on every child.*
