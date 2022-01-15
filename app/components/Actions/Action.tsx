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
import request, { gql } from "graphql-request";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

dayjs.tz.setDefault("America/Fortaleza");

export default ({
	action,
	flows,
	steps,
	tags,
	big = true,
	selected = false,
	setSelectedActions,
	mutate,
}: {
	action: IAction;
	flows: IBasic[];
	steps: IBasic[];
	tags: IBasic[];
	big?: Boolean;
	selected?: Boolean;
	setSelectedActions: any;
	mutate: Function;
}) => {
	const updateFlow = async (id: string, flow: IBasic) => {
		mutate((data: any) => {
			return newData(data, action, { flow: flow });
		}, false);

		const mutateRequest = await request(
			"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master",
			gql`
				mutation ($flow: ID!, $id: ID!) {
					updateAction(
						where: { id: $id }
						data: { flow: { connect: { id: $flow } } }
					) {
						id
					}
				}
			`,
			{
				id,
				flow: flow.id,
			}
		);

		mutate();
		return mutateRequest;
	};

	const updateTag = async (id: string, tag: IBasic) => {
		mutate((data: any) => {
			return newData(data, action, { tag: tag });
		}, false);

		const mutateRequest = await request(
			"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master",
			gql`
				mutation ($tag: ID!, $id: ID!) {
					updateAction(
						where: { id: $id }
						data: { tag: { connect: { id: $tag } } }
					) {
						id
					}
				}
			`,
			{
				id,
				tag: tag.id,
			}
		);

		mutate();
		return mutateRequest;
	};

	const updateStep = async (id: string, step: IBasic) => {
		mutate((data: any) => {
			return newData(data, action, { step: step });
		}, false);

		const mutateRequest = await request(
			"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master",
			gql`
				mutation ($step: ID!, $id: ID!) {
					updateAction(
						where: { id: $id }
						data: { step: { connect: { id: $step } } }
					) {
						id
					}
				}
			`,
			{
				id,
				step: step.id,
			}
		);

		mutate();

		return mutateRequest;
	};

	return (
		<AnimatePresence>
			<motion.div
				layout
				className={`action-${
					action.step?.slug
				}-bg relative rounded-lg ${
					big ? "p-4" : "p-2 pl-4 "
				}  cursor-pointer origin-top  ${
					action.validating ? " scale-90 opacity-25" : ""
				}`}
			>
				{/* Tag - Flow - Step */}
				<HeadMenu
					big={big}
					steps={steps}
					tags={tags}
					flows={flows}
					action={action}
					updateFlow={updateFlow}
					updateTag={updateTag}
					updateStep={updateStep}
				/>
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
										? old.filter(
												(item) => item !== action.id
										  )
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

				<div className="absolute bottom-0 left-0 flex w-full h-1 overflow-hidden rounded-b">
					{steps.map((step: IBasic) => (
						<div
							key={step.id}
							className={`${step.slug}-bg h-1 ${
								step.slug === action.step?.slug
									? " w-full"
									: " w-12"
							}`}
						></div>
					))}
				</div>
				{/* <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden rounded-b-lg group">
					<div className="absolute bottom-0 left-0 flex w-full h-1 transition-all group-hover:h-8 ">
						{steps.map((step: IBasic) => (
							<button
								key={step.id}
								className={`${step.slug}-bg ${
									step.slug === action.step?.slug
										? " w-full "
										: " w-8 "
								} hover:w-full transition-all uppercase text-xxx tracking-wide font-medium overflow-hidden duration-300 text-center`}
								// onClick={() => updateStep(action.id, step)}
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
							</button>
						))}
					</div>
				</div> */}
				{/* <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
								 {step.name}
							 </div>  */}

				<div className="absolute left-0 -translate-x-1/2 top-3">
					<Avatar avatar={action.account} small={true} />
					<Avatar
						avatar={action.profile_responsible}
						small={true}
						border={true}
						_className="-mt-1"
						url={`/dashboard/profiles/${action.profile_responsible?.id}`}
					/>
				</div>

				{action.validating && (
					<motion.div
						initial={{ scale: 2, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 2, opacity: 0 }}
						transition={{ animate: { duration: 500 } }}
						className="absolute inset-0 grid place-items-center"
					>
						<div className="w-6 h-6 border-4 rounded-full border-interdimensional animate-spin border-t-gray-100"></div>
					</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
	);
};

function newData(data: any, action: IAction, value: any) {
	const accounts = data.profile.accounts || [];
	const accountIndex =
		data.profile.accounts?.findIndex(
			(account: any) => account.id === action.account.id
		) || 0;

	const account = accounts[accountIndex];
	const actions = account.actions || [];

	const actionIndex =
		actions.findIndex((_action: any) => _action.id === action.id) || 0;

	const oldAction = actions[actionIndex];
	const newAction = Object.assign(
		oldAction,
		{ validating: true },
		{ ...value }
	);

	const _data = data;
	_data.profile.accounts[accountIndex].actions[actionIndex] = newAction;

	return _data;
}

function HeadMenu({
	action,
	flows,
	steps,
	tags,
	big,
	updateFlow,
	updateTag,
	updateStep,
}: {
	action: IAction;
	flows: IBasic[];
	steps: IBasic[];
	tags: IBasic[];
	big: Boolean;
	updateFlow: Function;
	updateTag: Function;
	updateStep: Function;
}) {
	const [showFlows, setShowFlows] = useState(false);
	const [showTags, setShowTags] = useState(false);
	const [showSteps, setShowSteps] = useState(false);

	function closeAll() {
		setShowFlows(() => false);
		setShowTags(() => false);
		setShowSteps(() => false);
	}

	return (
		<div className="flex pr-6 mb-2">
			<div className="relative">
				<button
					className={`${action.flow?.slug}-bg badge min-w-[50px] rounded-r-none `}
					onClick={() => {
						setShowFlows(!showFlows);
						setShowTags(false);
						setShowSteps(false);
					}}
				>
					{big ? action.flow?.name : ""}
				</button>
				<SubMenu
					actionItem={action.flow}
					action={action}
					items={flows}
					show={showFlows}
					closeAll={closeAll}
					update={updateFlow}
				/>
			</div>
			<div className="relative">
				<button
					className={`${action.tag?.slug}-bg badge min-w-[50px] rounded-none `}
					onClick={() => {
						setShowTags(!showTags);
						setShowFlows(false);
						setShowSteps(false);
					}}
				>
					{big ? action.tag?.name : ""}
				</button>
				<SubMenu
					actionItem={action.tag}
					action={action}
					items={tags}
					show={showTags}
					closeAll={closeAll}
					update={updateTag}
				/>
			</div>
			<div className="relative">
				<button
					className={`${action.step?.slug}-bg badge min-w-[50px] rounded-l-none `}
					onClick={() => {
						setShowSteps(!showSteps);
						setShowFlows(false);
						setShowTags(false);
					}}
				>
					{big ? action.step?.name : ""}
				</button>
				<SubMenu
					actionItem={action.step}
					action={action}
					items={steps}
					show={showSteps}
					closeAll={closeAll}
					update={updateStep}
				/>
			</div>
		</div>
	);
}

function SubMenu({
	actionItem,
	action,
	show,
	closeAll,
	items,
	update,
}: {
	actionItem: IBasic | undefined;
	action: IBasic | undefined;
	show: Boolean;
	closeAll: Function;
	items: IBasic[];
	update: Function;
}) {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.9, opacity: 0 }}
					className={`absolute left-0 z-10 p-2 origin-top bg-white border rounded-lg shadow-lg shadow-gray-300 top-8 ${
						items.length > 7
							? "grid grid-cols-3 w-80"
							: items.length > 4
							? "grid grid-cols-2 w-60"
							: ""
					}`}
				>
					{items.map(
						(item, index) =>
							item.slug !== actionItem?.slug && (
								<button
									key={index}
									className="flex items-center justify-start w-full p-2 space-x-2 text-xs font-medium tracking-wider text-gray-500 uppercase rounded-lg hover:bg-gray-200"
									onClick={() => {
										update(action?.id, item);
										closeAll();
									}}
								>
									<div
										className={`w-2 h-2 rounded-full ${item.slug}-bg`}
									></div>
									<div>{item.name}</div>
								</button>
							)
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
