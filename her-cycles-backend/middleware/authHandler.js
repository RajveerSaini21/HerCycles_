const jwt = require("jsonwebtoken");

// Protect routes with JWT
function requireAuth(roles = []) {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization || "";
      const token = header.startsWith("Bearer ") ? header.slice(7) : null;

      if (!token) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.auth = { id: decoded.id };

      if (roles.length && !roles.includes(req.auth.role)) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  };
}

module.exports = { requireAuth };
