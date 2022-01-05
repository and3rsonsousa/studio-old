import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{ rel: "icon", type: "image/png", href: "/favicon.png" },
];

export const meta: MetaFunction = () => {
	// return { title: "STUDIO > CNVT" };
	return { title: "> 𝗦𝗧𝗨𝗗𝗜𝗢 by 𝗖𝗡𝗩𝗧" };
};

export default function App() {
	return (
		<html lang="pt-br">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />

				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	return (
		<div>
			<pre> {error.message}</pre>
		</div>
	);
}
