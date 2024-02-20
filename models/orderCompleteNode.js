import { DataTypes } from "sequelize";

import connectionDatabase from "../configs/database.js";

const OrderCompleteNode = connectionDatabase.define("OrderCompleteNode", {
	id: {
		type: DataTypes.CHAR(36),
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	model: {
		type: DataTypes.STRING(150),
		allowNull: false,
	},
	serialNumber: {
		type: DataTypes.STRING(11),
		allowNull: false,
		unique: true,
	},
	serialNumberType: {
		type: DataTypes.ENUM("Plasma Order Tag", "Inhouse"),
		allowNull: false,
	},
	barcodeIssueNo: {
		type: DataTypes.STRING(30),
		allowNull: true,
		defaultValue: null,
		set(val) {
			this.setDataValue("barcodeIssueNo", val || null);
		},
	},
	sapLinkageNo: {
		type: DataTypes.STRING(25),
		allowNull: true,
		defaultValue: null,
		set(val) {
			this.setDataValue("sapLinkageNo", val || null);
		},
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

export default OrderCompleteNode;
