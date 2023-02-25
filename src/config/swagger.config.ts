import config from "config";

const swaggerDefinition = {
	info: {
		title: "Swagger Defination",
		version: "1.0.0",
		description: "API Defination",
	},
	host: config.get<string>("swagger.hostname"),
	basePath: "/",
};

export default {
	swaggerDefinition: swaggerDefinition,
	explorer: true,
	apis: ["**/*.yaml"],
};
