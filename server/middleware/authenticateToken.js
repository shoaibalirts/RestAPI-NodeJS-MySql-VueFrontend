import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  // exclude login and sign up routes from jwt validation

  if (req.path.includes("signin") || req.path.includes("signup")) return next();

  const token = req.cookies.token;
  if (!token) return res.status(401).json("No token was provided.");

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json("Invalid token.");
  }
};
export default authenticateToken;
