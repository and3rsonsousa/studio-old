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

export type { User, Account };
