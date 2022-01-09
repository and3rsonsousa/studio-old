import { requireUserId, getData } from "~/utils/session.server";
import { Outlet, redirect, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import Layout from "~/components/Layout";
import { User } from "~/types";
import { gql } from "graphql-request";

export const loader: LoaderFunction = async ({ request }) => {
	const userId = await requireUserId(request);
	const QUERY: string = gql`{
		profile(where: { id: "${userId}" }){
			id
			name
			username
			role
			image{
				url(transformation: {image: {resize: {width: 54, height: 54, fit: clip}}})
			}
			accounts(orderBy: name_ASC){
				id
				name
				slug
				colors{
					hex
				}
			}
		}
		}`;
	const { profile } = await getData(request, QUERY);
	if (profile.accounts && profile.accounts.length === 1)
		return redirect(`/dashboard/${profile.accounts[0]?.slug}`);
	return profile;
};

export default () => {
	const user = useLoaderData();

	return (
		<Layout user={user}>
			<Outlet />
		</Layout>
	);
};
