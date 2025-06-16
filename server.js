const express = require("express");
const { sequelize } = require("./src/models");
require("dotenv").config();
const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/errorHandler");
const setupSwagger = require("./config/swagger");

const app = express();
app.use(express.json());
app.use("/v1", routes);

setupSwagger(app);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((err) => console.log(err?.message));
