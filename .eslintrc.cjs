module.exports = {
  env: { browser: true, node: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    "react-hooks/exhaustive-deps": 0,
    "react/prop-types": "off",
    "react/no-unescaped-entities": 0,
    'react-refresh/only-export-components': 'warn',
    "no-unused-vars": 0,
  },
}
