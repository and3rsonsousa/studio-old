import { IAction, IBasic } from "~/types";
import Action from "./Actions/Action";

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
						<Action
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

export default Box;
