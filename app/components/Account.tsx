import { Link, Outlet } from "remix";
import { Account } from "~/types";
import Avatar from "./Avatar";

export default ({ account }: { account: Account }) => (
	<div className="page">
		<header className="flex items-center justify-between pb-4 border-b">
			<div className="flex items-center space-x-4">
				<Avatar avatar={account} />
				<div className="prose prose-headings:font-semibold">
					<h2 className="m-0">
						<Link
							to={`/dashboard/${account.slug}`}
							className="no-underline"
						>
							{account.name}
						</Link>
					</h2>
					<h5 className="text-xs font-medium tracking-wider text-gray-400">
						@{account.slug}
					</h5>
				</div>
			</div>
			<div className="flex space-x-2">
				<Link
					className="button button-ghost button-small"
					to={`/dashboard/${account.slug}/actions`}
				>
					Ações
				</Link>
				<Link
					className="button button-ghost button-small"
					to={`/dashboard/${account.slug}/about`}
				>
					Informações
				</Link>
			</div>
		</header>
		<article>
			<Outlet />
		</article>
		<pre>{JSON.stringify(account, null, 2)}</pre>
	</div>
);
