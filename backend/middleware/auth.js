const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.user = decoded; // contains user id
    next();
  } catch {
    res.sendStatus(401);
  }
};
