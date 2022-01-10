import { IAction } from "~/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/pt-br";
import { isLate } from "~/utils/functions";
import {
	HiCheck,
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
	setSelectedActions,
}: {
	action: IAction;
	big?: Boolean;
	selected?: Boolean;
	setSelectedActions: any;
}) => {
	const step = action.step?.slug;
	return (
		<div
			className={`w-full relative ${
				big ? "p-4" : "p-2"
			}  rounded-lg cursor-pointer action-${action.tag?.slug}-bg `}
		>
			{/* Tag e Flow */}
			{(action.tag || action.flow) && (
				<div className="flex mb-1">
					<div
						className={`${action.flow?.slug}-bg badge rounded-r-none`}
					>
						{action.flow?.name}
					</div>
					<div
						className={`${action.step?.slug}-bg badge ${
							action.flow ? "rounded-l-none" : ""
						}`}
					>
						{action.step?.name}
					</div>
				</div>
			)}
			{/* Nome da Ação */}
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
			{action.start ? (
				<div className={`${big ? "mt-2" : "mt-1"}`}>
					<div className="text-sm text-gray-600">
						{action.start.format("D [de] MMMM[, às] H[h]mm")}
					</div>
					<div className="flex items-center space-x-2 font-medium tracking-wide text-gray-400 uppercase text-xxx">
						{isLate(action) && (
							<div className="w-2 h-2 rounded-full animate-pulse bg-semantic-error"></div>
						)}
						<div>
							{action.end && "início "}
							{action.start.fromNow()}
						</div>
						{action.end && (
							<div className="inline-block ">
								entrega {action.end.fromNow()}
							</div>
						)}
					</div>
				</div>
			) : null}
			<div className="absolute top-2 right-3 group">
				<button className="p-1 button button-ghost">
					<HiOutlineDotsHorizontal />
				</button>
				<div className="absolute top-0 right-0 flex invisible text-xl transition-all duration-300 scale-90 translate-x-4 bg-gray-900 rounded-lg shadow-xl opacity-0 shadow-gray-400 transform-cpu group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 group-hover:scale-100">
					{/* Voltar um Passo na realização */}
					<button className="p-1 rounded-r-none button button-invert button-ghost">
						<HiChevronLeft />
					</button>
					{/* Avançar um Passo na realização */}
					<button className="p-1 rounded-none button button-invert button-ghost">
						<HiChevronRight />
					</button>
					{/* Selecionar ação/Action */}
					<button
						className="p-1 rounded-none button button-invert button-ghost"
						onClick={() => {
							setSelectedActions((old: string[]) => {
								return selected
									? old.filter((item) => item !== action.id)
									: [...old, action.id];
							});
						}}
					>
						<HiOutlineCheckCircle />
					</button>
					{/* Duplicar ação/Action */}
					<button className="p-1 rounded-none button button-invert button-ghost">
						<BiDuplicate />
					</button>
					{/* Excluir ação/Action */}
					<button className="p-1 rounded-l-none button button-invert button-ghost">
						<HiOutlineX />
					</button>
				</div>
			</div>
			{selected && (
				<button
					className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 translate-x-1/2 -translate-y-1/2 rounded-full bg-interdimensional"
					onClick={() => {
						setSelectedActions((old: string[]) => {
							return old.filter((item) => item !== action.id);
						});
					}}
				>
					<HiCheck className="text-xl text-white" />
				</button>
			)}
		</div>
	);
};
