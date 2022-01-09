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
			idea: colors.yellow,
			do: colors.orange,
			doing: colors.rose,
			review: colors.purple,
			done: colors.blue,
			accomplished: colors.lime,

			post: colors.purple,
			stories: colors.rose,
			reels: colors.orange,
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
