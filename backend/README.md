# NASA Asteroid Risk Analysis Backend

This backend system analyzes Near-Earth Objects (NEO) data from NASA's NeoWs API and calculates risk scores.

## 🚀 Features

- Fetches real-time asteroid data from NASA NeoWs API
- Calculates risk scores based on:
  - 🔹 Diameter (size of asteroid)
  - 🔹 Miss distance (how close it comes to Earth)
  - 🔹 Velocity (how fast it's traveling)
  - 🔹 Hazardous classification
- Returns human-readable risk levels: 🟢 Low, 🟡 Medium, 🔴 High

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and add your NASA API key:

```
NASA_API_KEY=your_api_key_here
PORT=5000
```

> **Get your NASA API key**: Visit [https://api.nasa.gov/](https://api.nasa.gov/) and sign up for a free API key.

### 3. Start the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will run on `http://localhost:5000`

## 🔌 API Endpoints

### GET /api/asteroids/today

Fetches and analyzes asteroids approaching Earth today.

**Response Example:**

```json
{
  "count": 15,
  "asteroids": [
    {
      "name": "Asteroid 2024 AB",
      "diameter_km": 0.42,
      "miss_distance_km": 750000,
      "velocity_kmph": 56000,
      "hazardous": true,
      "risk_score": 18,
      "risk_level": "High"
    }
  ]
}
```

### GET /

Health check endpoint.

**Response:**

```json
{
  "message": "NASA Asteroid Risk Analysis API is running"
}
```

## 📊 Risk Calculation Logic

### Scoring System

| Factor | Condition | Score |
|--------|-----------|-------|
| **Diameter** | < 0.05 km | 1 |
| | 0.05 - 0.2 km | 3 |
| | > 0.2 km | 5 |
| **Distance** | > 5,000,000 km | 1 |
| | 1,000,000 - 5,000,000 km | 3 |
| | < 1,000,000 km | 5 |
| **Velocity** | < 20,000 km/h | 1 |
| | 20,000 - 50,000 km/h | 3 |
| | > 50,000 km/h | 5 |
| **Hazardous** | NASA classified as hazardous | +3 |

### Risk Level Mapping

| Total Score | Risk Level |
|-------------|------------|
| ≤ 6 | 🟢 Low |
| 7 - 11 | 🟡 Medium |
| ≥ 12 | 🔴 High |

## 📁 Project Structure

```
backend/
├── routes/
│   └── asteroids.js       # API routes
├── utils/
│   └── riskCalculator.js  # Risk calculation engine
├── server.js              # Express server setup
├── package.json           # Dependencies
├── .env.example           # Environment variables template
└── README.md              # Documentation
```

## 🛠️ Technology Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Axios** - HTTP client for NASA API
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 📝 Notes for Judges

This system demonstrates:
- Clean, modular code architecture
- Real-time data integration with NASA APIs
- Practical risk assessment algorithm
- RESTful API design
- Production-ready error handling
- Clear documentation

The risk engine converts complex scientific data into actionable insights for decision-makers.
