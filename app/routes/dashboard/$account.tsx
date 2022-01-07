import { LoaderFunction, redirect, useLoaderData } from "remix";
import { getData } from "~/utils/session.server";
import { gql } from "graphql-request";
import Account from "~/components/Account";

export const loader: LoaderFunction = async ({ request, params }) => {
	if (request.url.indexOf("/actions") === -1)
		return redirect(`/dashboard/${params.account}/actions`);
	const QUERY: string = gql`{
			accounts(where: {slug: "${params.account}"}){
				id
				name
				slug
				colors{
					hex
				}
			}
		}`;

	const { accounts } = await getData(request, QUERY);

	return accounts !== null ? { account: accounts[0], request } : null;
};

export default () => {
	const { account, request } = useLoaderData();

	return <Account account={account} />;
};
