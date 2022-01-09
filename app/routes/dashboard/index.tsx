import { gql } from "graphql-request";
import { LoaderFunction, redirect, useLoaderData } from "remix";
import { getData, getUserId } from "~/utils/session.server";
import dayjs from "dayjs";
import { Account, Action } from "~/types";
import ActionDisplay from "~/components/Actions/ActionDisplay";
import { isLate, isNext } from "~/utils/functions";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
	//Retorna dos dados das Actions que estão nas Accounts que o usuário tem acesso
	//independente se ele é ou não responsável por elas ou as criou.
	const userId = await getUserId(request);
	const QUERY = gql`
		{
			profile(where: {id: "${userId}"}) {
				accounts{
					actions {
						id
						name
						description
						startDate
						endDate
						step{
							id
							name
							slug
						}
					}
				}
			}
		}
	`;
	const data = await getData(request, QUERY);

	return data;
};

export default () => {
	let {
		profile: { accounts },
	} = useLoaderData();

	//Agrupa todas as ações/Actions das contas/Accounts numa lista única
	let actions: Action[] = accounts.map((account: Account) => account.actions);
	//Todas as ações em um único nível
	actions = actions.flat();
	//Define os campos de data/startDate-endDate como sendo dayjs
	//em seguida insere em arrays separadas para com e sem data
	let datedActions: Action[] = [];
	let undatedActions: Action[] = [];
	actions = actions.map((action: Action) => {
		let newAction = {
			...action,
			startDate: action.startDate ? dayjs(action.startDate) : null,
			endDate: action.endDate ? dayjs(action.endDate) : null,
		};
		//Insere na array de ações/Actions com data
		if (newAction.startDate) {
			datedActions.push(newAction);
		} else {
			//Caso contrário insere na array de ações/Actions sem data
			undatedActions.push(newAction);
		}
		return newAction;
	});
	//ordena a array por datas crescentes
	datedActions = datedActions.sort((a: Action, b: Action) =>
		a.startDate.diff(b.startDate)
	);
	const todayActions = datedActions.filter((action: Action) => {
		return (
			((action.startDate || action.endDate) &&
				dayjs().format("YYYY-MM-DD") ===
					action.startDate?.format("YYYY-MM-DD")) ||
			dayjs().format("YYYY-MM-DD") ===
				action.endDate?.format("YYYY-MM-DD")
		);
	});

	const lateActions = datedActions.filter((action: Action) => {
		return isLate(action);
	});

	const nextActions = datedActions.filter((action: Action) => {
		return isNext(action);
	});

	const [selectedActions, setSelectedActions] = useState([]);

	return (
		<div className="page prose-headings:font-medium">
			<Box
				title="Hoje"
				actions={todayActions}
				selectedActions={selectedActions}
				setSelectedActions={setSelectedActions}
				message={"para hoje"}
			/>
			<Box
				title="Atrasadas"
				actions={lateActions}
				selectedActions={selectedActions}
				setSelectedActions={setSelectedActions}
				message={"atrasadas"}
			/>
			<Box
				title="Próximas"
				actions={nextActions}
				selectedActions={selectedActions}
				setSelectedActions={setSelectedActions}
				message={"para fazer"}
			/>
			<Box
				title="Sem data"
				actions={undatedActions}
				selectedActions={selectedActions}
				setSelectedActions={setSelectedActions}
				message={"sem data"}
			/>
		</div>
	);
};

const Box = ({
	actions,
	title,
	message,
	selectedActions,
	setSelectedActions,
}: {
	actions: Action[];
	title: string;
	message: string;
	selectedActions: any;
	setSelectedActions: any;
}) => {
	return actions.length > 0 ? (
		<div className="mb-8">
			<div className="flex mb-4 space-x-4">
				<div className="prose">
					<h3>{title}</h3>
				</div>
				<div className="mt-2 text-xs leading-relaxed text-gray-400 uppercase leading ">
					Você tem {actions.length}
					{actions.length > 1 ? " ações" : " ação"} {message}.
				</div>
			</div>

			<div className="page-over">
				<div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{actions.map((action: Action) => (
						<ActionDisplay
							action={action}
							selected={
								// selectedActions.filter(
								// 	(selected: string) => selected === action.id
								// ).length > 0
								Math.ceil(Math.random() * 10) > 8
							}
						/>
					))}
				</div>
			</div>
		</div>
	) : null;
};
