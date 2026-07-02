import jwt from 'jsonwebtoken';

const SECRET_KEY = "mmumartgroup1";

function generateToken(user) {
  return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
}

function tokenRequired(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token missing" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { generateToken, tokenRequired };