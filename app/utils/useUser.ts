import { request } from "graphql-request";
import useSWR from "swr";

const fetcher = (query: string) =>
	request(
		"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master",
		query
	);

export default async function useUser(QUERY: string) {
	const data = await useSWR(QUERY, fetcher);
	return data;
}
