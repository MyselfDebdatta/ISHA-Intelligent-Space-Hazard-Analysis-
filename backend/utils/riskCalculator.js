// utils/riskCalculator.js

function calculateRisk(asteroid) {

  // 1. Extract required data
  const diameter =
    asteroid.estimated_diameter.kilometers.estimated_diameter_max;

  const approachData = asteroid.close_approach_data[0];

  const missDistance =
    parseFloat(approachData.miss_distance.kilometers);

  const velocity =
    parseFloat(approachData.relative_velocity.kilometers_per_hour);

  const isHazardous =
    asteroid.is_potentially_hazardous_asteroid;

  // 2. Diameter Score
  let diameterScore = 0;
  if (diameter < 0.05) diameterScore = 1;
  else if (diameter <= 0.2) diameterScore = 3;
  else diameterScore = 5;

  // 3. Distance Score
  let distanceScore = 0;
  if (missDistance > 5000000) distanceScore = 1;
  else if (missDistance >= 1000000) distanceScore = 3;
  else distanceScore = 5;

  // 4. Velocity Score
  let velocityScore = 0;
  if (velocity < 20000) velocityScore = 1;
  else if (velocity <= 50000) velocityScore = 3;
  else velocityScore = 5;

  // 5. Hazard Bonus
  const hazardBonus = isHazardous ? 3 : 0;

  // 6. Final Risk Score
  const riskScore =
    diameterScore + distanceScore + velocityScore + hazardBonus;

  // 7. Risk Level
  let riskLevel = "Low";
  if (riskScore >= 12) riskLevel = "High";
  else if (riskScore >= 7) riskLevel = "Medium";

  // 8. Return clean result
  return {
    name: asteroid.name,
    diameter_km: diameter,
    miss_distance_km: missDistance,
    velocity_kmph: velocity,
    hazardous: isHazardous,
    risk_score: riskScore,
    risk_level: riskLevel
  };
}

module.exports = calculateRisk;
