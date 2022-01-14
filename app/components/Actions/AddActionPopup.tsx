import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import request, { gql } from "graphql-request";
import { useEffect, useState } from "react";
import {
	IAccount,
	IAction,
	IBasic,
	ICampaign,
	IDashboardIndex,
	IUser,
} from "~/types";

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

export default function AddActionPopup({
	microPopup,
	profile,
	accounts,
	profiles,
	flows,
	steps,
	tags,
	campaigns,
	start,
	mutate,
	mutateKey,
}: {
	microPopup: Boolean;
	profile: IUser;
	accounts: IAccount[];
	profiles: IUser[];
	flows: IBasic[];
	steps: IBasic[];
	tags: IBasic[];
	campaigns: ICampaign[];
	start?: string;
	mutate: Function;
	mutateKey: string;
}) {
	const [fullPopup, showfullPopup] = useState(false);

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
		start: start
			? start
			: dayjs()
					.set("h", 11)
					.set("m", 12)
					.set("s", Math.ceil(Math.random() * 50))
					.format("YYYY-MM-DD[T]HH:mm:ss[-03:00]"),
		end: "",
		campaign: "",
	});

	const [error, setError] = useState({ field: "", message: "" });
	const [virgin, setVirgin] = useState({
		name: true,
		account: true,
		profile_responsible: true,
		flow: true,
		step: true,
		tag: true,
		start: true,
	});

	let errors = {
		name: (ignoreVirgin = false) => {
			if (action.name === "" && (!virgin.name || ignoreVirgin)) {
				setError(() => ({
					field: "name",
					message: "O campo Nome não pode ser em branco",
				}));
				return true;
			} else {
				setError(() => ({ field: "", message: "" }));
				return false;
			}
		},
		account: (ignoreVirgin = false) => {
			if (
				action.account === "" &&
				(virgin.account === false || ignoreVirgin)
			) {
				setError(() => ({
					field: "account",
					message: "Selecione uma conta.",
				}));
				return true;
			} else {
				setError(() => ({ field: "", message: "" }));
				return false;
			}
		},
	};

	const add = async () => {
		if (errors.name(true)) return false;
		if (errors.account(true)) return false;

		await request(
			"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master",
			gql`
				mutation (
					$name: String!
					$description: String!
					$start: String!
					$account: ID!
					$profile_creator: ID!
					$profile_responsible: ID!
					$flow: ID!
					$step: ID!
					$tag: ID!
					$end: String!
				) {
					createAction(
						data: {
							name: $name
							description: $description
							start: $start
							end: $end
							account: { connect: { id: $account } }
							profile_creator: {
								connect: { id: $profile_creator }
							}
							profile_responsible: {
								connect: { id: $profile_responsible }
							}
							flow: { connect: { id: $flow } }
							step: { connect: { id: $step } }
							tag: { connect: { id: $tag } }
						}
					) {
						id
					}
				}
			`,
			action
		);

		mutate((data: IDashboardIndex) => {
			// const account = data.profile.accounts?.filter(
			// 	(account) => account.id === action.account
			// )[0];

			// let actions: Object[] | undefined = account?.actions;
			// actions?.push(action);

			// console.log({
			// 	...data,
			// 	profile: { accounts: { ...data.profile.accounts, account } },
			// });

			// let newData = { ...data };
			return data;
		});

		return null;
	};

	useEffect(() => {
		if (errors.name()) return;
		if (errors.account()) return;
	}, [action]);

	return (
		<AnimatePresence>
			{microPopup && (
				<motion.div
					layout
					className={`absolute overflow-hidden origin-top-right right-0 prose bg-white rounded-lg shadow-2xl z-50 ${
						fullPopup ? "w-80 lg:max-w-xl lg:w-screen" : "w-64"
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
						{error.field && (
							<motion.div
								layout
								transition={item.transition}
								className="mb-4 error-bg"
							>
								{error.message}
							</motion.div>
						)}
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
									className={`w-full input ${
										error.field === "name"
											? "input-error"
											: ""
									}`}
									value={action.name}
									onChange={(event) => {
										setVirgin(() => ({
											...virgin,
											name: false,
										}));
										setAction(() => {
											return {
												...action,
												name: event.target.value,
											};
										});
									}}
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
											value={action.description}
											onChange={(event) =>
												setAction(() => ({
													...action,
													description:
														event.target.value,
												}))
											}
										/>
									</motion.div>
								</AnimatePresence>
							)}
							<div
								className={
									fullPopup ? "lg:grid gap-4 grid-cols-2" : ""
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
										className={`input ${
											error.field === "account"
												? "input-error"
												: ""
										}`}
										onChange={(event) => {
											setVirgin(() => ({
												...virgin,
												account: false,
											}));
											setAction(() => ({
												...action,
												account: event.target.value,
											}));
										}}
										value={action.account}
									>
										<option value="" key="none"></option>
										{accounts.map((account) => (
											<option
												value={account.id}
												key={account.id}
											>
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
															event.target.value,
													}))
												}
												value={
													action.profile_responsible
												}
											>
												{profiles.map((account) => (
													<option
														value={account.id}
														key={account.id}
													>
														{account.name}
													</option>
												))}
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
													key={flow.id}
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
															setAction(() => ({
																...action,
																flow: flow.id,
															}))
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
													key={step.id}
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
															setAction(() => ({
																...action,
																step: step.id,
															}))
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
									transition={item.transition}
									layout
									className="flex flex-wrap "
									role="radiogroup"
								>
									{tags.map((tag, index) =>
										index >= 2 ? (
											fullPopup && (
												<AnimatePresence key={tag.id}>
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
											<AnimatePresence key={tag.id}>
												<motion.div
													transition={item.transition}
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
															setAction(() => ({
																...action,
																tag: tag.id,
															}))
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

							{/* <div className="mt-4">
										<motion.label
											layout="position"
											transition={item.transition}
											htmlFor="name"
											className="label"
										>
											Image
										</motion.label>
									</div> */}

							<div
								className={`${
									fullPopup ? "lg:grid" : ""
								} grid-cols-3 gap-4`}
							>
								<div className="col-span-2 mt-4">
									<motion.label
										layout="position"
										transition={item.transition}
										htmlFor="start"
										className="label"
									>
										Data
									</motion.label>
									<div
										className={`${
											fullPopup ? "lg:grid" : ""
										} grid-cols-2 gap-4`}
									>
										<input
											type="date"
											name="start"
											id="start"
											className="input"
											value={dayjs(action.start).format(
												"YYYY-MM-DD"
											)}
											onChange={(event) => {
												setAction(() => ({
													...action,
													start:
														dayjs(
															event.target.value
														).format("YYYY-MM-DD") +
														"T" +
														dayjs(
															action.start
														).format("HH:mm:ss") +
														"-03:00",
												}));
											}}
										/>
										<input
											name="time"
											type="time"
											className={`${
												fullPopup ? "" : "mt-2"
											} input`}
											value={dayjs(action.start).format(
												"HH:mm:ss"
											)}
											onChange={(event) => {
												console.log(event.target.value);

												setAction(() => ({
													...action,
													start:
														dayjs(
															action.start
														).format("YYYY-MM-DD") +
														"T" +
														event.target.value +
														"-03:00",
												}));
											}}
										/>
									</div>
								</div>
								{fullPopup && (
									<div className="mt-4">
										<label htmlFor="end" className="label">
											Encerramento
										</label>
										<input
											name="end"
											id="end"
											type="date"
											className={`${
												fullPopup ? "" : "mt-2"
											} input`}
											value={dayjs(action.end).format(
												"YYYY-MM-DD"
											)}
											onChange={(event) => {
												setAction(() => ({
													...action,
													end: dayjs(
														event.target.value
													).format("YYYY-MM-DD"),
												}));
											}}
										/>
									</div>
								)}
							</div>

							{fullPopup && (
								<div className="mt-4">
									<label htmlFor="campaign" className="label">
										Campanha
									</label>
									<select
										id="campaign"
										name="campaign"
										className={`input`}
										onChange={(event) =>
											setAction(() => ({
												...action,
												campaign: event.target.value,
											}))
										}
										value={action.campaign}
									>
										<option value=""></option>
										{campaigns.map((campaign) => (
											<option
												value={campaign.id}
												key={campaign.id}
											>
												{campaign.name}
											</option>
										))}
									</select>
								</div>
							)}
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
							onClick={() => add()}
						>
							Adicionar
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
