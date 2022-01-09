import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useTransition,
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";

import styles from "./app.css";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{ rel: "icon", type: "image/png", href: "/favicon.png" },
];

export const meta: MetaFunction = () => {
	// return { title: "STUDIO > CNVT" };
	return { title: "> 𝗦𝗧𝗨𝗗𝗜𝗢 by 𝗖𝗡𝗩𝗧" };
};

export default function App() {
	const transition = useTransition();
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
				{transition.state === "loading" ? (
					<div className="fixed top-0 right-0 p-4">
						<div className="w-8 h-8 border-4 rounded-full border-interdimensional border-t-outrageous animate-spin"></div>
					</div>
				) : null}

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
