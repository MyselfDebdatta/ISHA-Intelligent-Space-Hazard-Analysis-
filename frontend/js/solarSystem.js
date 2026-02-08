/**
 * NASA Asteroid Tracker – 3D Solar System (FIXED)
 */

let scene, camera, renderer, controls;
let sun, earth, asteroidSystem;
let animationId;

const container = document.getElementById("solar-system-container");
const closeBtn = document.getElementById("close-3d-btn");

/* ================= INIT ================= */
function init3D(asteroids) {
  cleanupScene();

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 50, 100);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  addLights();
  addStars();
  createSun();
  createEarth();
  createAsteroids(asteroids);

  window.addEventListener("resize", onResize);
  animate();
}

/* ================= OBJECTS ================= */
function addLights() {
  scene.add(new THREE.AmbientLight(0xffffff, 1.5));
  const sunLight = new THREE.PointLight(0xffffff, 2, 500);
  scene.add(sunLight);
}

function addStars() {
  const geo = new THREE.BufferGeometry();
  const verts = [];
  for (let i = 0; i < 6000; i++) {
    verts.push(
      THREE.MathUtils.randFloatSpread(2000),
      THREE.MathUtils.randFloatSpread(2000),
      THREE.MathUtils.randFloatSpread(2000)
    );
  }
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.7 })));
}

function createSun() {
  sun = new THREE.Mesh(
    new THREE.SphereGeometry(10, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffcc00 })
  );
  scene.add(sun);
}

function createEarth() {
  earth = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshPhongMaterial({ color: 0x3366ff })
  );
  earth.position.set(40, 0, 0);
  scene.add(earth);
}

function createAsteroids(asteroids) {
  asteroidSystem = new THREE.Group();

  asteroids.forEach(a => {
    const size =
      a.risk_level === "High" ? 0.9 :
      a.risk_level === "Medium" ? 0.6 : 0.4;

    const color =
      a.risk_level === "High" ? 0xff4757 :
      a.risk_level === "Medium" ? 0xffa502 : 0x7bed9f;

    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(size, 8, 8),
      new THREE.MeshLambertMaterial({ color })
    );

    const angle = Math.random() * Math.PI * 2;
    const radius = 40 + Math.random() * 15;

    mesh.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 5,
      Math.sin(angle) * radius
    );

    asteroidSystem.add(mesh);
  });

  scene.add(asteroidSystem);
}

/* ================= LOOP ================= */
function animate() {
  animationId = requestAnimationFrame(animate);

  sun.rotation.y += 0.002;

  const t = Date.now() * 0.00015;
  earth.position.x = Math.cos(t) * 40;
  earth.position.z = Math.sin(t) * 40;

  asteroidSystem.rotation.y -= 0.0004;

  controls.update();
  renderer.render(scene, camera);
}

/* ================= HELPERS ================= */
function onResize() {
  const w = container.clientWidth;
  const h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function cleanupScene() {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);

  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
  }

  scene = camera = renderer = controls = null;
}

/* ================= CLOSE ================= */
function close3DView() {
  container.style.display = "none";
  cleanupScene();
}

/* ================= PUBLIC API ================= */
window.open3D = function (asteroids) {
  if (!asteroids || asteroids.length === 0) {
    alert("No asteroid data available");
    return;
  }

  container.style.display = "block";
  setTimeout(() => init3D(asteroids), 50);
};

closeBtn.addEventListener("click", close3DView);
