import { useState } from "react";
import { CgBoard } from "react-icons/cg";
import {
	HiOutlineCalendar,
	HiOutlineViewList,
	HiPlus,
	HiX,
} from "react-icons/hi";
import { MdOutlineGridOn, MdOutlineTableRows } from "react-icons/md";
import { IAccount, IBasic, ICampaign, IUser } from "~/types";
import AddActionPopup from "./Actions/AddActionPopup";

const Header = ({
	profile,
	profiles,
	accounts,
	steps,
	tags,
	flows,
	campaigns,
	start,
	mutate,
}: {
	profile: IUser;
	profiles: IUser[];
	accounts: IAccount[];
	steps: IBasic[];
	tags: IBasic[];
	flows: IBasic[];
	campaigns: ICampaign[];
	start?: string;
	mutate: Function;
}) => {
	const [microPopup, showMicroPopup] = useState(false);

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center">
				<div>
					<button className="text-xl button button-small button-invisible">
						<MdOutlineTableRows />
					</button>
				</div>
				<div>
					<button className="text-xl button button-small button-invisible">
						<HiOutlineCalendar />
					</button>
				</div>
				<div>
					<button className="text-xl button button-small button-invisible">
						<CgBoard />
					</button>
				</div>
				<div>
					<button className="text-xl button button-small button-invisible">
						<HiOutlineViewList />
					</button>
				</div>
				<div>
					<button className="text-xl button button-small button-invisible">
						{/* <BsGrid3X3 /> */}
						<MdOutlineGridOn />
					</button>
				</div>
			</div>
			<div></div>
			<div className="relative group">
				{microPopup ? (
					<button
						className="button button-primary button-circle"
						onClick={() => {
							showMicroPopup(false);
						}}
					>
						<HiX />
					</button>
				) : (
					<button
						className="button button-primary button-circle"
						onClick={() => showMicroPopup(true)}
					>
						<HiPlus />
					</button>
				)}
				<AddActionPopup
					accounts={accounts}
					campaigns={campaigns}
					profile={profile}
					flows={flows}
					microPopup={microPopup}
					profiles={profiles}
					steps={steps}
					tags={tags}
					start={start}
					mutate={mutate}
				/>
			</div>
		</div>
	);
};

export default Header;
