import { Switch } from "@headlessui/react";
import { gql } from "graphql-request";
import { useEffect, useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";
import { LoaderFunction, Outlet, useLoaderData, useTransition } from "remix";
import Avatar from "~/components/Avatar";
import { IAccount, IUser } from "~/types";
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
			accounts{
				id
				name
			}
			roles:__type(name: "Role"){
				enumValues{
					name
				}
			}
		}
	`;
	const data = await getData(request, QUERY);
	return data;
};

export default () => {
	const { profile, accounts, roles } = useLoaderData();
	const [selectedAccounts, setSelectedAccounts] = useState(profile.accounts);
	useEffect(() => {
		setSelectedAccounts(() => profile.accounts);
	}, [profile]);
	return (
		<div className="prose page-over">
			<div className="prose">
				<form method="POST">
					<div className="flex space-x-8">
						{/* Imagem de perfil */}
						<div>
							<button className="border rounded-lg input">
								<img
									src={profile.image.url}
									alt="Mude a imagem de perfil"
									className="w-full m-0 mx-auto rounded-t-lg"
								/>
								<div className="flex px-2 py-3 space-x-2 text-sm">
									<span>Mudar imagem</span>
									<HiOutlineCamera className="text-lg" />
								</div>
							</button>
						</div>
						{/* Nome e Username */}
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
					<div className="mt-4">
						<span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
							Função Administrativa
						</span>
						<div className="grid grid-cols-3 gap-4">
							{roles.enumValues.map(
								(role: { id: string; name: string }) => (
									<label className="flex items-center space-x-4">
										<input
											type="radio"
											value={role.id}
											key={role.name}
											checked={profile.role === role.name}
										/>
										<div>{role.name}</div>
									</label>
								)
							)}
						</div>
					</div>

					{/* Contas  */}
					<div className="mt-4">
						<label>
							<span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
								CONTAS
							</span>
						</label>
						<div className="grid grid-cols-2 gap-2 mt-2">
							{accounts.map((account: IAccount) => (
								<div key={account.id}>
									<label className="flex items-center space-x-4">
										<input
											type="checkbox"
											className="border-gray-300 rounded"
											checked={selectedAccounts.find(
												(selected: IAccount) =>
													selected.id === account.id
											)}
										/>
										<div>{account.name}</div>
									</label>
								</div>
							))}
						</div>
					</div>
					{/* Senha */}
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
					<div className="flex justify-end">
						<input
							type="submit"
							value="Atualizar"
							className="button button-primary"
						/>
					</div>
				</form>
			</div>
			<pre>{JSON.stringify(profile, undefined, 2)}</pre>
		</div>
	);
};
