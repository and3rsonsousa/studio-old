import request, { gql } from "graphql-request";
import { LoaderFunction, Outlet, useLoaderData } from "remix";
import { getData, getUserId } from "~/utils/session.server";
import dayjs from "dayjs";
import { IAccount, IAction } from "~/types";
import { isLate, isNext } from "~/utils/functions";
import { useState } from "react";

import Header from "~/components/Header";
import Box from "~/components/Box";
import Legendas from "~/components/Legendas";
import BoxCampaigns from "~/components/BoxCampaigns";
import useSWR from "swr";

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
					id
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
						profile_responsible{
							id
							name
							image{
								url(transformation: {image: {resize: {width: 54, height: 54, fit: clip}}})
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
	let serverData = await getData(request, QUERY);

	return {
		serverData,
		QUERY,
		fallback: {
			"/dashboard/index": serverData,
		},
	};
};

export default () => {
	let { QUERY, fallback } = useLoaderData();

	let { data, mutate, isValidating } = useSWR(
		"/dashboard/index",
		() =>
			request(
				"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master",
				QUERY
			),
		{
			fallback,
		}
	);

	let {
		profile: { accounts, header_accounts },
		tags,
		flows,
		steps,
		campaigns,
		profiles,
		header_profile,
	} = data;

	// useEffect(() => {
	// 	console.log(data.campaigns);
	// }, [data, isValidating]);

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
				mutate={mutate}
			/>
			<div>
				<BoxCampaigns campaigns={campaigns} />

				{/* <Legendas flows={flows} steps={steps} tags={tags} /> */}
				<Box
					title="Hoje"
					actions={todayActions}
					steps={steps}
					selectedActions={selectedActions}
					setSelectedActions={setSelectedActions}
					message={"para hoje"}
					mutate={mutate}
					isValidating={isValidating}
				/>
				<Box
					title="Ações Atrasadas"
					actions={lateActions}
					steps={steps}
					selectedActions={selectedActions}
					setSelectedActions={setSelectedActions}
					message={"atrasadas"}
					mutate={mutate}
					isValidating={isValidating}
				/>
				<Box
					title="Próximas Ações"
					actions={nextActions}
					steps={steps}
					selectedActions={selectedActions}
					setSelectedActions={setSelectedActions}
					message={"para fazer"}
					mutate={mutate}
					isValidating={isValidating}
				/>
				<Box
					title="Ações Sem Data"
					actions={undatedActions}
					steps={steps}
					selectedActions={selectedActions}
					setSelectedActions={setSelectedActions}
					message={"sem data"}
					mutate={mutate}
					isValidating={isValidating}
				/>
			</div>
			<Outlet />
		</div>
	);
};
