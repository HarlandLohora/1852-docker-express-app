const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const path = require("path");
const app = express();
const routes = require("./routes");
let env = process.env.NODE_ENV;

if (!env) {
  env = "development";
}
//
const config = require(`./config/config.${env}.json`);

require("./config/database")(
  `mongodb://${config.databaseConfig.host}:27017/${config.databaseConfig.database}`
);

MongoClient.connect(
  `mongodb://${config.databaseConfig.host}:27017/${config.databaseConfig.database}`,
  function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    // db.close();
  }
);

// Config PORT default 3000
const port = process.env.port || 3000;
app.set("views", path.join(__dirname, "/views/"));
app.set("view engine", "ejs");
// Public assets
app.use(express.static("public"));

// Router Config
app.use(routes);

// Inicializar el servidor
app.listen(port, () => {
  console.log("Server initialiazed on port " + port);
});
