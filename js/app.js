/*********************************
 * AUTH GUARD
 *********************************/
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "index.html";
}

/*********************************
 * CONFIG & GLOBAL STATE
 *********************************/
const API_URL = "https://isha-intelligent-space-hazard-analysis-1cl2.onrender.com";

let currentView = "watchlist"; // "watchlist" | "all"
let allAsteroids = [];

const currentUser = localStorage.getItem("currentUser");

/*********************************
 * DOM ELEMENTS
 *********************************/
const asteroidsContainer = document.getElementById("asteroidsContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

const refreshBtn = document.getElementById("refreshBtn");
const watchlistViewBtn = document.getElementById("watchlistViewBtn");
const viewAllBtn = document.getElementById("viewAllBtn");

const logoutBtn = document.getElementById("logoutBtn");
const avatar = document.getElementById("userAvatar");
const dropdown = document.getElementById("logoutDropdown");

/*********************************
 * INIT
 *********************************/
document.addEventListener("DOMContentLoaded", () => {
  loadAsteroidData();
  setupEventListeners();
});

/*********************************
 * EVENT LISTENERS
 *********************************/
function setupEventListeners() {
  refreshBtn?.addEventListener("click", loadAsteroidData);
  watchlistViewBtn?.addEventListener("click", loadWatchlistView);
  viewAllBtn?.addEventListener("click", loadAllAsteroidsView);

  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });

  avatar?.addEventListener("click", () => {
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".user-menu")) {
      dropdown.style.display = "none";
    }
  });

  // 3D View
  document.getElementById("view-3d-btn")?.addEventListener("click", () => {
    if (typeof window.open3D === "function") {
      window.open3D(allAsteroids);
    }
  });
}

/*********************************
 * DATA FETCH
 *********************************/
async function loadAsteroidData() {
  try {
    showLoading();
    hideError();

    const res = await fetch(`${API_URL}/api/asteroids/today`);
    if (!res.ok) throw new Error("Failed to fetch asteroid data");

    const data = await res.json();
    allAsteroids = data.asteroids;

    loadWatchlistView(); // DEFAULT
    hideLoading();
  } catch (err) {
    hideLoading();
    showError(err.message);
  }
}

/*********************************
 * VIEW HANDLERS
 *********************************/
function loadWatchlistView() {
  currentView = "watchlist";
  setActiveView("watchlist");

  const watchlist = getWatchlist();

  updateCounters(watchlist); // 👈 KEY LINE

  if (watchlist.length === 0) {
    asteroidsContainer.innerHTML = `
      <p style="opacity:0.7;text-align:center">
        ⭐ No asteroids in your watchlist yet.<br>
        Click "View All Asteroids" to add some.
      </p>`;
    return;
  }

  renderAsteroids(watchlist);
}


function loadAllAsteroidsView() {
  currentView = "all";
  setActiveView("all");

  updateCounters(allAsteroids); // 👈 KEY LINE

  renderAsteroids(allAsteroids);
}

loadWatchlistView();


function setActiveView(view) {
  watchlistViewBtn?.classList.remove("active");
  viewAllBtn?.classList.remove("active");

  if (view === "watchlist") {
    watchlistViewBtn?.classList.add("active");
  } else {
    viewAllBtn?.classList.add("active");
  }
}

/*********************************
 * RENDER
 *********************************/
function renderAsteroids(asteroids) {
  asteroidsContainer.innerHTML = "";

  asteroids.forEach((asteroid, index) => {
    const riskClass = asteroid.risk_level.toLowerCase();
    const riskEmoji = getRiskEmoji(asteroid.risk_level);
    const riskPercent = (asteroid.risk_score / 18) * 100;

    const asteroidId = getAsteroidId(asteroid);

    const actionButton =
      currentView === "watchlist"
        ? `<button class="remove-btn" onclick="removeFromWatchlist('${asteroidId}')">
            ❌ Remove
          </button>`
        : `<button class="watch-btn" onclick='addToWatchlist(${JSON.stringify(asteroid)})'>
            ⭐ Add to Watchlist
          </button>`;

    asteroidsContainer.innerHTML += `
      <div class="asteroid-card" style="animation-delay:${index * 0.05}s">
        <div class="asteroid-header">
          <h3>${asteroid.name}</h3>
          <span class="risk-badge ${riskClass}">
            ${riskEmoji} ${asteroid.risk_level}
          </span>
        </div>

        <div class="asteroid-details">
          <div>Diameter: ${asteroid.diameter_km.toFixed(3)} km</div>
          <div>Miss Distance: ${formatNumber(asteroid.miss_distance_km)} km</div>
          <div>Velocity: ${formatNumber(asteroid.velocity_kmph)} km/h</div>
        </div>

        <div class="risk-score-bar">
          <div class="risk-score-fill ${riskClass}" style="width:${riskPercent}%"></div>
        </div>

        <div class="asteroid-actions">
          ${actionButton}
        </div>
      </div>
    `;
  });
}

/*********************************
 * WATCHLIST LOGIC (FIXED)
 *********************************/
function getAsteroidId(asteroid) {
  return asteroid.neo_reference_id || asteroid.id || asteroid.name;
}

function getWatchlist() {
  return JSON.parse(localStorage.getItem(`watchlist_${currentUser}`)) || [];
}

function saveWatchlist(list) {
  localStorage.setItem(`watchlist_${currentUser}`, JSON.stringify(list));
}

function addToWatchlist(asteroid) {
  const watchlist = getWatchlist();
  const asteroidId = getAsteroidId(asteroid);

  if (watchlist.some(a => a._watchId === asteroidId)) {
    alert("Already in watchlist ⭐");
    return;
  }

  watchlist.push({
    ...asteroid,
    _watchId: asteroidId
  });

  saveWatchlist(watchlist);
  alert("Added to watchlist ⭐");
}

function removeFromWatchlist(id) {
  let watchlist = getWatchlist();
  watchlist = watchlist.filter(a => a._watchId !== id);
  saveWatchlist(watchlist);
  loadWatchlistView();
}

/*********************************
 * HELPERS
 *********************************/
function getRiskEmoji(level) {
  if (level === "High") return "🔴";
  if (level === "Medium") return "🟡";
  if (level === "Low") return "🟢";
  return "⚪";
}

function formatNumber(num) {
  return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function showLoading() {
  loading.style.display = "block";
  asteroidsContainer.style.display = "none";
}

function hideLoading() {
  loading.style.display = "none";
  asteroidsContainer.style.display = "grid";
}

function showError(msg) {
  error.style.display = "block";
  errorMessage.textContent = msg || "Server error";
}

function hideError() {
  error.style.display = "none";
}
function updateCounters(asteroids) {
  const total = asteroids.length;
  const high = asteroids.filter(a => a.risk_level === "High").length;
  const medium = asteroids.filter(a => a.risk_level === "Medium").length;
  const low = asteroids.filter(a => a.risk_level === "Low").length;

  animateCounter(totalCount, total);
  animateCounter(highRiskCount, high);
  animateCounter(mediumRiskCount, medium);
  animateCounter(lowRiskCount, low);
}
function animateCounter(element, target) {
  const duration = 500;
  let start = 0;
  const step = Math.max(1, Math.floor(target / (duration / 16)));

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = start;
    }
  }, 16);
}
