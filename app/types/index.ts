import { Dayjs } from "dayjs";

export interface IUser {
	id: string;
	name?: string;
	username?: string;
	image?: {
		url: string;
	};
	accounts?: IAccount[];
	role?: string;
}

export interface IAccount {
	id: string;
	name: string;
	slug: string;
	colors: { hex: string }[];
	profiles?: IUser;
	actions?: IAction[];
	image?: { url: string };
}

export interface IAction {
	id: string;
	name: string;
	description?: string;
	profile_responsible?: IUser;
	account: IAccount;
	start?: any;
	end?: any;
	time?: any;
	step?: IBasic;
	flow?: IBasic;
	tag?: IBasic;
	validating?: Boolean;
	campaign: ICampaign;
}

export interface ICampaign {
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

export interface IBasic {
	id: string;
	name: string;
	slug?: string;
}

export interface IDashboardIndex {
	campaigns: ICampaign[];
	header_profile: IUser;
	profile: IUser;
	profiles: IUser[];
	tags: IBasic[];
	steps: IBasic[];
	flows: IBasic[];
}

export interface IBill {
	id: string;
	name: string;
	description: string;
	nature: string;
	date: Dayjs;
	value: number;
}
