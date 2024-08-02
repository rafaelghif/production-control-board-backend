import { QueryTypes } from "sequelize";

import connectionDatabase from "../configs/database.js";
// import { initialData } from "../helpers/seed.js";
import ControlBoardPlanning from "./controlBoardPlanning.js";
import ControlBoardPlanningDetail from "./controlBoardPlanningDetail.js";
import ControlBoardSetting from "./controlBoardSetting.js";
import ControlBoardSettingDetail from "./controlBoardSettingDetail.js";
import { ControlBoardSummary } from "./controlBoardSummary.js";
import Department from "./department.js";
import Line from "./line.js";
import OrderComplete from "./orderComplete.js";
import OrderCompleteCable from "./orderCompleteCable.js";
import OrderCompleteNode from "./orderCompleteNode.js";
import User from "./user.js";
import YmbLine from "./ymbLine.js";

const models = {};

// connectionDatabase.sync({ force: true }).then(async () => {
//     await initialData();
// });

connectionDatabase.sync();

connectionDatabase.query(
	"CREATE OR REPLACE VIEW v_controlboardplannings AS SELECT p.LineId, p.date as planningDate, HOUR(pd.time) AS planningTime, pd.sequence, pd.qty,pd.remark,breakTime FROM controlboardplannings AS p JOIN controlboardplanningdetails AS pd ON p.id = pd.ControlBoardPlanningId WHERE p.inActive = 0 AND pd.inActive = 0 ORDER BY p.date, pd.sequence ASC",
	{ type: QueryTypes.RAW },
);
connectionDatabase.query(
	"CREATE OR REPLACE VIEW v_ordercompletes AS SELECT LineId, CAST(createdAt AS DATE) AS createdDate, HOUR(createdAt) AS createdTime, COUNT(*) AS total FROM ordercompletes AS oc GROUP BY LineId, CAST(createdAt AS DATE), HOUR(createdAt)",
	{ type: QueryTypes.RAW },
);
connectionDatabase.query(
	"CREATE OR REPLACE VIEW v_ordercompletes_cable AS SELECT LineId, CAST(createdAt AS DATE) AS createdDate, HOUR(createdAt) AS createdTime, COUNT(*) AS total FROM ordercompletecables AS oc GROUP BY LineId, CAST(createdAt AS DATE), HOUR(createdAt)",
	{ type: QueryTypes.RAW },
);
connectionDatabase.query(
	"CREATE OR REPLACE VIEW v_ordercompletes_half AS select ordercompletes.LineId AS LineId,(case when (cast(ordercompletes.createdAt as time) between '00:00' and '00:30') then cast((ordercompletes.createdAt - interval 1 day) as date) else cast(ordercompletes.createdAt as date) end) AS createdDate,(case when (cast(ordercompletes.createdAt as time) between '06:30:00' and '07:30:59') then '6' when (cast(ordercompletes.createdAt as time) between '07:31:00' and '08:30:59') then '7' when (cast(ordercompletes.createdAt as time) between '08:31:00' and '09:30:59') then '8' when (cast(ordercompletes.createdAt as time) between '09:31:00' and '10:30:59') then '9' when (cast(ordercompletes.createdAt as time) between '10:31:00' and '11:30:59') then '10' when (cast(ordercompletes.createdAt as time) between '11:31:00' and '12:30:59') then '11' when (cast(ordercompletes.createdAt as time) between '12:31:00' and '13:30:59') then '12' when (cast(ordercompletes.createdAt as time) between '13:31:00' and '14:30:59') then '13' when (cast(ordercompletes.createdAt as time) between '14:31:00' and '15:30:59') then '14' when (cast(ordercompletes.createdAt as time) between '15:31:00' and '16:30:59') then '15' when (cast(ordercompletes.createdAt as time) between '16:31:00' and '17:30:59') then '16' when (cast(ordercompletes.createdAt as time) between '17:31:00' and '18:30:59') then '17' when (cast(ordercompletes.createdAt as time) between '18:31:00' and '19:30:59') then '18' when (cast(ordercompletes.createdAt as time) between '19:31:00' and '20:30:59') then '19' when (cast(ordercompletes.createdAt as time) between '20:31:00' and '21:30:59') then '20' when (cast(ordercompletes.createdAt as time) between '21:31:00' and '22:30:59') then '21' when (cast(ordercompletes.createdAt as time) between '22:31:00' and '23:30:59') then '22' when (cast(ordercompletes.createdAt as time) between '23:31:00' and '23:59:59') then '23' when (cast(ordercompletes.createdAt as time) between '00:00:00' and '00:30:59') then '23' when (cast(ordercompletes.createdAt as time) between '00:31:00' and '01:30:59') then '0' when (cast(ordercompletes.createdAt as time) between '01:31:00' and '02:30:59') then '1' when (cast(ordercompletes.createdAt as time) between '02:31:00' and '03:30:59') then '2' when (cast(ordercompletes.createdAt as time) between '03:31:00' and '04:30:59') then '3' when (cast(ordercompletes.createdAt as time) between '04:31:00' and '05:30:59') then '4' when (cast(ordercompletes.createdAt as time) between '05:31:00' and '06:30:59') then '5' end) AS createdTime from ordercompletes",
	{ type: QueryTypes.RAW },
);
connectionDatabase.query(
	"CREATE OR REPLACE VIEW v_ordercompletes_half_cable AS select ordercompletecables.LineId AS LineId,(case when (cast(ordercompletecables.createdAt as time) between '00:00' and '00:30') then cast((ordercompletecables.createdAt - interval 1 day) as date) else cast(ordercompletecables.createdAt as date) end) AS createdDate,(case when (cast(ordercompletecables.createdAt as time) between '06:30:00' and '07:30:59') then '6' when (cast(ordercompletecables.createdAt as time) between '07:31:00' and '08:30:59') then '7' when (cast(ordercompletecables.createdAt as time) between '08:31:00' and '09:30:59') then '8' when (cast(ordercompletecables.createdAt as time) between '09:31:00' and '10:30:59') then '9' when (cast(ordercompletecables.createdAt as time) between '10:31:00' and '11:30:59') then '10' when (cast(ordercompletecables.createdAt as time) between '11:31:00' and '12:30:59') then '11' when (cast(ordercompletecables.createdAt as time) between '12:31:00' and '13:30:59') then '12' when (cast(ordercompletecables.createdAt as time) between '13:31:00' and '14:30:59') then '13' when (cast(ordercompletecables.createdAt as time) between '14:31:00' and '15:30:59') then '14' when (cast(ordercompletecables.createdAt as time) between '15:31:00' and '16:30:59') then '15' when (cast(ordercompletecables.createdAt as time) between '16:31:00' and '17:30:59') then '16' when (cast(ordercompletecables.createdAt as time) between '17:31:00' and '18:30:59') then '17' when (cast(ordercompletecables.createdAt as time) between '18:31:00' and '19:30:59') then '18' when (cast(ordercompletecables.createdAt as time) between '19:31:00' and '20:30:59') then '19' when (cast(ordercompletecables.createdAt as time) between '20:31:00' and '21:30:59') then '20' when (cast(ordercompletecables.createdAt as time) between '21:31:00' and '22:30:59') then '21' when (cast(ordercompletecables.createdAt as time) between '22:31:00' and '23:30:59') then '22' when (cast(ordercompletecables.createdAt as time) between '23:31:00' and '23:59:59') then '23' when (cast(ordercompletecables.createdAt as time) between '00:00:00' and '00:30:59') then '23' when (cast(ordercompletecables.createdAt as time) between '00:31:00' and '01:30:59') then '0' when (cast(ordercompletecables.createdAt as time) between '01:31:00' and '02:30:59') then '1' when (cast(ordercompletecables.createdAt as time) between '02:31:00' and '03:30:59') then '2' when (cast(ordercompletecables.createdAt as time) between '03:31:00' and '04:30:59') then '3' when (cast(ordercompletecables.createdAt as time) between '04:31:00' and '05:30:59') then '4' when (cast(ordercompletecables.createdAt as time) between '05:31:00' and '06:30:59') then '5' end) AS createdTime from ordercompletecables",
	{ type: QueryTypes.RAW },
);
connectionDatabase.query(
	"CREATE OR REPLACE VIEW v_ordercompletes_half_total AS select v_ordercompletes_half.LineId AS LineId,v_ordercompletes_half.createdDate AS createdDate,v_ordercompletes_half.createdTime AS createdTime,count(0) AS total from v_ordercompletes_half group by v_ordercompletes_half.LineId,v_ordercompletes_half.createdDate,v_ordercompletes_half.createdTime",
	{ type: QueryTypes.RAW },
);
connectionDatabase.query(
	"CREATE OR REPLACE VIEW v_ordercompletes_half_total_cable AS select v_ordercompletes_half_cable.LineId AS LineId,v_ordercompletes_half_cable.createdDate AS createdDate,v_ordercompletes_half_cable.createdTime AS createdTime,count(0) AS total from v_ordercompletes_half_cable group by v_ordercompletes_half_cable.LineId,v_ordercompletes_half_cable.createdDate,v_ordercompletes_half_cable.createdTime",
	{ type: QueryTypes.RAW },
);
connectionDatabase.query(
	"CREATE OR REPLACE VIEW v_ptr AS SELECT LineId,model,DAY(createdAt) as createdDay,MONTH(createdAt) as createdMonth,YEAR(createdAt) as createdYear,COUNT(model) as total FROM ordercompletes GROUP BY LineId,model,DAY(createdAt),MONTH(createdAt),YEAR(createdAt) ORDER BY DAY(createdAt),MONTH(createdAt),YEAR(createdAt),model ASC;",
	{ type: QueryTypes.RAW },
);
connectionDatabase.query(
	"CREATE OR REPLACE VIEW v_ptr_cable AS SELECT LineId,model,DAY(createdAt) as createdDay,MONTH(createdAt) as createdMonth,YEAR(createdAt) as createdYear,COUNT(model) as total FROM ordercompletecables GROUP BY LineId,model,DAY(createdAt),MONTH(createdAt),YEAR(createdAt) ORDER BY DAY(createdAt),MONTH(createdAt),YEAR(createdAt),model ASC;",
	{ type: QueryTypes.RAW },
);

models.User = User;
models.Department = Department;
models.Line = Line;
models.ControlBoardSetting = ControlBoardSetting;
models.ControlBoardSettingDetail = ControlBoardSettingDetail;
models.ControlBoardPlanning = ControlBoardPlanning;
models.ControlBoardPlanningDetail = ControlBoardPlanningDetail;
models.OrderComplete = OrderComplete;
models.OrderCompleteCable = OrderCompleteCable;
models.OrderCompleteNode = OrderCompleteNode;
models.ControlBoardSummary = ControlBoardSummary;
models.YmbLine = YmbLine;

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

models.ControlBoardSetting.hasMany(models.ControlBoardSettingDetail);
models.ControlBoardSettingDetail.belongsTo(models.ControlBoardSetting);

models.ControlBoardPlanning.hasMany(models.ControlBoardPlanningDetail);
models.ControlBoardPlanningDetail.belongsTo(models.ControlBoardPlanning);

models.Line.hasMany(models.OrderComplete);
models.OrderComplete.belongsTo(models.Line);

models.Line.hasMany(models.ControlBoardSummary);
models.ControlBoardSummary.belongsTo(models.Line);

models.Line.hasMany(models.YmbLine);
models.YmbLine.belongsTo(models.Line);

models.Line.hasMany(models.OrderCompleteCable);
models.OrderCompleteCable.belongsTo(models.Line);

models.Line.hasMany(models.OrderCompleteNode);
models.OrderCompleteNode.belongsTo(models.Line);

export default models;
