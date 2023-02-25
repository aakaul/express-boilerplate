import cookieParser from "cookie-parser";
import express from "express";
import { createConnection } from "typeorm";

import config from "config";

import session from "express-session";

import { Action, createExpressServer,useContainer } from "routing-controllers";

const MySQLStore = require("express-mysql-session")(session);

const sessionStore = new MySQLStore(config.get("DB"));

import compression from "compression";

import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"


import { Container } from 'typedi';


import path from "path"


import typeOrmConfig from "./config/typeOrm.config"

useContainer(Container)

function createDBConnection() {
	return createConnection(typeOrmConfig as any).then(connection => {
		console.info("DB Connected");
		return connection;
	}).catch(error => console.log(error));
}

function createServer() {
	return createExpressServer({
		routePrefix:"/api",
		controllers: [path.join(__dirname,"/routes/api/**/*.controller.js")],
		classTransformer: true,
		defaultErrorHandler:true,
		validation: false,
		interceptors:[path.join(__dirname,"/interceptors/**/*.interceptor.js")],
		middlewares:[path.join(__dirname,"/middlewares/**/*.middleware.js")],
		authorizationChecker:(action:Action,roles:string[])=>{
			const authMiddleware = Container.get(AuthMiddleware)
			return authMiddleware.authorizedChecker(action,roles)
		}
	});
}

function setUpCompression(app:any) {
	app.use(compression());
}


import swaggerOptions from "./config/swagger.config"
import { AuthMiddleware } from "./middlewares/auth";
const swaggerSpec = swaggerJSDoc(swaggerOptions);

function setUpSwagger(app:{use:(...args:any)=>any,get:(...args:any)=>any}) {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	app.get("/swagger.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});	

	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

}



function setUpSession(app:{use:(...data:any)=>any}) {
	app.use(
		session({
			secret: config.get("sessionSecret"),
			store: sessionStore,
			saveUninitialized: false,
			resave: true,
		})
	);
		
}

function setUpParsers(app:{use:(...data:any)=>any}) {
	app.use(express.urlencoded({ limit: "50mb", extended: true }));
	app.use(cookieParser());
}

async function main() {
	await createDBConnection()
	const app = createServer();
	setUpCompression(app)
	setUpParsers(app)
	setUpSession(app)
	setUpSwagger(app)
	return app
}



export default {
	main
};
