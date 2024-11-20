import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import importHelpers from "eslint-plugin-import-helpers";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser
    },
    plugins: {
      react,
      "@typescript-eslint": tsPlugin,
      prettier,
      "react-hooks": reactHooks,
      "import-helpers": importHelpers
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error",
      "import-helpers/order-imports": [
        "warn",
        {
          newlinesBetween: "always",
          groups: [
            ["/^react/"],
            "module",
            "/^@shared/",
            "/^@styles/",
            "/^@assets/",
            "/^@components/",
            "/^@pages/",
            "/^@utils/",
            "/^@services/",
            ["parent", "sibling", "index"]
          ],
          alphabetize: { order: "asc", ignoreCase: true }
        }
      ]
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
