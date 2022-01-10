import type { IUser } from "~/types";
import SideBar from "./SideBar";

export default ({
	user,
	children,
}: {
	user: IUser;
	children: React.ReactNode;
}) => {
	return (
		<div className="flex bg-gray-100">
			<SideBar user={user} />
			{children}
		</div>
	);
};
