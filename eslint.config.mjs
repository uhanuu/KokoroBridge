import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // 일반적인 코드 품질 규칙
      "no-unused-vars": "off", // TypeScript가 처리
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // React 관련 규칙
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off", // TypeScript가 처리
      "react/react-in-jsx-scope": "off", // Next.js에서 불필요
      "react-hooks/exhaustive-deps": "warn",

      // Next.js 관련 규칙
      "@next/next/no-img-element": "warn",
      "@next/next/no-page-custom-font": "off",

      // TypeScript 관련 규칙
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-ts-comment": "warn",

      // 코드 스타일 규칙
      "prefer-const": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",

      // Import 규칙
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      // 접근성 관련 규칙 (jsx-a11y)
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",

      // 성능 관련 규칙
      "react/jsx-key": "warn",
      "react/jsx-no-bind": "off",

      // 개발 환경에서만 적용할 규칙들
      ...(process.env.NODE_ENV === "production"
        ? {
            "no-console": "error",
            "no-debugger": "error",
          }
        : {}),
    },
  },
  {
    files: ["**/*.config.{js,ts,mjs}", "**/middleware.ts"],
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  },
  {
    files: ["**/__tests__/**/*", "**/*.test.{js,ts,tsx}", "**/*.spec.{js,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "node_modules/**",
      ".env*",
      "*.config.js",
      "*.config.mjs",
      "public/**",
      "coverage/**",
      ".nyc_output/**",
    ],
  },
  {
    files: ["next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];

export default eslintConfig;
