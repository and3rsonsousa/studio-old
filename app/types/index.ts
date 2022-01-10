import { Dayjs } from "dayjs";

interface IUser {
	id: string;
	name?: string;
	username?: string;
	image?: {
		url: string;
	};
	accounts?: IAccount[];
	role?: string;
}

interface IAccount {
	id: string;
	name: string;
	slug: string;
	colors: { hex: string }[];
	profiles?: IUser;
	actions?: [];
	image?: { url: string };
}

interface IAction {
	id: string;
	name: string;
	description?: string;
	profile_responsible?: IUser;
	start?: any;
	end?: any;
	step?: IBasic;
	flow?: IBasic;
	tag?: IBasic;
}

interface ICampaign {
	id: string;
	name: string;
	briefing?: string;
	actions: IAction[];
	account: IAccount;
	start?: any;
	end?: any;
	step?: IBasic;
	flow?: IBasic;
}

interface IBasic {
	id: string;
	name: string;
	slug?: string;
}

export type { IUser, IAccount, IAction, ICampaign, IBasic };
