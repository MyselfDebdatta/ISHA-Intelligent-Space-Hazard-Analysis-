# NASA Asteroid Risk Analysis - Frontend

## 🎨 Overview

A stunning, modern web dashboard that visualizes real-time NASA asteroid data with risk analysis. Features a dark space theme with animated stars, glassmorphism effects, and smooth transitions.

## ✨ Features

- 🌌 **Animated Space Theme** - Beautiful dark gradient background with twinkling stars
- 📊 **Real-Time Statistics** - Live dashboard showing total, high, medium, and low-risk asteroids
- 🎯 **Risk Visualization** - Color-coded cards with risk levels (High/Medium/Low)
- 🔍 **Smart Filtering** - Filter asteroids by risk level
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Smooth Animations** - Animated counters, card transitions, and hover effects
- 🎨 **Modern Design** - Glassmorphism, gradients, and premium aesthetics

## 🚀 Getting Started

### Prerequisites

- Backend server must be running on `http://localhost:3000`
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Installation

No installation required! Just open the HTML file.

### Running the Frontend

**Option 1: Double-click**
1. Navigate to `frontend` folder
2. Double-click on `index.html`
3. Your default browser will open the dashboard

**Option 2: Open with browser**
1. Right-click on `index.html`
2. Select "Open with" → Choose your browser
3. Dashboard will load

**Option 3: Live Server (Recommended for development)**
If you have VS Code with Live Server extension:
1. Right-click on `index.html`
2. Select "Open with Live Server"
3. Will auto-reload on file changes

## 📁 Project Structure

```
frontend/
├── index.html           # Main HTML structure
├── css/
│   └── styles.css       # All styling and animations
└── js/
    └── app.js           # Application logic and API calls
```

## 🎯 How It Works

1. **Loads Data**: Fetches asteroid data from `http://localhost:3000/api/asteroids/today`
2. **Displays Statistics**: Shows total count and breakdown by risk level
3. **Renders Cards**: Creates a card for each asteroid with details
4. **Enables Filtering**: Click filter buttons to show specific risk levels
5. **Auto-refreshes**: Click "Refresh Data" to get latest NASA data

## 📊 Page Sections

### Header
- Logo with animated Earth icon
- Refresh button to reload data

### Statistics Dashboard
- **Total Asteroids** - All detected asteroids
- **High Risk** - Score ≥ 12 (🔴 Red)
- **Medium Risk** - Score 7-11 (🟡 Yellow)
- **Low Risk** - Score ≤ 6 (🟢 Green)

### Filters
- All Asteroids
- High Risk only
- Medium Risk only
- Low Risk only

### Asteroid Cards
Each card displays:
- Name of asteroid
- Risk level badge
- Diameter (km)
- Miss distance from Earth (km)
- Velocity (km/h)
- NASA hazardous classification
- Risk score with visual progress bar

## 🎨 Design Features

### Color Palette
- **Background**: Deep space gradient (#0a0e27 → #1a1f3a → #0f172a)
- **High Risk**: Red gradient (#ef4444 → #dc2626)
- **Medium Risk**: Orange gradient (#f59e0b → #d97706)
- **Low Risk**: Green gradient (#10b981 → #059669)
- **Primary Accent**: Blue gradient (#3b82f6 → #2563eb)

### Typography
- Font: Inter (Premium Google Font)
- Weights: 300, 400, 600, 700, 800

### Animations
- ⭐ **Star Twinkling** - Background stars animate
- 🔄 **Loading Spinner** - While fetching data
- 📈 **Animated Counters** - Stats count up smoothly
- 🎴 **Card Entrance** - Staggered fade-in effect
- 🚀 **Hover Effects** - Cards lift on hover

## 🛠️ Customization

### Change API URL
Edit `app.js` line 2:
```javascript
const API_URL = 'http://localhost:3000';
```

### Modify Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --bg-dark: #0a0e27;
    --accent-high: #ef4444;
    /* ... other colors */
}
```

### Adjust Animations
Modify animation durations in `styles.css`:
```css
@keyframes fadeInUp {
    /* ... */
}
```

## 🧪 Testing

1. **Ensure backend is running**: `http://localhost:3000` should be accessible
2. **Open index.html** in your browser
3. **Expected behavior**:
   - Statistics dashboard shows counts
   - Asteroid cards appear with data
   - Filters work correctly
   - Refresh button reloads data

## 🐛 Troubleshooting

**Problem**: "Failed to load data" error

**Solutions**:
- Check backend server is running on port 3000
- Test backend: Open `http://localhost:3000/api/asteroids/today` in browser
- Check browser console for CORS errors
- Ensure backend has CORS enabled (already configured)

**Problem**: Blank page

**Solutions**:
- Check browser console for JavaScript errors
- Ensure all files are in correct folders (css/, js/)
- Try opening in different browser
- Clear browser cache

**Problem**: Data not updating

**Solutions**:
- Click the "Refresh Data" button
- Check network tab in browser dev tools
- Verify backend is responding to requests

## 📝 For Judges

### Highlights
- ✅ **Modern UI/UX** - Premium design with professional aesthetics
- ✅ **Real NASA Data** - Live integration with backend API
- ✅ **Responsive Design** - Works on all devices
- ✅ **Interactive Features** - Filtering, refreshing, animations
- ✅ **Performance** - Fast loading, smooth animations
- ✅ **Accessibility** - Semantic HTML, readable text

### Technical Stack
- **Frontend**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Design**: Custom CSS with glassmorphism and gradients
- **API**: RESTful integration with backend
- **Fonts**: Google Fonts (Inter)

## 🎓 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📸 Screenshots

Open `index.html` to see:
- Animated space background with stars
- Statistics dashboard with live counts
- Color-coded asteroid cards
- Smooth transitions and hover effects

---

**Built with ❤️ for NASA Space Apps Challenge**
