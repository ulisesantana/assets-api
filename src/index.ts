import "reflect-metadata";
import {createConnection} from "typeorm";
import App from "./app";


createConnection({
    type: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: +process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS || "root",
    database: process.env.MYSQL_DB || "assets_db",
    logging: ["query", "error"],
    entities: [
        "dist/entities/*.js" 
      ]
}).then(async connection => {
    
    const app = new App(connection);
    app.listen(+process.env.PORT || 3000);

    console.log("Koa application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));