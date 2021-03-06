import { GraphQLClient, gql } from "graphql-request";
import bcrypt from "bcrypt";
import { createCookieSessionStorage, redirect } from "remix";

type LoginForm = {
	username: string;
	password: string;
};

export default async function ({ username, password }: LoginForm) {
	const graphcms = new GraphQLClient(
		"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master"
	);
	const { profiles } = await graphcms.request(gql`{
		profiles(where: { username: "${username}" }){
			id
			password
			}
		}`);

	if (!profiles[0]) return null;

	const isCorrectPassword = await bcrypt.compare(
		password,
		profiles[0].password
	);

	if (!isCorrectPassword) return null;

	return profiles[0];
}

const sessionSecret =
	process.env.NODE_ENV === "production"
		? process.env.SESSION_SECRET
		: "secret";
if (!sessionSecret) {
	throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
	cookie: {
		name: "Studio_CNVT_Session",
		// normally you want this to be `secure: true`
		// but that doesn't work on localhost for Safari
		// https://web.dev/when-to-use-local-https/
		secure: process.env.NODE_ENV === "production",
		secrets: [sessionSecret],
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
	},
});

export function getUserSession(request: Request) {
	return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
	const session = await getUserSession(request);
	const userId = session.get("userId");
	if (!userId || typeof userId !== "string") return null;
	return userId;
}

export async function requireUserId(
	request: Request,
	redirectTo: string = new URL(request.url).pathname
) {
	const session = await getUserSession(request);
	const userId = session.get("userId");
	if (!userId || typeof userId !== "string") {
		const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
		throw redirect(`/auth/login?${searchParams}`);
	}
	return userId;
}

export async function getData(request: Request, QUERY: string) {
	try {
		const graphcms = new GraphQLClient(
			"https://api-sa-east-1.graphcms.com/v2/ckxqxoluu0pol01xs5icyengz/master"
		);

		try {
			const data = await graphcms.request(QUERY);
			return data;
		} catch (error) {
			return error;
		}
	} catch {
		throw logout(request);
	}
}

export async function logout(request: Request) {
	const session = await storage.getSession(request.headers.get("Cookie"));
	return redirect("/auth/login", {
		headers: {
			"Set-Cookie": await storage.destroySession(session),
		},
	});
}

export async function createUserSession(userId: string, redirectTo: string) {
	const session = await storage.getSession();
	session.set("userId", userId);
	return redirect(redirectTo, {
		headers: {
			"Set-Cookie": await storage.commitSession(session),
		},
	});
}
