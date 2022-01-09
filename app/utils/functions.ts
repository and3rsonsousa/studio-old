import dayjs from "dayjs";
import { Action } from "~/types";

//Verifica se a ação está atrasada
//caso a data inicial/startDate já tenha passado
//ou a data de entrega/endDate já tenha passado
//e o step não seja concluído/accomplished
function isLate(action: Action): boolean {
	return (
		(action.startDate?.isBefore(
			dayjs().hour(0).minute(0).second(0).millisecond(0)
		) ||
			action.endDate?.isBefore(
				dayjs().hour(0).minute(0).second(0).millisecond(0)
			)) &&
		action.step?.slug !== "accomplished"
	);
}

function isNext(action: Action): boolean {
	return action.startDate?.isAfter(
		dayjs().hour(23).minute(59).second(59).millisecond(999)
	);
}

export { isLate, isNext };
