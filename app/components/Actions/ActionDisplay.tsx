import { Action } from "~/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/pt-br";
import { isLate } from "~/utils/functions";
import {
	HiChevronLeft,
	HiChevronRight,
	HiOutlineCheckCircle,
	HiOutlineDotsHorizontal,
	HiOutlineX,
} from "react-icons/hi";
import { BiDuplicate } from "react-icons/bi";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

dayjs.tz.setDefault("America/Fortaleza");

export default ({
	action,
	big = true,
	selected = false,
}: {
	action: Action;
	big?: Boolean;
	selected?: Boolean;
}) => {
	const step = action.step?.slug;
	return (
		<div
			className={`w-full relative ${
				big ? "p-4" : "p-2"
			}  rounded-lg cursor-pointer ${step}-bg ${
				selected ? "bg-interdimensional/10" : ""
			}`}
		>
			<div
				className={`${
					big ? "text-lg font-medium" : "text-sm"
				} leading-tight  pr-4`}
			>
				{action.name}
			</div>
			{big && action.description && (
				<div className={`text-sm mt-2 line-clamp-3 text-gray-600`}>
					{action.description}
				</div>
			)}
			{action.startDate ? (
				<div className={`${big ? "mt-2" : "mt-1"}`}>
					<div className="text-sm text-gray-600">
						{action.startDate.format("D [de] MMMM[, às] H[h]mm")}
					</div>
					<div className="flex items-center space-x-2 font-medium tracking-wide text-gray-400 uppercase text-xxx">
						{isLate(action) && (
							<div className="w-2 h-2 rounded-full animate-pulse bg-semantic-error"></div>
						)}
						<div>
							{action.endDate && "início "}
							{action.startDate.fromNow()}
						</div>
						{action.endDate && (
							<div className="inline-block ">
								entrega {action.endDate.fromNow()}
							</div>
						)}
					</div>
				</div>
			) : null}
			<div className="absolute top-2 right-3 group">
				<button className="p-1 button button-ghost">
					<HiOutlineDotsHorizontal />
				</button>
				<div className="absolute top-0 right-0 flex invisible text-xl transition translate-x-4 bg-gray-900 rounded-lg shadow-xl opacity-0 shadow-gray-400 group-hover:opacity-100 group-hover:visible transform-cpu hover:translate-x-0">
					<button className="p-1 rounded-r-none button button-invert button-ghost">
						<HiChevronLeft />
					</button>
					<button className="p-1 rounded-none button button-invert button-ghost">
						<HiChevronRight />
					</button>
					<button className="p-1 rounded-none button button-invert button-ghost">
						<HiOutlineCheckCircle />
					</button>
					<button className="p-1 rounded-none button button-invert button-ghost">
						<BiDuplicate />
					</button>
					<button className="p-1 rounded-l-none button button-invert button-ghost">
						<HiOutlineX />
					</button>
				</div>
			</div>
		</div>
	);
};
