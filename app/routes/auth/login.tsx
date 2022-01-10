import { useState } from "react";
import type { ActionFunction } from "remix";
import { useActionData, json, Link, useSearchParams } from "remix";
import {
	HiOutlineLockClosed as LockClosed,
	HiOutlineLockOpen as LockOpen,
} from "react-icons/hi";
import login, {
	createUserSession,
	getUserSession,
} from "../../utils/session.server";

// interface LoginData {
// 	username: FormDataEntryValue | null;
// 	password: FormDataEntryValue | null;
// }

interface ActionData {
	errors?: {
		login: string | undefined;
		username: string | undefined;
		password: string | undefined;
	};
	fields?: {
		username: string;
		password: string;
	};
}

const badRequest = (data: {}) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
	const form = await request.formData();
	const username = form.get("username");
	const password = form.get("password");
	const redirectTo = form.get("redirect") || "/";
	const fields = {
		username,
		password,
	};

	if (username === "" || username === null)
		return badRequest({
			errors: { username: "O campo Usuário não pode ser vazio" },
			fields,
		});
	if (password === "" || password === null)
		return badRequest({
			errors: { password: "O campo Password não pode ser vazio" },
			fields,
		});

	if (
		typeof username !== "string" ||
		typeof password !== "string" ||
		typeof redirectTo !== "string"
	) {
		return badRequest({ errors: { login: "Dados inválidos" } });
	}
	const profile = await login({ username, password });

	if (!profile) {
		return badRequest({
			fields,
			errors: { login: "Usuário não existe" },
		});
	}

	return createUserSession(profile.id, redirectTo);
};

export default () => {
	const actionData = useActionData<ActionData>();
	const [searchParams] = useSearchParams();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="flex items-center justify-center min-h-screen p-8 bg-gray-50 ">
			<div className="container max-w-xs p-8 mx-auto prose bg-white shadow-2xl shadow-gray-300 rounded-xl ">
				<img src="/logo.svg" alt="" className="w-24" />
				<h4>Login</h4>
				<form method="POST">
					{actionData?.errors?.login && (
						<div className="p-2 text-xs rounded-lg error bg-semantic-error-light text-semantic-error-dark">
							{actionData.errors.login}
						</div>
					)}
					<input
						type="hidden"
						name="redirectTo"
						value={searchParams.get("redirectTo") || "/"}
					/>
					<div className="mt-4">
						<label
							className="block mb-2 text-sm font-medium"
							htmlFor="username"
						>
							Usuário
						</label>
						<div>
							<input
								type="text"
								name="username"
								id="username"
								placeholder="Seu username"
								defaultValue={actionData?.fields?.username}
								className="input"
							/>
						</div>
					</div>
					{actionData?.errors?.username && (
						<div className="p-2 mt-1 text-xs rounded-lg error bg-semantic-error-light text-semantic-error-dark">
							{actionData.errors.username}
						</div>
					)}
					<div className="mt-4">
						<label
							className="block mb-2 text-sm font-medium"
							htmlFor="password"
						>
							Senha
						</label>
						<div className="flex">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								placeholder="Sua senha"
								className="border-r-0 rounded-r-none input"
							/>
							<button
								className="text-lg border border-gray-300 rounded-l-none rounded-r-lg shadow-sm button"
								onClick={(event) => {
									event?.preventDefault();
									setShowPassword(!showPassword);
								}}
							>
								{showPassword ? <LockClosed /> : <LockOpen />}
							</button>
						</div>
					</div>
					{actionData?.errors?.password && (
						<div className="p-2 mt-1 text-xs rounded-lg error bg-semantic-error-light text-semantic-error-dark">
							{actionData.errors.password}
						</div>
					)}
					<div className="flex justify-end mt-8">
						<button type="submit" className="button button-primary">
							Entrar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
