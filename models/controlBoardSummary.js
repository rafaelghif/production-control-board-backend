import { DataTypes } from "sequelize";

import connectionDatabase from "../configs/database.js";

export const ControlBoardSummary = connectionDatabase.define(
	"ControlBoardSummary",
	{
		id: {
			type: DataTypes.CHAR(36),
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		planningDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		planningTime: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		planningSequence: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		planningQty: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		planningQtyCumulative: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		totalCompleteOrder: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		totalCompleteOrderCumulative: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		differenceQty: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
	},
);
