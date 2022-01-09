import { Dayjs } from "dayjs";

interface User {
	id: string;
	name?: string;
	username?: string;
	image?: {
		url: string;
	};
	accounts?: Account[];
	role?: string;
}

interface Account {
	id: string;
	name: string;
	slug: string;
	colors: { hex: string }[];
	profiles?: User;
	actions?: [];
	image?: { url: string };
}

interface Action {
	id: string;
	name: string;
	description?: string;
	profile_responsible?: User;
	startDate?: any;
	endDate?: any;
	step?: Basic;
}

interface Basic {
	id: string;
	name: string;
	slug?: string;
}

export type { User, Account, Action };
