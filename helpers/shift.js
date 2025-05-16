import { addDays, addHours, format } from "date-fns";

const getOrderRange = (
	strCurrDate,
	strPreviousDate,
	strCurrDateFull,
	shiftType,
	usedHour,
) => {
	const range = {
		Short: {
			["06:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["07:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["08:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["09:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["10:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["11:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["12:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["13:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["14:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["15:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["16:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["17:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["18:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["19:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["20:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["21:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["22:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["23:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["00:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["01:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["02:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["03:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["04:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: strCurrDateFull,
			},
			["05:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: strCurrDateFull,
			},
		},
		Long: {
			["07:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["08:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["09:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["10:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["11:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["12:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["13:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["14:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["15:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["16:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["17:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["18:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["19:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["20:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["21:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["22:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["23:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["00:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["01:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["02:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["03:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["04:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: strCurrDateFull,
			},
			["05:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: strCurrDateFull,
			},
		},
	};

	return range[shiftType][usedHour];
};

const previousOrderRange = (
	strCurrDate,
	strPreviousDate,
	shiftType,
	usedHour,
) => {
	const range = {
		Short: {
			["06:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 06:30:00`,
			},
			["07:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 07:30:00`,
			},
			["08:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 08:30:00`,
			},
			["09:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 09:30:00`,
			},
			["10:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 10:30:00`,
			},
			["11:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 11:30:00`,
			},
			["12:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 12:30:00`,
			},
			["13:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 13:30:00`,
			},
			["14:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 14:30:00`,
			},
			["15:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 15:30:00`,
			},
			["16:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 16:30:00`,
			},
			["17:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 17:30:00`,
			},
			["18:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 18:30:00`,
			},
			["19:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 19:30:00`,
			},
			["20:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 20:30:00`,
			},
			["21:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 21:30:00`,
			},
			["22:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 22:30:00`,
			},
			["23:30"]: {
				start: `${strCurrDate} 06:30:00`,
				end: `${strCurrDate} 23:30:00`,
			},
			["00:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: `${strCurrDate} 00:30:00`,
			},
			["01:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: `${strCurrDate} 01:30:00`,
			},
			["02:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: `${strCurrDate} 02:30:00`,
			},
			["03:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: `${strCurrDate} 03:30:00`,
			},
			["04:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: `${strCurrDate} 04:30:00`,
			},
			["05:30"]: {
				start: `${strPreviousDate} 06:30:00`,
				end: `${strCurrDate} 05:30:00`,
			},
		},
		Long: {
			["07:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 07:00:00`,
			},
			["08:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 08:00:00`,
			},
			["09:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 09:00:00`,
			},
			["10:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 10:00:00`,
			},
			["11:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 11:00:00`,
			},
			["12:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 12:00:00`,
			},
			["13:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 13:00:00`,
			},
			["14:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 14:00:00`,
			},
			["15:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 15:00:00`,
			},
			["16:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 16:00:00`,
			},
			["17:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 17:00:00`,
			},
			["18:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 18:00:00`,
			},
			["19:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 19:00:00`,
			},
			["20:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 20:00:00`,
			},
			["21:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 21:00:00`,
			},
			["22:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 22:00:00`,
			},
			["23:00"]: {
				start: `${strCurrDate} 07:00:00`,
				end: `${strCurrDate} 23:00:00`,
			},
			["00:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: `${strCurrDate} 00:00:00`,
			},
			["01:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: `${strCurrDate} 01:00:00`,
			},
			["02:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: `${strCurrDate} 02:00:00`,
			},
			["03:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: `${strCurrDate} 03:00:00`,
			},
			["04:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: `${strCurrDate} 04:00:00`,
			},
			["05:00"]: {
				start: `${strPreviousDate} 07:00:00`,
				end: `${strCurrDate} 05:00:00`,
			},
		},
	};
	return range[shiftType][usedHour];
};

export const getShiftTime = (shiftType) => {
	const currentDate = new Date();
	const previousDay = addDays(currentDate, -1);
	const strPreviousDate = format(previousDay, "yyyy-MM-dd");
	const strCurrDate = format(currentDate, "yyyy-MM-dd");
	const strCurrDateFull = format(currentDate, "yyyy-MM-dd HH:mm:ss");

	const currentHour = currentDate.getHours();
	const currentMinute = currentDate.getMinutes();

	let usedHour = currentHour;
	let usedMinute = 0;

	if (shiftType === "Short") {
		if (currentMinute < 30) {
			const previousHours = addHours(currentDate, -1);
			usedHour = previousHours.getHours();
			usedMinute = 30;
		} else {
			usedMinute = 30;
		}
	}

	const pad = (num) => String(num).padStart(2, "0");
	usedHour = `${pad(usedHour)}:${pad(usedMinute)}`;

	const shiftOrderRange = getOrderRange(
		strCurrDate,
		strPreviousDate,
		strCurrDateFull,
		shiftType,
		usedHour,
	);

	const shiftOrderPrevious = previousOrderRange(
		strCurrDate,
		strPreviousDate,
		shiftType,
		usedHour,
	);

	return {
		order: shiftOrderRange,
		previousOrder: shiftOrderPrevious,
	};
};

export const getTimeRange = (shiftType) => {
	const currentDate = addHours(new Date(), -1);
	const previousDay = addDays(currentDate, -1);
	const strPreviousDate = format(previousDay, "yyyy-MM-dd");
	const strCurrDate = format(currentDate, "yyyy-MM-dd");
	const strCurrDateFull = format(currentDate, "yyyy-MM-dd HH:mm:ss");

	const currentHour = currentDate.getHours();
	const currentMinute = currentDate.getMinutes();

	let usedHour = currentHour;
	let usedMinute = 0;

	if (shiftType === "Short") {
		if (currentMinute < 30) {
			const previousHours = addHours(currentDate, -1);
			usedHour = previousHours.getHours();
			usedMinute = 30;
		} else {
			usedMinute = 30;
		}
	}

	const pad = (num) => String(num).padStart(2, "0");
	usedHour = `${pad(usedHour)}:${pad(usedMinute)}`;

	return usedHour;
};
