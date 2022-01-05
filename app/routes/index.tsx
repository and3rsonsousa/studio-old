import { requireUserId, getUser } from "~/utils/session.server";
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import Layout from "~/components/Layout";

export const loader: LoaderFunction = async ({ request }) => {
	const userId = await requireUserId(request);
	const user = await getUser(request);
	return user;
};

export default () => {
	const user = useLoaderData();

	return (
		<Layout user={user}>
			<div className="p-2">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
				sed rerum quidem officiis delectus ullam quaerat molestiae
				commodi, eos ad vitae adipisci maiores modi labore illum,
				temporibus ipsam exercitationem ex.
			</div>
		</Layout>
	);
};
