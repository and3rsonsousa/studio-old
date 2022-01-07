import { gql } from "graphql-request";
import { HiOutlineCamera } from "react-icons/hi";
import { LoaderFunction, Outlet, useLoaderData } from "remix";
import { User } from "~/types";
import { getData, getUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
	const QUERY = gql`
		{
			profile(where: {id: "${params.id}"}) {
				id
				name
				username
				accounts{
					id
					name
				}
				role
				actions_created{
					id
					name
				}
				actions_responsible{
					id
					name
				}
				image {
					url(
						transformation: {
							image: {
								resize: { height: 150, width: 150, fit: scale }
							}
						}
					)
				}
			}
		}
	`;
	const { profile } = await getData(request, QUERY);
	return profile;
};

export default () => {
	const profile = useLoaderData();
	return (
		<div className="page-over">
			<div className="prose">
				{/* <h3>{profile.name}</h3> */}
				<form method="POST">
					<div className="flex space-x-8">
						<div>
							<button className="border rounded-lg input">
								<img
									src={profile.image.url}
									alt="Mude a imagem de perfil"
									className="w-full m-0 mx-auto rounded-t-lg"
								/>
								{/* <button className="bg-white rounded-t-none shadow-md shadow-gray-200 button-full button button-small"> */}
								<div className="flex px-2 py-3 space-x-2 text-sm">
									<span>Mudar imagem</span>
									<HiOutlineCamera className="text-lg" />
								</div>
							</button>
						</div>
						<div>
							<div className="mb-4">
								<label>
									<span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
										Nome
									</span>
									<input
										type="text"
										name="name"
										className="input"
										defaultValue={profile.name}
									/>
								</label>
							</div>
							<div className="mb-4">
								<label>
									<span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
										Username
									</span>
									<input
										type="text"
										name="username"
										className="input"
										defaultValue={profile.username}
									/>
								</label>
							</div>
						</div>
					</div>
					<div className="py-8 mt-12 mb-4 prose border-t">
						<h4 className="font-medium">Mude sua senha</h4>

						<div className="grid grid-cols-2 gap-8 mb-4">
							<div>
								<label>
									<span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
										Senha
									</span>
									<input
										type="text"
										name="password"
										className="input"
									/>
								</label>
							</div>
							<div>
								<label>
									<span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
										Confirme a nova Senha
									</span>
									<input
										type="text"
										name="password"
										className="input"
									/>
								</label>
							</div>
						</div>
					</div>
				</form>
			</div>
			{JSON.stringify(profile, undefined, 2)}
		</div>
	);
};
