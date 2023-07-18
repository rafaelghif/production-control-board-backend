import connectionDatabase from "../configs/database.js";
import { DataTypes } from "sequelize";

const ControlBoardSetting = connectionDatabase.define("ControlBoardSetting", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    actualWorkingTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    planQty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    manPowerRegular: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shiftTotal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdBy: {
        type: DataTypes.STRING(8),
        allowNull: false,
        validate: {
            min: 8
        }
    },
    updatedBy: {
        type: DataTypes.STRING(8),
        allowNull: false,
        validate: {
            min: 8
        }
    }
});

export default ControlBoardSetting;