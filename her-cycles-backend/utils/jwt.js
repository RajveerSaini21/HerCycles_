const jwt = require('jsonwebtoken');

// Create a JWT token
function signToken(id, secret, expiresIn) {
  return jwt.sign({ id }, secret, { expiresIn });
}

// Middleware to protect routes
function requireAuth(roles = []) {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;

      if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.auth = { id: decoded.id };

      // Optional: add role-based guard later
      if (roles.length && !roles.includes(req.auth.role)) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  };
}

module.exports = { signToken, requireAuth };
