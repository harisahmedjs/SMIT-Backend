import dotenv from 'dotenv'
dotenv.config()

export const  jwt_Secret = process.env.JWT_SECRET
export const port = process.env.PORT