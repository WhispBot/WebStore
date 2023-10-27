/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
    plugins: ["prettier-plugin-tailwindcss"],
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    printWidth: 90,
    useTabs: false,
};

export default config;
