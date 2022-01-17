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
	HiOutlineMinusCircle,
	HiOutlinePencilAlt,
	HiOutlineX,
	HiOutlineXCircle,
} from "react-icons/hi";
import { BiDuplicate } from "react-icons/bi";
import Avatar from "../Avatar";
import request, { gql } from "graphql-request";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import SmallCalendar from "../Calendar/Small";

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
	const name = useRef(action.name);
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

	const updateName = async (id: string) => {
		mutate((data: any) => {
			return newData(data, action, { name: name.current });
		}, false);

		const mutateRequest = await request(
			"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master",
			gql`
				mutation ($name: String!, $id: ID!) {
					updateAction(where: { id: $id }, data: { name: $name }) {
						id
					}
				}
			`,
			{
				id,
				name: name.current,
			}
		);

		mutate();

		return mutateRequest;
	};

	const updateDate = async (
		id: string,
		date: { start: string; end: string; time: string }
	) => {
		mutate((data: any) => {
			return newData(data, action, {
				start: date.start,
				end: date.end,
				time: date.time,
			});
		}, false);

		const mutateRequest = await request(
			"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master",
			gql`
				mutation (
					$start: String!
					$end: String!
					$time: String!
					$id: ID!
				) {
					updateAction(
						where: { id: $id }
						data: { start: $start, end: $end, time: $time }
					) {
						id
					}
				}
			`,
			{
				id,
				start: date.start,
				end: date.end,
				time: date.time,
			}
		);

		mutate();

		return mutateRequest;
	};

	const deleteAction = async (id: string) => {
		mutate((data: any) => {
			return newData(data, action);
		}, false);

		const mutateRequest = await request(
			"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master",
			gql`
				mutation ($id: ID!) {
					deleteAction(where: { id: $id }) {
						id
					}
				}
			`,
			{
				id,
			}
		);

		mutate();

		return mutateRequest;
	};

	return (
		<AnimatePresence>
			<motion.div
				layout
				transition={{ ease: "easeOut" }}
				className={`action-${
					action.step?.slug
				}-bg relative rounded-lg ${
					big ? "p-4" : "p-2 pl-4 "
				} origin-top  ${
					action.validating ? " scale-90 opacity-25" : ""
				}`}
			>
				<div className="flex space-x-2">
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
					{/* Menu Lateral */}
					<div className="relative group">
						<button className="p-1 button button-ghost">
							<HiOutlineDotsHorizontal />
						</button>
						<div className="absolute top-0 right-0 flex invisible text-xl transition-all duration-300 scale-90 translate-x-4 bg-gray-900 rounded-lg shadow-xl opacity-0 shadow-gray-800/50 transform-cpu group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 group-hover:scale-100">
							{/* Editar a Ação */}
							<button className="px-2 py-1 rounded-r-none button button-invert button-ghost">
								<HiOutlinePencilAlt />
							</button>

							{/* Selecionar ação/Action */}
							<button
								className="px-2 py-1 rounded-none button button-invert button-ghost"
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
								{selected ? (
									<HiOutlineMinusCircle />
								) : (
									<HiOutlineCheckCircle />
								)}
							</button>
							{/* Duplicar ação/Action */}
							<button className="px-2 py-1 rounded-none button button-invert button-ghost">
								<BiDuplicate />
							</button>
							{/* Exclui/Deleta a ação/Action */}
							<button
								onClick={() => deleteAction(action.id)}
								className="px-2 py-1 rounded-l-none button button-invert button-ghost"
							>
								<HiOutlineX />
							</button>
						</div>
					</div>
				</div>
				{/* Nome da Ação */}
				<ContentEditable
					html={name.current}
					onChange={(event) =>
						(name.current = event?.target.value
							.replace(/(<([^>]+)>)/gi, "")
							.toString())
					}
					className={`${
						big ? "text-lg font-medium" : "text-sm"
					} leading-tight p-0 pb-1 hover:border-gray-200 focus:outline-none w-full border-b-2 border-b-transparent resize-none`}
					onBlur={() => {
						action.name !== name.current
							? updateName(action.id)
							: null;
					}}
				/>
				{/* Descrição */}
				{/* Caso seja big, visualização grande, mostra 3 linhas da mesma */}
				{big && action.description && (
					<div className={`text-sm mt-1 line-clamp-3 text-gray-600`}>
						{action.description}
					</div>
				)}
				{big && action.start ? (
					<div className={`${big ? "mt-2" : "mt-1"}`}>
						<div className="text-sm text-gray-600">
							{action.start.format("D [de] MMMM")}{" "}
							{action.time
								? action.time.format(", [às] HH[h]mm")
								: ""}
						</div>
						<div className="flex items-center space-x-2">
							{isLate(action) && (
								<div className="w-2 h-2 rounded-full animate-pulse bg-semantic-error"></div>
							)}
							<StartEndDate
								action={action}
								updateDate={updateDate}
							/>
						</div>
					</div>
				) : null}

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

				<div
					className={`absolute bottom-0 left-0 w-full h-1 rounded-b-lg ${action.step?.slug}-bg`}
				></div>

				{/* <div className="absolute bottom-0 left-0 flex w-full h-1 overflow-hidden rounded-b">
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
				</div> */}

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

function newData(data: any, action: IAction, value?: any) {
	const accounts = data.profile.accounts || [];
	const accountIndex =
		data.profile.accounts?.findIndex(
			(account: any) => account.id === action.account.id
		) || 0;

	const account = accounts[accountIndex];
	const actions = account.actions || [];

	const actionIndex =
		actions.findIndex((_action: any) => _action.id === action.id) || 0;

	let _data = data;
	if (value) {
		const oldAction = actions[actionIndex];
		const newAction = Object.assign(
			oldAction,
			{ validating: true },
			{ ...value }
		);

		_data.profile.accounts[accountIndex].actions[actionIndex] = newAction;
	} else {
		_data.profile.accounts[accountIndex].actions.splice(actionIndex, 1);
	}

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
		<div className="relative grid grid-cols-3 mb-2">
			<div className="relative">
				<button
					className={`bg-gray-200 ${action.flow?.slug}-bg badge rounded-r-none w-full`}
					onClick={() => {
						setShowFlows(!showFlows);
						setShowTags(false);
						setShowSteps(false);
					}}
				>
					{big ? (action.flow ? action.flow.name : "...") : ""}
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
					className={`bg-gray-200 ${action.tag?.slug}-bg badge rounded-none w-full`}
					onClick={() => {
						setShowTags(!showTags);
						setShowFlows(false);
						setShowSteps(false);
					}}
				>
					{big ? (action.tag ? action.tag.name : "...") : ""}
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
					className={`bg-gray-200 ${action.step?.slug}-bg badge rounded-l-none w-full`}
					onClick={() => {
						setShowSteps(!showSteps);
						setShowFlows(false);
						setShowTags(false);
					}}
				>
					{big ? (action.step ? action.step.name : "...") : ""}
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
					className={`absolute left-0 z-10 p-2 origin-top-left bg-white border rounded-lg shadow-lg shadow-gray-400/50 top-8 ${
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
									className="flex items-center justify-start w-full p-2 space-x-1 font-medium tracking-wider text-gray-500 uppercase rounded-lg text-xx hover:bg-gray-100"
									onClick={() => {
										update(action?.id, item);
										closeAll();
									}}
								>
									<div
										className={`w-2 h-2 rounded-full ${item.slug}-bg`}
									></div>
									<div className="overflow-hidden text-ellipsis">
										{item.name}
									</div>
								</button>
							)
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function StartEndDate({
	action,
	updateDate,
}: {
	action: IAction;
	updateDate: Function;
}) {
	const [start, setStart] = useState(false);
	const [end, setEnd] = useState(false);

	const handleStart = (value: string) => {
		updateDate(action.id, {
			start: value || "",
			end: action.end || "",
			time: action.time || "",
		});
		setStart(false);
	};

	const handleEnd = (value: string) => {
		updateDate(action.id, {
			start: action.start || "",
			end: value || "",
			time: action.time || "",
		});
		setEnd(false);
	};

	return (
		<>
			<div
				className="relative"
				onClick={() => {
					setEnd(false);
					setStart(!start);
				}}
			>
				<div className="font-medium tracking-wide text-gray-400 uppercase transition-colors cursor-pointer hover:text-gray-700 text-xxx">
					{action.end && "início "}
					{action.start.fromNow()}
				</div>
				<AnimatePresence>
					{start && (
						<motion.div
							className="absolute left-0 z-10 origin-top-left border rounded-lg top-4"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
						>
							<SmallCalendar
								today={action.start}
								callback={handleStart}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			{action.end && (
				<div
					className="relative"
					onClick={() => {
						setStart(false);
						setEnd(!end);
					}}
				>
					<div className="font-medium tracking-wide text-gray-400 uppercase transition-colors cursor-pointer hover:text-gray-700 text-xxx">
						entrega {action.end.fromNow()}
					</div>
					<AnimatePresence>
						{end && (
							<motion.div
								className="absolute left-0 z-10 origin-top-left border rounded-lg top-4"
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.9, opacity: 0 }}
							>
								<SmallCalendar
									today={action.start}
									callback={handleStart}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			)}
		</>
	);
}
