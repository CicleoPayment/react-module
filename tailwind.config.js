/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    prefix: 'cap-',
    theme: {
        extend: {
            fontSize: {
                xs: ".75rem",
                sm: ".875rem",
                tiny: ".875rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.25rem",
                "2xl": "1.5rem",
                "3xl": "1.875rem",
                "4xl": "2.25rem",
                "5xl": "3rem",
                "6xl": "4rem",
                "7xl": "5rem",
            },
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#0061FF",

                    secondary: "#0044FF",

                    accent: "#e5ff68",

                    neutral: "#1D2B35",

                    "base-100": "#191E24",

                    info: "#0061FF",

                    success: "#2FBC34",

                    warning: "#FFC200",

                    error: "#D42620",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
