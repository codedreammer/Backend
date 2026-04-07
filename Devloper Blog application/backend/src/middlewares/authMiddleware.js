    const jwt = require("jsonwebtoken");

    const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
    return res.status(401).json({ message: "No token" });
}

    try {
    const token = header.split(" ")[1]; 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
        console.log("JWT ERROR:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
    };

    module.exports = authMiddleware;