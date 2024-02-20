import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const env = process.env.ENV ?? "Development";

const developmentConfig = {
	host: process.env.DEV_HOST,
	port: process.env.DEV_PORT,
	database: process.env.DEV_DATABASE,
	username: process.env.DEV_USERNAME,
	password: process.env.DEV_PASSWORD,
};

const productionConfig = {
	host: process.env.PROD_HOST,
	port: process.env.PROD_PORT,
	database: process.env.PROD_DATABASE,
	username: process.env.PROD_USERNAME,
	password: process.env.PROD_PASSWORD,
};

const developmentConfigSql = {
	host: process.env.DEV_HOST_SQL,
	port: process.env.DEV_PORT_SQL,
	database: process.env.DEV_DATABASE_SQL,
	username: process.env.DEV_USERNAME_SQL,
	password: process.env.DEV_PASSWORD_SQL,
};

const productionConfigSql = {
	host: process.env.DEV_HOST_SQL,
	port: process.env.DEV_PORT_SQL,
	database: process.env.DEV_DATABASE_SQL,
	username: process.env.DEV_USERNAME_SQL,
	password: process.env.DEV_PASSWORD_SQL,
};

const config = env === "Development" ? developmentConfig : productionConfig;
const configSql =
	env === "Development" ? developmentConfigSql : productionConfigSql;

const connectionDatabase = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
		port: config.port,
		dialect: "mysql",
		define: {
			charset: "utf8",
			collate: "utf8_general_ci",
		},
		timezone: "+07:00",
	},
);

export const connectionDatabaseSql = new Sequelize(
	configSql.database,
	configSql.username,
	configSql.password,
	{
		host: configSql.host,
		port: configSql.port,
		dialect: "mssql",
		timezone: "+07:00",
		dialectOptions: {
			options: {
				encrypt: false,
			},
		},
	},
);

try {
	connectionDatabase.authenticate();
	console.log("Connection MySQL has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database MySQL:", error);
}

try {
	connectionDatabaseSql.authenticate();
	console.log("Connection MS SQL has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database MS SQL:", error);
}

export default connectionDatabase;
