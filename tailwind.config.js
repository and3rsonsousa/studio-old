var colors = require("tailwindcss/colors");

module.exports = {
	content: ["./app/**/*.{ts,tsx}"],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			white: "#ffffff",
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
				error: colors.red,
				success: colors.emerald,
				warning: colors.amber,
			},
			neutral: {
				100: "#F0F2F5",
				200: "#E0E4EB",
				300: "#C2C9D6",
				400: "#A3ADC2",
				500: "#8591AD",
				600: "#525C7A",
				700: "#394360",
				800: "#242A42",
				900: "#0D1126",
			},
		},
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
