var colors = require("tailwindcss/colors");

module.exports = {
	content: ["./app/**/*.{ts,tsx}"],
	darkMode: "class",
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			white: "#ffffff",
			black: "#000000",
			gray: colors.slate,
			interdimensional: {
				dark: "#4B14B8",
				DEFAULT: "#8001FF",
				light: "#5768FF",
			},
			outrageous: "#FA6938",
			pacific: "#26D9B8",
			mikado: "#F5C73D",

			semantic: {
				error: {
					DEFAULT: colors.red[500],
					dark: colors.red[700],
					light: colors.red[100],
				},
				success: {
					DEFAULT: colors.emerald[500],
					dark: colors.emerald[700],
					light: colors.emerald[100],
				},
				warning: {
					DEFAULT: colors.yellow[500],
					dark: colors.yellow[700],
					light: colors.yellow[100],
				},
			},
			planning: colors.lime,
			copy: colors.teal,
			creative: colors.blue,
			account: colors.violet,

			idea: colors.yellow,
			do: colors.orange,
			doing: colors.red,
			review: colors.pink,
			done: colors.purple,
			accomplished: colors.indigo,

			post: colors.purple,
			stories: colors.rose,
			reels: colors.amber,
			meeting: colors.yellow,
			copy: colors.emerald,
			video: colors.sky,
			shooting: colors.blue,
			press: colors.indigo,
			task: colors.lime,
			tiktok: colors.pink,
		},
		extend: {},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/line-clamp"),
	],
};
