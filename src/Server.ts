import compression from "compression";
import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import path from "path";
import { Action, createExpressServer, RoutingControllersOptions, useContainer, useExpressServer } from "routing-controllers";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Hash } from "./utils/Hash";
import { Container } from "typedi";
import helmet from "helmet";
import { createConnection } from "typeorm";
import swaggerOptions from "./config/swagger.config";
import typeOrmConfig from "./config/typeOrm.config";
import { App } from "./instances/app";
import { AuthMiddleware } from "./middlewares/auth";
import morgan, { token } from "morgan";
const MySQLStore = require("express-mysql-session")(session);
import chalk from "chalk";
import { urlencoded } from "body-parser";
import { NodeCacheCustom } from "./utils/nodeCache";
import { NodeCacheCustomInstance } from "./instances/nodeCache";
import { RedisInstance } from "./instances/redis";
const sessionStore = new MySQLStore(config.get("DB"));

useContainer(Container);

function createDBConnection() {
	return createConnection(typeOrmConfig as any)
		.then((connection) => {
			console.info("DB Connected");
			return connection;
		})
		.catch((error) => console.log(error));
}

function createServer(app?: any) {
	const routingControllerOptions: RoutingControllersOptions = {
		routePrefix: "api",
		controllers: [path.join(__dirname, "/routes/**/**/*.controller.js")],
		classTransformer: true,
		defaultErrorHandler: false,
		validation: false,
		cors: true,
		interceptors: [path.join(__dirname, "/interceptors/**/*.interceptor.js")],
		middlewares: [path.join(__dirname, "/middlewares/**/*.middleware.js")],
		authorizationChecker: (action: Action, roles: string[]) => {
			const authMiddleware = Container.get(AuthMiddleware);
			return authMiddleware.authorizedChecker(action, roles);
		},
	};
	if (app) {
		useExpressServer(app, routingControllerOptions);
	}
	return createExpressServer(routingControllerOptions);
}

function setUpCompression(app: any) {
	app.use(compression());
}

// need to whitelist only few apis
function setUpCors(app: any) {
	app.use(cors());
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);

function setUpSwagger(app: { use: (...args: any) => any; get: (...args: any) => any }) {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	app.get("/swagger.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});

	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

function setUpSession(app: { use: (...data: any) => any }) {
	app.use(
		session({
			secret: config.get("sessionSecret"),
			store: sessionStore,
			saveUninitialized: false,
			resave: false,
			genid: function (req) {
				return Hash.uuid(); // use UUIDs for session IDs
			},
		})
	);
}

function setUpParsers(app: { use: (...data: any) => any }) {
	app.use(express.urlencoded({ limit: "50mb", extended: true }));
	app.use(cookieParser());
}

/*
note: for firebase
const { initializeApp, cert } = require("firebase-admin/app");
function setupFireBase(app: { use: (...data: any) => any }) {
	const serviceAccPath = config.get("firebaseServicePath");
	const storageBucket = config.get("storageBucket");
	initializeApp({
		credential: cert(serviceAccPath),
		storageBucket,
	});
}
*/

function setUpRender(app: { engine: (...data: any) => any; set: (...data: any) => any }) {
	app.set("view engine", "hbs");
	app.engine(
		"hbs",
		engine({
			layoutsDir: __dirname + "/../views/layouts",
			extname: "hbs",
			partialsDir: __dirname + "/../views/partials/",
			defaultLayout: "index",
		})
	);
}

function initNodeCache() {
	NodeCacheCustomInstance.setInstance(new NodeCacheCustom({ stdTTL: 100, checkperiod: 120 }));
}


function setUpBodyParser(app) {
	app.use(urlencoded({ extended: false }));
}


function setUpMorganLogger(app) {
	const morganMiddleware = morgan(function (tokens, req, res) {
		token("reqBody", (req, res) => "\n REQUEST BODY: " + JSON.stringify((req as any).body, null, "\t") + "\n");
		token("reqHeader", (req, res) => "\n REQUEST Header: " + JSON.stringify((req as any).headers, null, "\t") + "\n");
		token("resBody", (req, res) => JSON.stringify((res as any).body));
		return [
			"----------------------------------------------------------------------\n",
			chalk.hex("#00FF00").bold(tokens.method(req, res)),
			chalk.hex("#ffb142").bold(tokens.status(req, res)),
			chalk.hex("#34ace0").bold(tokens.url(req, res)),
			chalk.hex("#ff5252").bold(tokens["response-time"](req, res) + " ms"),
			chalk.hex("#f78fb3").bold("@ " + tokens.date(req, res)),
			chalk.yellow(tokens["remote-addr"](req, res)),
			chalk.hex("#fffa65").bold("from " + tokens.referrer(req, res)),
			chalk.hex("#1e90ff")(tokens["user-agent"](req, res)),
			chalk.hex("#ffb142").bold(tokens.reqBody(req, res)),
			chalk.hex("#ffb142").bold(tokens.reqHeader(req, res)),
			chalk.hex("#00FF00").bold(tokens.resBody(req, res)),
			"\n---------------------------------------------------------------------\n",
		].join(" ");
	});

	app.use(morganMiddleware);
}
function setUpStatic(app) {
	app.use("/public", express.static(path.join(__dirname, "/../public")));
}

function setupRedis() {
	new RedisInstance();
}

async function main() {
	await createDBConnection();
	let app = express();
    app.use(helmet())
	setUpMorganLogger(app);
	App.setInstance(app);
	setUpBodyParser(app);
	setUpStatic(app);
	setUpSession(app);
	setupRedis();
	createServer(app);
	setUpRender(app);
	setUpParsers(app);
	// setupFireBase(app);
	setUpSwagger(app);
	setUpCompression(app);
	initNodeCache();
	return app;
}

export default {
	main,
};
