import { QueryTypes } from "sequelize";
import connectionDatabase from "../configs/database.js";
import { initialData } from "../helpers/seed.js";
import ControlBoardPlanning from "./controlBoardPlanning.js";
import ControlBoardPlanningDetail from "./controlBoardPlanningDetail.js";
import ControlBoardSetting from "./controlBoardSetting.js";
import Department from "./department.js";
import Line from "./line.js";
import OrderComplete from "./orderComplete.js";
import User from "./user.js";
import { ControlBoardSummary } from "./controlBoardSummary.js";

const models = {}

// connectionDatabase.sync({ force: true }).then(async () => {
//     await initialData();
// });

connectionDatabase.sync();

connectionDatabase.query(`CREATE OR REPLACE VIEW v_controlboardplannings AS SELECT p.LineId, p.date as planningDate, HOUR(pd.time) AS planningTime, pd.sequence, pd.qty FROM controlboardplannings AS p JOIN controlboardplanningdetails AS pd ON p.id = pd.ControlBoardPlanningId WHERE p.inActive = 0 AND pd.inActive = 0 ORDER BY p.date, pd.sequence ASC`, { type: QueryTypes.RAW });
connectionDatabase.query(`CREATE OR REPLACE VIEW v_ordercompletes AS SELECT LineId, CAST(createdAt AS DATE) AS createdDate, HOUR(createdAt) AS createdTime, COUNT(*) AS total FROM ordercompletes AS oc GROUP BY LineId, CAST(createdAt AS DATE), HOUR(createdAt)`, { type: QueryTypes.RAW });

models.User = User;
models.Department = Department;
models.Line = Line;
models.ControlBoardSetting = ControlBoardSetting;
models.ControlBoardPlanning = ControlBoardPlanning;
models.ControlBoardPlanningDetail = ControlBoardPlanningDetail;
models.OrderComplete = OrderComplete;
models.ControlBoardSummary = ControlBoardSummary;

models.Department.hasMany(models.Line);
models.Line.belongsTo(models.Department);

models.Department.hasMany(models.User);
models.User.belongsTo(models.Department);

models.Line.hasMany(models.User);
models.User.belongsTo(models.Line);

models.Line.hasOne(models.ControlBoardSetting);
models.ControlBoardSetting.belongsTo(models.Line);

models.Line.hasMany(models.ControlBoardPlanning);
models.ControlBoardPlanning.belongsTo(models.Line);

models.ControlBoardPlanning.hasMany(models.ControlBoardPlanningDetail);
models.ControlBoardPlanningDetail.belongsTo(models.ControlBoardPlanning);

models.Line.hasMany(models.OrderComplete);
models.OrderComplete.belongsTo(models.Line);

models.Line.hasMany(models.ControlBoardSummary);
models.ControlBoardSummary.belongsTo(models.Line);

export default models;