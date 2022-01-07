import { LoaderFunction, useLoaderData } from "remix";
import Action from "~/components/Action";

export const loader: LoaderFunction = async ({ request, params }) => {
	return params.account;
};

export default () => {
	const data = useLoaderData();
	return <Action actions={data} />;
};
