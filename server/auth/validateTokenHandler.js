import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7,authHeader.length).trimLeft();
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User is not authorized:", err);
        }
        req.user = decoded.user;
        next();
      });
      if (!token) {
        res.status(403);
        throw new Error("Token is missing");
      }
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});
export default validateToken;
