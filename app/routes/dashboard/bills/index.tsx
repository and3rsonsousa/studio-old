import request, { gql } from "graphql-request";
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import useSWR from "swr";
import { getData } from "~/utils/session.server";
import dayjs from "dayjs";
import { isHtmlLinkDescriptor } from "@remix-run/react/links";
import { useState } from "react";
import { IBill } from "~/types";
import { CalendarData } from "~/utils/calendar";

export const loader: LoaderFunction = async ({ request }) => {
	const QUERY = gql`
		{
			bills(orderBy: date_ASC) {
				id
				name
				description
				nature
				date
				value
			}
		}
	`;
	let serverData = await getData(request, QUERY);

	return {
		QUERY,
		fallback: {
			"/dashboard/bills": serverData,
		},
	};
};

export default function Bill() {
	const { QUERY, fallback } = useLoaderData();
	const { data, isValidating, error, mutate } = useSWR(
		"/dashboard/bills",
		() =>
			request(
				"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master",
				QUERY
			),
		{
			fallback,
		}
	);

	let bills: IBill[] = data.bills.map((bill: IBill) => ({
		...bill,
		date: dayjs(bill.date),
	}));

	// _month = _month.sort((a, b) => a.date.diff(b.date));

	let parcial = 0;
	const {
		today,
		startOfMonth,
		startOfMonthFull,
		endOfMonth,
		endOfMonthFull,
		daysIMonthFull,
		daysIMonth,
		month,
		monthFull,
	} = CalendarData();

	// month.map((day) => {
	// 	day.items = bills.filter(
	// 		(bill: IBill) =>
	// 			bill.date.format("YYYY-MM-DD") === day.date.format("YYYY-MM-DD")
	// 	);
	// });

	// console.log(month);

	return (
		<div className="page">
			<div className="page-over">
				<div className="w-full">
					{bills.map((bill) => (
						<div
							key={bill.id}
							className="flex items-center w-full gap-4 py-2 border-t"
						>
							<div className="w-8 font-semibold">
								{dayjs(bill.date).format("DD/M")}
							</div>
							<div className="w-2/6">{bill.name}</div>
							<div className="w-1/6 text-xs text-gray-400">
								{bill.description}
							</div>

							<div className="w-1/6">
								{bill.value.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}
							</div>
							<div className="w-1/6">
								{(parcial + bill.value).toLocaleString(
									"pt-BR",
									{
										style: "currency",
										currency: "BRL",
									}
								)}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="prose">
				<pre>{JSON.stringify(bills, undefined, 2)}</pre>
			</div>
		</div>
	);
}
