interface User {
	id: string;
	name: string;
	username?: string;
	image?: {
		url: string;
	};
}

export type { User };
