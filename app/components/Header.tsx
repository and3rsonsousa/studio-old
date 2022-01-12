import { useState } from "react";
import { CgBoard } from "react-icons/cg";
import {
	HiOutlineCalendar,
	HiOutlineViewList,
	HiPlus,
	HiX,
} from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { IAccount, IBasic, ICampaign, IUser } from "~/types";
import dayjs from "dayjs";

const menu = {
	initial: {
		opacity: 0,
		scale: 0.9,
		y: -10,
	},
	animate: {
		opacity: 1,
		scale: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		scale: 0.9,
		y: -10,
	},
	transition: {
		ease: "easeOut",
	},
};

const item = {
	initial: {
		opacity: 0,
		x: 100,
	},
	animate: {
		opacity: 1,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: 100,
	},
	transition: {
		ease: "easeOut",
	},
};

const Header = ({
	profile,
	profiles,
	accounts,
	steps,
	tags,
	flows,
	campaigns,
	start,
}: {
	profile: IUser;
	profiles: IUser[];
	accounts: IAccount[];
	steps: IBasic[];
	tags: IBasic[];
	flows: IBasic[];
	campaigns: ICampaign[];
	start?: string;
}) => {
	const [microPopup, showMicroPopup] = useState(true);
	const [fullPopup, showfullPopup] = useState(true);

	const [action, setAction] = useState({
		name: "",
		description: "",
		account: "",
		profile_creator: profile.id,
		profile_responsible: profile.id,
		flow: flows[0].id,
		step: steps[0].id,
		tag: tags[0].id,
		image: "",
		start: start ? start : dayjs().format("YYYY-MM-DD[T]HH:mm:ss[+00:00]"),
		end: "",
		campaign: "",
	});

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center">
				<div>
					<button className="text-xl button button-small button-invisible">
						<HiOutlineCalendar />
					</button>
				</div>
				<div>
					<button className="text-xl button button-small button-invisible">
						<CgBoard />
					</button>
				</div>
				<div>
					<button className="text-xl button button-small button-invisible">
						<HiOutlineViewList />
					</button>
				</div>
			</div>
			<div></div>
			<div className="relative group">
				{microPopup ? (
					<button
						className="button button-primary button-circle"
						onClick={() => {
							showMicroPopup(false);
							showfullPopup(false);
						}}
					>
						<HiX />
					</button>
				) : (
					<button
						className="button button-primary button-circle"
						onClick={() => showMicroPopup(true)}
					>
						<HiPlus />
					</button>
				)}
				<AnimatePresence>
					{microPopup && (
						<motion.div
							layout
							className={`absolute overflow-hidden origin-top-right right-0 prose bg-white rounded-lg shadow-2xl z-50 ${
								fullPopup
									? "w-80 lg:max-w-xl lg:w-screen"
									: "w-64"
							} top-12 shadow-gray-400 `}
							initial={menu.initial}
							animate={menu.animate}
							exit={menu.exit}
							transition={menu.transition}
						>
							<motion.h3
								layout="position"
								className="px-4 py-2 m-0 lg:px-8 lg:py-4 whitespace-nowrap"
							>
								Nova Ação
							</motion.h3>
							<div className="px-4 py-2 max-h-[70vh] overflow-y-auto lg:px-8 lg:py-4 overflow-x-hidden">
								<form method="POST">
									<input
										type="hidden"
										name="profile_creator"
										value={action.profile_creator}
									/>
									<div>
										<motion.label
											layout="position"
											transition={item.transition}
											htmlFor="name"
											className="label"
										>
											Título
										</motion.label>
										<motion.input
											layout
											transition={item.transition}
											type="text"
											name="name"
											id="name"
											className="w-full input"
										/>
									</div>
									{fullPopup && (
										<AnimatePresence>
											<motion.div
												layout="position"
												className="mt-4"
												initial={item.initial}
												animate={item.animate}
												exit={item.exit}
												transition={item.transition}
											>
												<label
													htmlFor="descripton"
													className="label"
												>
													Descrição
												</label>
												<textarea
													rows={4}
													name="descripton"
													id="descripton"
													className="w-full input"
												/>
											</motion.div>
										</AnimatePresence>
									)}
									<div
										className={
											fullPopup
												? "lg:grid gap-4 grid-cols-2"
												: ""
										}
									>
										<div className="mt-4">
											<motion.label
												layout="position"
												transition={item.transition}
												className="label"
												htmlFor="account"
											>
												Conta
											</motion.label>
											<motion.select
												layout
												transition={item.transition}
												id="account"
												name="account"
												className={`input`}
												onChange={(event) =>
													setAction(() => ({
														...action,
														account:
															event.target.value,
													}))
												}
												value={action.account}
											>
												<option value=""></option>
												{accounts.map((account) => (
													<option value={account.id}>
														{account.name}
													</option>
												))}
											</motion.select>
										</div>

										{fullPopup && (
											<AnimatePresence>
												<motion.div
													layout="position"
													className="mt-4"
													transition={item.transition}
												>
													<label
														htmlFor="profile_responsible"
														className="label"
													>
														Responsável
													</label>
													<select
														name="profile_responsible"
														id="profile_responsible"
														className={`input`}
														onChange={(event) =>
															setAction(() => ({
																...action,
																profile_responsible:
																	event.target
																		.value,
															}))
														}
														value={
															action.profile_responsible
														}
													>
														{profiles.map(
															(account) => (
																<option
																	value={
																		account.id
																	}
																>
																	{
																		account.name
																	}
																</option>
															)
														)}
													</select>
												</motion.div>
											</AnimatePresence>
										)}
									</div>

									{fullPopup && (
										<AnimatePresence>
											<motion.div
												layout="position"
												className="mt-8"
												transition={item.transition}
											>
												<motion.label
													layout="position"
													transition={item.transition}
													className="label"
												>
													Fluxo
												</motion.label>
												<motion.div
													layout
													className="flex space-x-2"
													role="radiogroup"
												>
													{flows.map((flow) => (
														<div
															className={`relative flex ring-interdimensional ring-offset-2 items-center w-1/4 rounded-full overflow-x-hidden focus-within:ring`}
														>
															<input
																type="radio"
																name="flow"
																id={`flow-${flow.id}`}
																className="absolute -left-8"
																checked={
																	action.flow ===
																	flow.id
																}
																tabIndex={
																	action.flow ===
																	flow.id
																		? 0
																		: -1
																}
																onChange={() =>
																	setAction(
																		() => ({
																			...action,
																			flow: flow.id,
																		})
																	)
																}
															/>

															<label
																htmlFor={`flow-${flow.id}`}
																className={` ${
																	flow.id ===
																	action.flow
																		? flow.slug +
																		  "-bg"
																		: ""
																} p-2 text-xs rounded-full overflow-x-hidden text-ellipsis w-full text-center uppercase font-medium `}
															>
																{flow.name}
															</label>
														</div>
													))}
												</motion.div>
											</motion.div>
										</AnimatePresence>
									)}

									{fullPopup && (
										<AnimatePresence>
											<motion.div
												layout="position"
												className="mt-8"
												transition={item.transition}
											>
												<motion.label
													layout="position"
													transition={item.transition}
													className="label"
												>
													Status
												</motion.label>
												<motion.div
													layout
													className="flex space-x-2"
													role="radiogroup"
												>
													{steps.map((step) => (
														<div
															className={`relative flex ring-interdimensional ring-offset-2 items-center w-1/4 rounded-full overflow-x-hidden focus-within:ring`}
														>
															<input
																type="radio"
																name="step"
																id={`step-${step.id}`}
																className="absolute -left-8"
																checked={
																	action.step ===
																	step.id
																}
																tabIndex={
																	action.step ===
																	step.id
																		? 0
																		: -1
																}
																onChange={() =>
																	setAction(
																		() => ({
																			...action,
																			step: step.id,
																		})
																	)
																}
															/>
															<label
																htmlFor={`step-${step.id}`}
																className={` ${
																	step.id ===
																	action.step
																		? step.slug +
																		  "-bg"
																		: ""
																} p-2 text-xs rounded-full overflow-x-hidden text-ellipsis w-full text-center uppercase font-medium `}
															>
																{step.name}
															</label>
														</div>
													))}
												</motion.div>
											</motion.div>
										</AnimatePresence>
									)}

									<div className="mt-8">
										<motion.label
											layout="position"
											transition={item.transition}
											className="label"
										>
											Tag
										</motion.label>
										<motion.div
											layout
											className="flex flex-wrap "
											role="radiogroup"
										>
											{tags.map((tag, index) =>
												index >= 2 ? (
													fullPopup && (
														<AnimatePresence>
															<motion.div
																layout
																className={`relative w-1/2 flex ring-interdimensional ring-offset-2 items-center ${
																	fullPopup
																		? "lg:w-1/5"
																		: ""
																} rounded-full overflow-x-hidden focus-within:ring`}
															>
																<input
																	type="radio"
																	name="tag"
																	id={`tag-${tag.id}`}
																	className="absolute -left-8"
																	checked={
																		action.tag ===
																		tag.id
																	}
																	tabIndex={
																		action.tag ===
																		tag.id
																			? 0
																			: -1
																	}
																	onChange={() =>
																		setAction(
																			() => ({
																				...action,
																				tag: tag.id,
																			})
																		)
																	}
																/>
																<label
																	htmlFor={`tag-${tag.id}`}
																	className={` ${
																		tag.id ===
																		action.tag
																			? tag.slug +
																			  "-bg"
																			: ""
																	} p-2 text-xs rounded-full w-full text-center uppercase font-medium `}
																>
																	{tag.name}
																</label>
															</motion.div>
														</AnimatePresence>
													)
												) : (
													<AnimatePresence>
														<motion.div
															transition={
																item.transition
															}
															layout
															className={`relative w-1/2 flex ring-interdimensional ring-offset-2 items-center ${
																fullPopup
																	? "lg:w-1/5"
																	: ""
															} rounded-full overflow-x-hidden focus-within:ring`}
														>
															<input
																type="radio"
																name="tag"
																id={`tag-${tag.id}`}
																className="absolute -left-8"
																checked={
																	action.tag ===
																	tag.id
																}
																tabIndex={
																	action.tag ===
																	tag.id
																		? 0
																		: -1
																}
																onChange={() =>
																	setAction(
																		() => ({
																			...action,
																			tag: tag.id,
																		})
																	)
																}
															/>
															<label
																htmlFor={`tag-${tag.id}`}
																className={` ${
																	tag.id ===
																	action.tag
																		? tag.slug +
																		  "-bg"
																		: ""
																} p-2 text-xs rounded-full w-full text-center uppercase font-medium `}
															>
																{tag.name}
															</label>
														</motion.div>
													</AnimatePresence>
												)
											)}
										</motion.div>
									</div>

									<div className="mt-4">
										<motion.label
											layout="position"
											transition={item.transition}
											htmlFor="name"
											className="label"
										>
											Image
										</motion.label>
									</div>
									<div className="mt-4">
										<motion.label
											layout="position"
											transition={item.transition}
											htmlFor="name"
											className="label"
										>
											Start
										</motion.label>
									</div>
									<div className="mt-4">
										<motion.label
											layout="position"
											transition={item.transition}
											htmlFor="name"
											className="label"
										>
											End
										</motion.label>
									</div>
									<div className="mt-4">
										<motion.label
											layout="position"
											transition={item.transition}
											htmlFor="name"
											className="label"
										>
											Campaign
										</motion.label>
									</div>
								</form>
								{/* <pre>
									{JSON.stringify(action, undefined, 2)}
								</pre> */}
							</div>
							<div className="grid grid-cols-2">
								{!fullPopup ? (
									<button
										className="p-4 text-xs font-medium tracking-wider uppercase rounded-t-none button button-full "
										onClick={() => showfullPopup(true)}
									>
										Mais Opções
									</button>
								) : (
									<button
										className="p-4 text-xs font-medium tracking-wider uppercase rounded-t-none button button-full "
										onClick={() => {
											showfullPopup(false);
										}}
									>
										Menos Opções
									</button>
								)}
								<button
									className="p-4 text-xs font-medium tracking-wider uppercase rounded-t-none rounded-l-none button-primary button button-full "
									onClick={() => {}}
								>
									Adicionar
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Header;
