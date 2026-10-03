require("dotenv").config();

const app = require("./src/app");
const databaseConnection = require("./src/config/database");

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await databaseConnection();

        app.listen(PORT, () => {
            console.log(`server is started at port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

startServer();