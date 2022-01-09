import { LoaderFunction, useLoaderData } from "remix";
import Action from "~/components/Actions/Actions";

export const loader: LoaderFunction = async ({ request, params }) => {
	return params.account;
};

export default () => {
	const data = useLoaderData();
	return <Action actions={data} />;
};
