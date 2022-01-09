import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "remix";
import type { User } from "~/types";
import SideBar from "./SideBar";

export default ({
	user,
	children,
}: {
	user: User;
	children: React.ReactNode;
}) => {
	return (
		<div className="flex bg-gray-100">
			<SideBar user={user} />
			{children}
		</div>
	);
};
