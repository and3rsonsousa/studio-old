import request, { gql } from "graphql-request";
import { LoaderFunction, Outlet, redirect, useLoaderData } from "remix";
import { getData, getUserId } from "~/utils/session.server";
import dayjs from "dayjs";
import { IAccount, IAction, IBasic, ICampaign } from "~/types";
import ActionDisplay from "~/components/Actions/Action";
import { isLate, isNext } from "~/utils/functions";
import { useState } from "react";

import { HiOutlineCalendar, HiOutlineViewList } from "react-icons/hi";
import { CgBoard } from "react-icons/cg";
import Header from "~/components/Header";

export const loader: LoaderFunction = async ({ request }) => {
	//Retorna dos dados das Actions que estão nas Accounts que o usuário tem acesso
	//independente se ele é ou não responsável por elas ou as criou.
	const userId = await getUserId(request);
	const QUERY = gql`
		{
			campaigns{
				id
				name
				slug
				start
				end
				account{
					id
					name
					colors{
						hex
					}
				}
				actions{
					id
				}
			}
			header_profile:profile(where: {id: "${userId}"}) {
				id
				name
				role
			}
			profile(where: {id: "${userId}"}) {
				header_accounts:accounts(orderBy: name_ASC){
					id
					name
					slug
					colors{
						hex
					}
				}
				accounts{
					actions {
						id
						name
						description
						start
						end
						account{
							id
							name
							colors{
								hex
							}
						}
						step{
							id
							name
							slug
						}
						flow{
							id
							name
							slug
						}
						tag{
							id
							name
							slug
						}
					}
				}
			}
			profiles{
				id
				name
				role
			}
		
			tags{
				id
				name
				slug
			}
			steps{
				id
				name
				slug
			}
			flows{
				id
				name
				slug
			}
		}
	`;
	let data = await getData(request, QUERY);

	return data;
};

export default () => {
	let {
		profile: { accounts, header_accounts },
		tags,
		flows,
		steps,
		campaigns,
		profiles,
		header_profile,
	} = useLoaderData();

	// useSWR later

	// let { data, error, isValidating } = useSWR(
	// 	gql`
	// 		{
	// 			actions {
	// 				id
	// 				name
	// 			}
	// 		}
	// 	`,
	// 	(query) =>
	// 		request(
	// 			"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master",
	// 			query
	// 		)
	// );

	// useEffect(() => {
	// 	console.log("Validating");
	// }, [isValidating]);

	//Agrupa todas as ações/Actions das contas/Accounts numa lista única
	let actions: IAction[] = accounts.map(
		(account: IAccount) => account.actions
	);
	//Todas as ações em um único nível
	actions = actions.flat();
	//Define os campos de data/start-end como sendo dayjs
	//em seguida insere em arrays separadas para com e sem data
	let datedActions: IAction[] = [];
	let undatedActions: IAction[] = [];
	actions = actions.map((action: IAction) => {
		let newAction = {
			...action,
			start: action.start ? dayjs(action.start) : null,
			end: action.end ? dayjs(action.end) : null,
		};
		//Insere na array de ações/Actions com data
		if (newAction.start) {
			datedActions.push(newAction);
		} else {
			//Caso contrário insere na array de ações/Actions sem data
			undatedActions.push(newAction);
		}
		return newAction;
	});
	//ordena a array por datas crescentes
	datedActions = datedActions.sort((a: IAction, b: IAction) =>
		a.start.diff(b.start)
	);
	const todayActions = datedActions.filter((action: IAction) => {
		return (
			((action.start || action.end) &&
				dayjs().format("YYYY-MM-DD") ===
					action.start?.format("YYYY-MM-DD")) ||
			dayjs().format("YYYY-MM-DD") === action.end?.format("YYYY-MM-DD")
		);
	});

	const lateActions = datedActions.filter((action: IAction) => {
		return isLate(action);
	});

	const nextActions = datedActions.filter((action: IAction) => {
		return isNext(action);
	});

	const [selectedActions, setSelectedActions] = useState<string[]>([]);

	return (
		<div className="h-screen overflow-x-hidden overflow-y-auto page prose-headings:font-medium">
			<Header
				profile={header_profile}
				profiles={profiles}
				accounts={header_accounts}
				steps={steps}
				tags={tags}
				flows={flows}
				campaigns={campaigns}
			/>
			<div>
				<div className="flex items-center justify-between pt-4 mb-4 space-x-4 snap-start">
					<div className="prose">
						<h2 className=" whitespace-nowrap">Campanhas</h2>
					</div>

					<div>
						<button className="button button-small button-ghost">
							Ver todos
						</button>
					</div>
				</div>
				<div className="p-0 mb-8 page-over">
					<div className="flex w-full overflow-x-auto divide-x scroll-smooth snap-x snap-mandatory">
						{campaigns.map((campaign: ICampaign) => (
							<div
								key={campaign.id}
								className="shrink-0 snap-start"
							>
								<div className="p-8 shrink-0 w-52 md:w-80">
									<div className="text-lg font-medium leading-tight">
										{campaign.name}
									</div>
									<div className="font-medium tracking-wide text-gray-400 uppercase text-xx">
										{dayjs(campaign.start).format(
											"[De] D [de] MMMM"
										)}
										{dayjs(campaign.end).format(
											" [a] D [de] MMMM"
										)}
									</div>
									<div className="mt-2 text-sm text-gray-600">
										{campaign.actions.length > 0
											? `${campaign.actions.length} Ações`
											: "Nenhuma ação cadastrada até o momento."}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* <div className="py-8">

				<div className="flex flex-wrap gap-2 mb-16">
					{flows.map((item: IBasic) => (
						<div className={`${item.slug}-bg badge`} key={item.id}>
							{item.name}
						</div>
					))}
				</div>
				<div className="flex flex-wrap gap-2 mb-16">
					{steps.map((item: IBasic) => (
						<div className={`${item.slug}-bg badge`} key={item.id}>
							{item.name}
						</div>
					))}
				</div>
				<div className="flex flex-wrap gap-2 mb-16">
					{tags.map((item: IBasic) => (
						<div className={`${item.slug}-bg badge`} key={item.id}>
							{item.name}
						</div>
					))}
				</div>
				<div className="flex flex-wrap gap-2 mb-16">
					{tags.map((item: IBasic) => (
						<div
							className={`action-${item.slug}-bg badge`}
							key={item.id}
						>
							{item.name}
						</div>
					))}
				</div>
			</div> */}
				<Box
					title="Hoje"
					actions={todayActions}
					steps={steps}
					selectedActions={selectedActions}
					setSelectedActions={setSelectedActions}
					message={"para hoje"}
				/>
				<Box
					title="Ações Atrasadas"
					actions={lateActions}
					steps={steps}
					selectedActions={selectedActions}
					setSelectedActions={setSelectedActions}
					message={"atrasadas"}
				/>
				<Box
					title="Próximas Ações"
					actions={nextActions}
					steps={steps}
					selectedActions={selectedActions}
					setSelectedActions={setSelectedActions}
					message={"para fazer"}
				/>
				<Box
					title="Ações Sem Data"
					actions={undatedActions}
					steps={steps}
					selectedActions={selectedActions}
					setSelectedActions={setSelectedActions}
					message={"sem data"}
				/>
			</div>
			<Outlet />
		</div>
	);
};

const Box = ({
	actions,
	title,
	steps,
	message,
	selectedActions,
	setSelectedActions,
}: {
	actions: IAction[];
	steps: IBasic[];
	title: string;
	message: string;
	selectedActions: any;
	setSelectedActions: any;
}) => {
	return actions.length > 0 ? (
		<div className="mb-8 snap-start">
			<div className="flex items-center justify-between mb-4 space-x-4">
				<div className="prose">
					<h3 className="whitespace-nowrap ">{title}</h3>
				</div>
				<div className="hidden mt-1 text-xs leading-relaxed text-gray-400 uppercase md:block leading ">
					Você tem {actions.length}
					{actions.length > 1 ? " ações" : " ação"} {message}.
				</div>
				<div>
					<button className="button button-small button-ghost">
						Ver todos
					</button>
				</div>
			</div>

			<div className="page-over">
				<div className="grid items-start gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 xxxl:grid-cols-8">
					{actions.map((action: IAction) => (
						<ActionDisplay
							action={action}
							steps={steps}
							key={action.id}
							selected={
								selectedActions.filter(
									(selected: string) => selected === action.id
								).length > 0
							}
							setSelectedActions={setSelectedActions}
						/>
					))}
				</div>
			</div>
		</div>
	) : null;
};
