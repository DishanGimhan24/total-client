import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(200).json({ success: false, message: "Access Denied!" })
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return res.status(200).json({ success: false, message: "Invalid Token" })
        req.user = user;
        next();
    })
}