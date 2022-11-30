const express = require('express');
const app = express();
const Port = 3000;
const Router = require('./routes');
const cors = require("cors");
const cookieParser = require('cookie-parser')
const errorHandlerMiddleware = require("./middlewares/error_handler_middleware");
//const swaggerUi = require("swagger-ui-express");
//const swaggerFile = require("./swagger_output.json");
require("./models");


app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
    origin: "*", 
    allowedHeaders: ["content-Type", "Authorization"],
    exposedHeaders: ["content-Type", "Authorization"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
    credential: "true",
    })
);

app.options("*", cors());

app.use("/", Router);
//app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandlerMiddleware);

app.listen(Port, () => {
    console.log(`${Port}번 서버 실행`);
});