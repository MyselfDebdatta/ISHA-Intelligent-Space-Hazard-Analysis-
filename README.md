# 🚀 ISHA : INTELLIGENT SPACE HAZARD ANALYSIS

#### 🔗 Live Website: https://myselfdebdatta.github.io/ISHA-Intelligent-Space-Hazard-Analysis-/


ISHA (Intelligent Space Hazard Analysis) is a Full-Stack asteroid risk intelligence platform using NASA NeoWs data. It analyzes near-Earth objects in real time, classifies threat levels, and provides secure, user-specific monitoring through a scalable React and Node.js architecture built for the NASA Space Challenge.


## 🌟 Why This Platform?
Near-Earth Objects pose a real and growing planetary risk, yet most publicly available asteroid datasets remain locked in complex scientific formats that are difficult to interpret in real time.

ISHA bridges the gap between raw space telemetry and actionable intelligence.

Instead of static tables and delayed reports, this platform delivers:

• Live asteroid monitoring powered by NASA’s real-time feeds
• Automated physics-based risk scoring beyond simple “hazardous” flags
• Interactive 3D orbital visualization for intuitive spatial awareness
• Real-time alert broadcasting for immediate response
• Scalable infrastructure designed for continuous global monitoring

#### This platform enables:
- 🚀 Real-time asteroid threat monitoring — continuously processes live NASA data streams
- 📈 Instant risk assessment — converts raw orbital physics into meaningful danger scores
- 🌍 Interactive space visualization — 3D orbital mapping for intuitive understanding
- 📊 Smart filtering & watchlists — track specific objects of interest

## ✨ Key Features

#### 🔵 Live NASA Data Ingestion
Automatically fetches and normalizes near-Earth asteroid data in real time
#### 🟢 Physics-Based Risk Engine
Calculates impact probability using mass, velocity, proximity, and hazard indicators
#### 🟣 3D Orbital Visualization Dashboard
Interactive asteroid movement map for intuitive space tracking
#### 🌐 Smart Risk Filtering
View high, medium, and low-risk objects instantly

## 💎 Benefits
#### 🌍 Improved Planetary Safety
Enables early detection and rapid assessment of potentially hazardous asteroids
#### ⚡ Real-Time Decision Making
Live data processing ensures immediate awareness of emerging threats
#### 🌌 Enhanced Spatial Understanding
3D visualization makes asteroid trajectories easy to interpret
## 📸 Project Screenshots

<!-- Two images per row — paste into README.md -->
<p align="center">

<table>
  <tr>
    <td align="center">
      <img src="/Images/Login-Page.jpeg" width="420" alt="ft3" style="border-radius:14px; box-shadow:0 4px 14px rgba(0,0,0,0.15); margin:8px;" />
    </td>
    <td align="center">
      <img src="/Images/Sign-Up Page.jpeg" width="420" alt="ft4" style="border-radius:14px; box-shadow:0 4px 14px rgba(0,0,0,0.15); margin:8px;" />
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <img src="/Images/Dashboard.jpeg" width="420" alt="ft3" style="border-radius:14px; box-shadow:0 4px 14px rgba(0,0,0,0.15); margin:8px;" />
    </td>
    <td align="center">
      <img src="/Images/All-Watchlist.jpeg" width="420" alt="ft4" style="border-radius:14px; box-shadow:0 4px 14px rgba(0,0,0,0.15); margin:8px;" />
    </td>
  </tr>

  <tr>
    <td align="center">
      <img src="/Images/My-Watchlist.jpeg" width="420" alt="ft5" style="border-radius:14px; box-shadow:0 4px 14px rgba(0,0,0,0.15); margin:8px;" />
    </td>
    <td align="center">
      <img src="/Images/3D-Site.jpeg" width="420" alt="ft6" style="border-radius:14px; box-shadow:0 4px 14px rgba(0,0,0,0.15); margin:8px;" />
    </td>
  </tr>

  <tr>
    <td align="center">
      <img src="/Images/AI-Assistance.jpeg" width="420" alt="ft8" style="border-radius:14px; box-shadow:0 4px 14px rgba(0,0,0,0.15); margin:8px;" />
    </td>
    <td align="center">
      <img src="/Images/ISHA.jpeg" width="420" alt="ft7" style="border-radius:14px; box-shadow:0 4px 14px rgba(0,0,0,0.15); margin:8px;" />
    </td>
  </tr>
</table>

</p>


## 🛠️ Tech Stack

| Category             | Technologies                                      |
|----------------------|---------------------------------------------------|
| 💻 **Frontend**      | HTML, CSS, js                              |
| ⚙️ **Backend**       | Node.js, js                |
| 🛢️ **Database**      | SQLite                                           |
| ☁️ **Deployment**    | Vercel (Frontend), Render (Backend)               |

##  📂 Project Structure

```
isha_final/
│
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── database.db
│
│   ├── config/
│   │   └── sqlite.js
│
│   ├── data/
│   │   └── users.js
│
│   ├── models/
│   │   └── User.js
│
│   ├── middleware/
│   │   └── auth.js
│
│   ├── routes/
│   │   ├── asteroids.js
│   │   ├── auth.js
│   │   ├── chat.js
│   │   └── watchlist.js
│
│   ├── utils/
│   │   ├── chatService.js
│   │   └── riskCalculator.js
│
│   ├── README.md
│   ├── SETUP_GUIDE.md
│   └── TEST_REPORT.md
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── index.js
│
│   ├── css/
│   │   └── styles.css
│
│   ├── js/
│   │   ├── app.js
│   │   ├── chat.js
│   │   ├── solarSystem.js
│   │   └── utils.js
│
│   └── README.md
│
└── (node_modules – dependency folder)
