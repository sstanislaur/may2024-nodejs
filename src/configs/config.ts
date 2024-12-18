import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGGO_URI || "mongo://localhost:27017/express-mongo"

}