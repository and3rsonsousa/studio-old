import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

export function CalendarData(today?: Dayjs) {
	today = today || dayjs();
	const startOfMonth = today.startOf("month");
	const startOfMonthFull = today.startOf("month").startOf("week");
	const endOfMonth = today.endOf("month");
	const endOfMonthFull = today.endOf("month").endOf("week");

	const monthFull: any[] = [];
	let month = [];
	const daysIMonthFull = endOfMonthFull.diff(startOfMonthFull, "d") + 1;
	const daysIMonth = endOfMonth.diff(startOfMonth, "d") + 1;

	let currentDay = startOfMonthFull;

	for (let i = 0; i < daysIMonthFull / 7; i++) {
		monthFull[i] = [];
		for (let j = 0; j < 7; j++) {
			monthFull[i][j] = {};
			monthFull[i][j].date = currentDay;

			if (currentDay.month() == today.month()) {
				month.push({ date: currentDay, items: [] });
			}
			currentDay = currentDay.add(1, "day");
		}
	}

	return {
		today,
		startOfMonth,
		startOfMonthFull,
		endOfMonth,
		endOfMonthFull,
		daysIMonthFull,
		daysIMonth,
		month,
		monthFull,
	};
}
