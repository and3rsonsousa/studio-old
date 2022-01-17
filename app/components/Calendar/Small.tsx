import { Dayjs } from "dayjs";
import { CalendarData } from "~/utils/calendar";

export default function SmallCalendar({
	today,
	callback,
}: {
	today: Dayjs;
	callback: Function;
}) {
	const { monthFull } = CalendarData(today);
	return (
		<div className="font-light text-gray-700 bg-white rounded-lg shadow-lg w-36 shadow-gray-400/50 text-xxx">
			<div className="grid grid-cols-7 p-1 pb-1 mb-1 text-center border-b">
				{["D", "S", "T", "Q", "Q", "S", "S"].map((item) => (
					<div className="px-1 text-gray-700 py-0.5">{item}</div>
				))}
			</div>
			{monthFull.map((week) => (
				<div className="grid grid-cols-7 px-1">
					{week.map((day: any) => (
						<div
							className={`px-1 py-0.5 ${
								day.date.month() !== today.month()
									? "text-gray-300"
									: ""
							} hover:bg-gray-100 cursor-pointer rounded-md text-center ${
								day.date.format("YYYY-MM-DD") ===
								today.format("YYYY-MM-DD")
									? "bg-interdimensional text-white hover:bg-interdimensional-dark"
									: ""
							}`}
							onClick={() =>
								callback(day.date.format("YYYY-MM-DD"))
							}
						>
							{day.date.format("D")}
						</div>
					))}
				</div>
			))}
		</div>
	);
}
