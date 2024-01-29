import models from "../models/index.js";

export const initialData = async () => {
	try {
		const pdDepartment = await models.Department.create(
			{
				name: "PCBA Department 2",
				abbreviation: "PD2",
				createdBy: "40703191",
				updatedBy: "40703191",
			},
			{ logging: false },
		);

		const pedDepartment = await models.Department.create(
			{
				name: "Process Engineer Department",
				abbreviation: "PED",
				createdBy: "40703191",
				updatedBy: "40703191",
			},
			{ logging: false },
		);

		const line = await models.Line.create(
			{
				name: "FLXA 4W",
				createdBy: "40703191",
				updatedBy: "40703191",
				DepartmentId: pdDepartment.id,
			},
			{ logging: false },
		);

		await models.User.bulkCreate(
			[
				{
					badgeId: "40703191",
					password: "abcd1234;",
					name: "Muhammad Rafael Ghifari",
					role: "Super User",
					createdBy: "40703191",
					updatedBy: "40703191",
					DepartmentId: pedDepartment.id,
				},
				{
					badgeId: "40703120",
					password: "abcd1234;",
					name: "Siska Marini",
					role: "Admin",
					createdBy: "40703191",
					updatedBy: "40703191",
					DepartmentId: pdDepartment.id,
					LineId: line.id,
				},
			],
			{ logging: false },
		);
	} catch (err) {
		console.error(err);
	}
};
