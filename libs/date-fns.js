import { add, format } from "date-fns";

export const addDay = (date, totalDay) => {
	return format(
		add(new Date(date), { days: totalDay }),
		"yyyy-MM-dd",
	).toString();
};
