import { useEffect, useState } from "react";
import {
	HiOutlineChevronDoubleLeft,
	HiOutlineChevronDoubleRight,
	HiOutlineLogout,
	HiOutlineOfficeBuilding,
	HiOutlineUser,
	HiOutlineUsers,
} from "react-icons/hi";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "remix";
import { IUser } from "~/types";
import Avatar from "./Avatar";

export default ({ user }: { user: IUser }) => {
	const [compact, setCompact] = useState(true);
	useEffect(() => {
		if (window) {
			setCompact(() => window.innerWidth < 768);
			window.addEventListener("resize", () =>
				setCompact(() => window.innerWidth < 768)
			);
			return () =>
				window.removeEventListener("resize", () =>
					setCompact(() => window.innerWidth < 768)
				);
		}
	}, []);
	return (
		<div
			className={`flex-shrink-0 h-screen prose overflow-y-auto overflow-x-hidden bg-gray-50 ${
				compact ? "w-16 flex-shrink" : "w-52"
			} prose-a:no-underline border-r relative`}
		>
			<div className={`${compact ? "px-4" : "px-8"} py-4`}>
				<Link
					to="/dashboard"
					className={`block ${compact ? "mb-4 mt-5" : "w-24 my-4"}`}
				>
					{compact ? (
						<img
							src="/logo-small.svg"
							alt="STUDIO by canivete"
							className="m-0"
						/>
					) : (
						<>
							<img src="/logo.svg" alt="STUDIO" className="m-0" />
							<div className="text-[10px] text-right text-gray-400 tracking-wider mr-1">
								ʙʏ cαɴɪᴠeᴛe
							</div>
						</>
					)}
				</Link>
			</div>
			{!compact && (
				<div className="px-8 py-2">
					<h5 className="m-0 text-xs font-medium tracking-wider text-gray-400 uppercase">
						Contas
					</h5>
				</div>
			)}
			<div className={compact ? "px-2" : "px-4"}>
				{user.accounts?.map((account) => (
					<Link
						to={`/dashboard/${account.slug}`}
						className={`font-light button button-invisible button-small ${
							compact ? "justify-center" : ""
						}`}
						key={account.id}
					>
						{compact ? (
							<Avatar avatar={account} small={true} />
						) : (
							<div className="line-clamp-1">{account.name}</div>
						)}
					</Link>
				))}
			</div>

			<div className="py-4 pt-8 mt-8">
				<div className="px-4">
					<img
						src={user.image?.url}
						className="m-0 mx-auto rounded-full"
					/>
					{!compact && (
						<h4 className="mt-4 mb-0 font-medium text-center text-interdimensional">
							{user.name}
						</h4>
					)}
				</div>
				<div
					className={`mt-2 ${
						compact ? "px-2" : "px-4 flex justify-center"
					}`}
				>
					<Link
						to="/profile"
						className="items-center justify-center button button-small button-invisible whitespace-nowrap"
					>
						<HiOutlineUser className="text-lg" />
						{!compact && <span>Minha conta</span>}
					</Link>
					<form
						action="/auth/logout"
						method="post"
						className="w-full"
					>
						<button
							className="button button-small button-invisible whitespace-nowrap button-full"
							type="submit"
						>
							<HiOutlineLogout className="text-lg" />
						</button>
					</form>
				</div>
			</div>
			{user.role === "Administrator" && (
				<div className={compact ? "px-2" : "px-4"}>
					{!compact && (
						<h5 className="px-4 py-2 m-0 text-xs font-medium tracking-wider text-gray-400 uppercase">
							ADMIN
						</h5>
					)}

					{[
						{
							id: 1,
							name: "Contas",
							slug: "accounts",
							icon: (
								<HiOutlineOfficeBuilding className="text-lg" />
							),
						},
						{
							id: 2,
							name: "Usuários",
							slug: "profiles",
							icon: <HiOutlineUsers className="text-lg" />,
						},
						{
							id: 3,
							name: "Financeiro",
							slug: "bills",
							icon: <BsCurrencyDollar className="text-lg" />,
						},
					].map((item) => (
						<Link
							to={`/dashboard/${item.slug}`}
							className={`font-light button button-invisible button-small ${
								compact ? "justify-center" : ""
							}`}
							key={item.id}
						>
							{item.icon}
							{!compact && <span>{item.name}</span>}
						</Link>
					))}
				</div>
			)}

			<div>
				<Link
					to="/roadmap"
					className={`${
						compact ? "px-4" : "px-8"
					} font-light tracking-wider text-xx`}
				>
					{compact ? "RM" : "Roadmap"}
				</Link>
			</div>

			<div
				className={`absolute hidden sm:block right-0 z-10 ${
					compact ? "top-0" : "top-6"
				}`}
			>
				<button className="justify-center w-10 h-10 p-0 rounded-l-full button button-ghost">
					{compact ? (
						<HiOutlineChevronDoubleRight
							onClick={(event) => {
								event.preventDefault();
								setCompact(false);
							}}
						/>
					) : (
						<HiOutlineChevronDoubleLeft
							onClick={(event) => {
								event.preventDefault();
								setCompact(true);
							}}
						/>
					)}
				</button>
			</div>
		</div>
	);
};
