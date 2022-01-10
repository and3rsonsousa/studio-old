import dayjs from "dayjs";
import { Action } from "~/types";

//Verifica se a ação está atrasada
//caso a data inicial/start já tenha passado
//ou a data de entrega/end já tenha passado
//e o step não seja concluído/accomplished
function isLate(action: Action): boolean {
	return (
		(action.start?.isBefore(
			dayjs().hour(0).minute(0).second(0).millisecond(0)
		) ||
			action.end?.isBefore(
				dayjs().hour(0).minute(0).second(0).millisecond(0)
			)) &&
		action.step?.slug !== "accomplished"
	);
}

function isNext(action: Action): boolean {
	return action.start?.isAfter(
		dayjs().hour(23).minute(59).second(59).millisecond(999)
	);
}

export { isLate, isNext };
