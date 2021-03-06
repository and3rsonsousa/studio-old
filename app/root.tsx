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
	return { title: "ð¦ð§ð¨ððð¢ ÊÊ cÎ±É´Éªá´ eá´e" };
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
					<div className="fixed top-0 p-4 translate-x-1/2 right-1/2">
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
