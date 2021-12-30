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
			brand: {
				dark: "#4B14B8",
				DEFAULT: "#8001FF",
				light: "#5768FF",
				orange: {
					DEFAULT: "#FA6938",
					dark: "#C20041",
					light: "#FF971F",
				},
				teal: {
					DEFAULT: "#26D9B8",
					light: "#5EEDBE",
				},
				yellow: {
					DEFAULT: "#F5C73D",
					light: "#F6DB55",
				},
			},
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
			gray: {
				50: "#F9FAFB",
				100: "#EFF2F5",
				200: "#E1E4EA",
				300: "#C2C9D6",
				400: "#8592AD",
				500: "#6A7795",
				600: "#525C7A",
				700: "#394260",
				800: "#242A42",
				900: "#0D1126",
			},
		},
		extend: {},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
	],
};
