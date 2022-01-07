import { gql } from "graphql-request";
import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import { User } from "~/types";
import { getData } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
	const QUERY = gql`
		{
			profiles {
				id
				name
				image {
					url(
						transformation: {
							image: {
								resize: { height: 48, width: 48, fit: scale }
							}
						}
					)
				}
			}
		}
	`;
	const { profiles } = await getData(request, QUERY);
	return profiles;
};

export default () => {
	const profiles = useLoaderData();
	return (
		<div className="page">
			<header>
				<div className="prose">
					<h2 className="mb-8 font-medium">Profiles</h2>
				</div>
			</header>
			<article className="flex space-x-4">
				<div className="flex-shrink-0 w-64 -ml-4 ">
					{profiles.map((profile: User) => (
						<Link
							to={`/dashboard/profiles/${profile.id}`}
							key={profile.id}
							className="button button-invisible"
						>
							<div>
								<img
									src={profile.image?.url}
									className="m-0 rounded-full"
								/>
							</div>
							<div>{profile.name}</div>
						</Link>
					))}
					<Link
						to="/dashboard/profiles/new"
						className="mt-8 button-full button button-primary"
					>
						Novo Usuário
					</Link>
				</div>
				<div>
					<Outlet />
				</div>
			</article>
		</div>
	);
};
