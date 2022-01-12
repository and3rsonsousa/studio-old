import { motion } from "framer-motion";
import { IAccount } from "~/types";

export default function Avatar({
	avatar,
	small = false,
	medium = false,
	smallest = false,
	border = false,
	_className,
}: {
	avatar: IAccount;
	small?: Boolean;
	medium?: Boolean;
	smallest?: Boolean;
	border?: Boolean;
	_className?: string;
}) {
	return avatar ? (
		<motion.div
			layout
			transition={{ ease: "easeOut" }}
			className={_className ? _className : undefined}
		>
			<div
				className={` ${
					smallest
						? "w-4 h-4 text-xx"
						: small
						? "w-6 h-6 text-xs"
						: medium
						? "w-9 h-9 text-sm"
						: "w-6 h-6 lg:w-14 text-xx lg:h-14 lg:text-base"
				} rounded-full overflow-hidden font-bold bg-neutral-2 text-neutral-4 flex justify-center items-center${
					border ? " ring-2 ring-white" : ""
				}`}
				style={
					avatar.colors
						? { backgroundColor: avatar.colors[0]?.hex }
						: undefined
				}
			>
				{avatar.image ? (
					<img
						src={avatar.image.url}
						title={avatar.name}
						className="w-full h-full object-fit"
					/>
				) : (
					<span
						style={
							avatar.colors
								? { color: avatar.colors[1]?.hex }
								: undefined
						}
					>
						<span className="lg:hidden">
							{avatar.name ? avatar.name.substring(0, 1) : "A"}
						</span>
						<span className="hidden lg:block">
							{avatar.name
								? avatar.name.substring(
										0,
										smallest || small ? 1 : 3
								  )
								: "A"}
						</span>
					</span>
				)}
			</div>
		</motion.div>
	) : null;
}
