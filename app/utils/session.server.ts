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

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
	throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
	cookie: {
		name: "RJ_session",
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

export async function createUserSession(userId: string, redirectTo: string) {
	const session = await storage.getSession();
	session.set("userId", userId);
	return redirect(redirectTo, {
		headers: {
			"Set-Cookie": await storage.commitSession(session),
		},
	});
}
