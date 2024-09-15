import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    extends: [
      "eslint:recommended",
      "plugin:import/errors",
      "plugin:react/recommended",
      "plugin:jsx-a11y/recommended",
    ],
    plugins: ["react", "import", "jsx-a11y"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
