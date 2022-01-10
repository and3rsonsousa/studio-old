import { IAction, IBasic } from "~/types";
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
import Avatar from "../Avatar";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

dayjs.tz.setDefault("America/Fortaleza");

export default ({
	action,
	steps,
	big = true,
	selected = false,
	setSelectedActions,
}: {
	action: IAction;
	steps: IBasic[];
	big?: Boolean;
	selected?: Boolean;
	setSelectedActions: any;
}) => {
	return (
		<div
			className={`action-${action.step?.slug}-bg relative rounded-lg ${
				big ? "p-4" : "p-2 pl-4 "
			}  cursor-pointer`}
		>
			<div className="absolute top-4 -left-3">
				<Avatar avatar={action.account} small={true} />
			</div>
			{/* Tag e Flow */}
			{(action.tag || action.flow) && (
				<div className="flex pr-6 mb-1">
					<div
						className={`${action.flow?.slug}-bg badge min-w-[50px] rounded-r-none `}
					>
						{big ? action.flow?.name : ""}
					</div>
					<div
						className={`${action.tag?.slug}-bg badge min-w-[50px] ${
							action.flow ? "rounded-none" : ""
						}`}
					>
						{big ? action.tag?.name : ""}
					</div>
					<div
						className={`${
							action.step?.slug
						}-bg badge min-w-[50px] ${
							action.flow || action.tag ? "rounded-l-none" : ""
						}`}
					>
						{big ? action.step?.name : ""}
					</div>
				</div>
			)}
			{/* Nome da Ação */}
			<div
				className={`${
					big ? "text-lg font-medium" : "text-sm"
				} leading-tight  pr-6`}
			>
				{action.name}
			</div>

			{big && action.description && (
				<div className={`text-sm mt-2 line-clamp-3 text-gray-600`}>
					{action.description}
				</div>
			)}
			{big && action.start ? (
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
			<div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden rounded-b-lg group">
				<div className="absolute bottom-0 left-0 flex w-full h-1 transition-all group-hover:h-8 ">
					{steps.map((step: IBasic) => (
						<div
							key={step.id}
							className={`${step.slug}-bg ${
								step.slug === action.step?.slug
									? " w-full "
									: " w-8 "
							} hover:w-full transition-all uppercase text-xxx tracking-wide font-medium overflow-hidden duration-300 text-center`}
						>
							<div
								className={`w-full p-2 h-8 transition duration-500 ${
									step.slug === action.step?.slug
										? ""
										: "opacity-0 hover:opacity-100"
								}`}
							>
								{step.name}
							</div>
							{/* <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
							{step.name}
						</div> */}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
