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
    actualWorkingTimeAll: {
        type: DataTypes.INTEGER,
        allowNull: false,
        set(val) {
            this.setDataValue("actualWorkingTimeAll", parseInt(val));
        }
    },
    productLoadingPlanQty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        set(val) {
            this.setDataValue("productLoadingPlanQty", parseInt(val));
        }
    },
    productLoadingPlanBacklogQty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        set(val) {
            this.setDataValue("productLoadingPlanBacklogQty", parseInt(val) || null);
        }
    },
    tackTime: {
        type: DataTypes.FLOAT,
        allowNull: false,
        set(val) {
            this.setDataValue("tackTime", parseFloat(val));
        }
    },
    totalProcessTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        set(val) {
            this.setDataValue("totalProcessTime", parseInt(val));
        }
    },
    actualWorkingTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        set(val) {
            this.setDataValue("actualWorkingTime", parseInt(val));
        }
    },
    actualWorkingTimeOvertime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        set(val) {
            this.setDataValue("actualWorkingTimeOvertime", parseInt(val) || null);
        }
    },
    manPowerCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        set(val) {
            this.setDataValue("manPowerCount", parseInt(val));
        }
    },
    manPowerAdditionalCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        set(val) {
            this.setDataValue("manPowerAdditionalCount", parseInt(val) || null);
        }
    },
    manPowerAbleToSpare: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        set(val) {
            this.setDataValue("manPowerAbleToSpare", parseInt(val) || null);
        }
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