# NASA Asteroid Risk Analysis - Setup Guide

## ✅ What's Been Created

Your complete backend structure is ready:

```
backend/
├── routes/
│   └── asteroids.js           ✅ API endpoint for asteroid data
├── utils/
│   └── riskCalculator.js      ✅ Risk calculation engine
├── server.js                  ✅ Express server
├── package.json               ✅ Dependencies list
├── .env                       ✅ Environment variables
├── .env.example               ✅ Template for env vars
├── .gitignore                 ✅ Git ignore rules
└── README.md                  ✅ Full documentation
```

## 🚀 Next Steps to Run the Server

### Step 1: Fix PowerShell Execution Policy (One-time setup)

Open PowerShell **as Administrator** and run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Or** use Command Prompt instead of PowerShell - it doesn't have this restriction.

### Step 2: Install Dependencies

Open **Command Prompt** (not PowerShell) and run:

```cmd
cd "C:\Users\Depesh\Desktop\nasa project\backend"
npm install
```

### Step 3: Get Your NASA API Key (Optional)

1. Visit: [https://api.nasa.gov/](https://api.nasa.gov/)
2. Sign up for a free API key
3. Open `.env` file and replace `DEMO_KEY` with your actual key:

```env
NASA_API_KEY=your_actual_key_here
PORT=5000
```

> **Note:** `DEMO_KEY` works for testing but has rate limits. Get a real key for production.

### Step 4: Start the Server

**Development mode (with auto-reload):**

```cmd
npm run dev
```

**OR Production mode:**

```cmd
npm start
```

You should see:

```
Server running on port 5000
```

### Step 5: Test the API

Open your browser or use a tool like Postman:

**Health check:**
```
http://localhost:5000/
```

**Get today's asteroids with risk analysis:**
```
http://localhost:5000/api/asteroids/today
```

## 📊 Expected Response Format

```json
{
  "count": 15,
  "asteroids": [
    {
      "name": "(2024 AB) Example Asteroid",
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

## 🎯 Risk Level Guide

- 🟢 **Low Risk** (score ≤ 6): Small, slow, distant asteroids
- 🟡 **Medium Risk** (score 7-11): Moderate threat asteroids
- 🔴 **High Risk** (score ≥ 12): Large, fast, close, or hazardous asteroids

## 🛠️ Troubleshooting

**Problem:** npm commands don't work in PowerShell

**Solution:** Use Command Prompt instead, or fix execution policy as shown in Step 1

**Problem:** "Failed to fetch asteroid data" error

**Solution:** 
- Check your internet connection
- Verify NASA_API_KEY in `.env` is correct
- DEMO_KEY has rate limits, get a real API key

**Problem:** Port 5000 already in use

**Solution:** Change PORT in `.env` to another number like 3000 or 8000

## 📝 For Your Judges

Highlight these features:
- ✅ Real-time NASA data integration
- ✅ Intelligent risk scoring algorithm
- ✅ Clean, modular code architecture
- ✅ Production-ready error handling
- ✅ Clear API documentation
- ✅ Converts scientific data → actionable insights

The risk calculation uses 4 factors (diameter, distance, velocity, hazard classification) to generate human-readable risk levels perfect for decision-makers.
