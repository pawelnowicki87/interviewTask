import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { messageRouter } from "./routers/messageRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { sequelize } from "./utils/database.js"
import { seedInitialMessages } from "./utils/seed.js";


// Initialize environment variables
config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // ⬅️ lub "*" na szybko, ale do dev tylko
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

// Middleware
app.use(bodyParser.json());

// Root route
app.use(messageRouter);

// Global Error Handling Middleware
app.use(errorHandler);

// DB Connection
sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Connection has been established successfully.");
    await seedInitialMessages();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
