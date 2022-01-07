import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "remix";
import { User } from "~/types";

export default ({ user }: { user: User }) => (
	<div className="flex-shrink-0 min-h-screen prose bg-gray-100 border-r w-52 prose-a:no-underline">
		<div className="px-8 py-4 logo">
			<Link to="/dashboard" className="block w-24 my-4">
				<img src="/logo.svg" alt="STUDIO" className="m-0" />
				<div className="text-[10px] text-right text-gray-400 tracking-wider mr-1">
					BY CNVT
				</div>
			</Link>
		</div>
		<div className="px-8 py-2">
			<h5 className="m-0 text-xs font-medium tracking-wider text-gray-400 uppercase">
				Contas
			</h5>
		</div>
		<div className="px-4">
			{user.accounts?.map((account) => (
				<Link
					to={`/dashboard/${account.slug}`}
					className="font-light button button-invisible button-small"
					key={account.id}
				>
					{account.name}
				</Link>
			))}
		</div>

		<div className="flex flex-col items-center p-4 pt-8 mt-8 border-t">
			<img src={user.image?.url} className="m-0 rounded-full" />
			<h4 className="font-medium text-brand">{user.name}</h4>
			<div className="flex">
				<Link
					to="/profile"
					className="button button-small button-invisible whitespace-nowrap"
				>
					Minha conta
				</Link>
				<form action="/auth/logout" method="post" className="flex">
					<button
						className="button button-small button-invisible whitespace-nowrap"
						type="submit"
					>
						<HiOutlineLogout className="text-lg" />
					</button>
				</form>
			</div>
		</div>
		{user.role === "Administrator" && (
			<div className="px-4">
				<h5 className="px-4 py-2 m-0 text-xs font-medium tracking-wider text-gray-400 uppercase">
					ADMIN
				</h5>
				<div>
					{[
						{
							id: 1,
							name: "Contas",
							slug: "accounts",
						},
						{
							id: 2,
							name: "Usuários",
							slug: "profiles",
						},
					].map((item) => (
						<Link
							to={`/dashboard/${item.slug}`}
							className="font-light button button-invisible button-small"
							key={item.id}
						>
							{item.name}
						</Link>
					))}
				</div>
			</div>
		)}
	</div>
);
