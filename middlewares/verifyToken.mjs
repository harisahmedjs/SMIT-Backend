import jwtSecret from "../config/jwt.mjs";
import Users from "../models/User.mjs";
import jwt from "jsonwebtoken";

async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.slice(7)

    if (!token) {
        res.status(401).send({ message: "No access!" })
        return
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)

        const tokenExists = await Users.findOne({ tokens: token })

        if (!tokenExists) {
            res.status(401).send({ message: "Invalid token!" })
            return
        }

        req.userId = decoded._id
        req.tokenToRemove = token

        next()
    } catch (e) {
        res.status(401).send({ message: "Invalid token!" })
    }
}

export default verifyToken