/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  trailingComma: "es5",
  tabWidth: 4,
  semi: true,
  singleQuote: false,
  printWidth: 90,
  useTabs: false,
};

module.exports = config;
