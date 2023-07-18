import connectionDatabase from "../configs/database.js";
import { DataTypes } from "sequelize";

const ControlBoardPlanning = connectionDatabase.define("ControlBoardPlanning", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    date: {
        type: DataTypes.DATEONLY,
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

export default ControlBoardPlanning;