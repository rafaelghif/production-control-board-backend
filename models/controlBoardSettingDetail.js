import connectionDatabase from "../configs/database.js";
import { DataTypes } from "sequelize";

const ControlBoardSettingDetail = connectionDatabase.define("ControlBoardSettingDetail", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    sequence: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qty: {
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

export default ControlBoardSettingDetail;