const express = require("express");
const { sequelize } = require("./src/models");
require("dotenv").config();
const routes = require("./src/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./src/middlewares/errorHandler");
const setupSwagger = require("./config/swagger");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/v1", routes);

setupSwagger(app);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((err) => console.log(err?.message));
