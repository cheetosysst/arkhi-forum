/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./pages/**/*.{html,js,jsx,ts,tsx}",
		"./components/**/*.{html,js,jsx,ts,tsx}",
		"./renderer/**/*.{html,js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				smooth: "1.5rem/1.25rem",
			},
		},
	},
	plugins: ["prettier-plugin-tailwindcss"],
};
