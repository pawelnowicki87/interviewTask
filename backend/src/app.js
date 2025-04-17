import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { messageRouter } from "./routers/messageRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import sequelize from "./utils/database.js"

// Initialize environment variables
config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Root route
app.use(messageRouter);

// Global Error Handling Middleware
app.use(errorHandler);

// DB Connection
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
