import eslintPluginPrettier from "eslint-plugin-prettier";
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ["**/*.ts"],
    plugins: {
      prettier: eslintPluginPrettier,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
    },
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
];
