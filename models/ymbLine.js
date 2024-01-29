import { DataTypes } from "sequelize";

import connectionDatabase from "../configs/database.js";

const YmbLine = connectionDatabase.define("YmbLine", {
	id: {
		type: DataTypes.CHAR(36),
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	model: {
		type: DataTypes.STRING(150),
		allowNull: false,
	},
	inActive: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	createdBy: {
		type: DataTypes.STRING(8),
		allowNull: false,
		validate: {
			min: 8,
		},
	},
	updatedBy: {
		type: DataTypes.STRING(8),
		allowNull: false,
		validate: {
			min: 8,
		},
	},
});

export default YmbLine;
