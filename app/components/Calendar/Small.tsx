import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { BsFileX } from "react-icons/bs";
import {
	HiOutlineCheck,
	HiOutlineChevronLeft,
	HiOutlineChevronRight,
} from "react-icons/hi";
import { CalendarData } from "~/utils/calendar";

export default function SmallCalendar({
	today,
	time,
	callback,
}: {
	today: Dayjs;
	time?: Dayjs;
	callback: Function;
}) {
	const selected = dayjs(today);
	const [calendar, setCalendar] = useState(CalendarData(today));
	const [values, setValues] = useState({
		value: today,
		time: time,
	});

	return (
		<div className="font-light text-gray-700 bg-white rounded-lg shadow-lg w-36 shadow-gray-400/50 text-xxx">
			<div className="flex items-center justify-between p-2 ">
				<div>
					<button
						className="p-1 button button-small"
						onClick={() =>
							setCalendar(() =>
								CalendarData(
									calendar.today.subtract(1, "month")
								)
							)
						}
					>
						<HiOutlineChevronLeft />
					</button>
				</div>
				<div className="text-xs font-medium text-gray-700 uppercase">
					{calendar.today.format("MMMM")}
				</div>
				<div>
					<button
						className="p-1 button button-small"
						onClick={() =>
							setCalendar(() =>
								CalendarData(calendar.today.add(1, "month"))
							)
						}
					>
						<HiOutlineChevronRight />
					</button>
				</div>
			</div>
			<div className="grid grid-cols-7 px-1 mb-1 font-medium text-center text-gray-700">
				{["D", "S", "T", "Q", "Q", "S", "S"].map((item, index) => (
					<div className="px-1 text-gray-700 py-0.5" key={index}>
						{item}
					</div>
				))}
			</div>
			{calendar.monthFull.map((week, i) => (
				<div className="grid grid-cols-7 px-1" key={i}>
					{week.map((day: any, j: number) => (
						<div
							key={j + 1 * i + 1}
							className={`px-1 py-0.5 ${
								day.date.month() !== calendar.today.month()
									? "text-gray-300"
									: ""
							} hover:bg-gray-100 cursor-pointer rounded-md text-center ${
								day.date.format("YYYY-MM-DD") ===
								selected.format("YYYY-MM-DD")
									? "bg-interdimensional text-white hover:bg-interdimensional-dark"
									: ""
							}`}
							onClick={() => {
								if ("time" in values) {
									callback(
										day.date.format("YYYY-MM-DD"),
										values.time?.format("HH:mm")
									);
								} else {
									callback(day.date.format("YYYY-MM-DD"));
								}
							}}
						>
							{day.date.format("D")}
						</div>
					))}
				</div>
			))}
			{time && (
				<div className="p-2 ">
					<div className="flex border rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-interdimensional focus-within:border-interdimensional focus-within:hover:border-interdimensional shadow-gray-200">
						<input
							type="time"
							name=""
							id=""
							className="w-full px-2 py-1 text-sm font-light text-center border-0 rounded-lg rounded-r-none focus:outline-none focus:ring-transparent"
							value={values.time?.format("HH:mm:ss")}
							onChange={(event) => {
								setValues(() => ({
									...values,
									time: dayjs(
										values.value.format("YYYY-MM-DD") +
											event?.target.value
									),
								}));
							}}
						/>
						<button
							className="p-1 px-2 rounded-l-none button button-small"
							onClick={() =>
								callback(
									values.value.format("YYYY-MM-DD"),
									values.time?.format("HH:mm:ss")
								)
							}
						>
							<HiOutlineCheck className="text-xl " />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
