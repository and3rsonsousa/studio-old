import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "remix";
import type { User } from "~/types";

export default ({
	user,
	children,
}: {
	user: User;
	children: React.ReactNode;
}) => {
	return (
		<div>
			<div className="bg-brand">
				<div className="container flex items-center justify-between mx-auto">
					<div className="p-2 font-bold text-white logo">STUDIO</div>
					<div className="flex items-center py-2 space-x-2">
						<img src={user.image?.url} className="rounded-full " />
						<Link
							to={`/profile/${user.username}`}
							className="text-sm text-white "
						>
							{user.name}
						</Link>
						<form
							action="/auth/logout"
							method="post"
							className="flex"
						>
							<button
								className="text-lg text-white"
								type="submit"
							>
								<HiOutlineLogout />
							</button>
						</form>
					</div>
				</div>
			</div>
			{children}
		</div>
	);
};
