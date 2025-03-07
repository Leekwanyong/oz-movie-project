module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        'plugin:prettier/recommended',
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "jsx-a11y", "import", "@typescript-eslint"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "import/extensions": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "no-console": "warn",
        "react/jsx-props-no-spreading": "off",
        "react/prop-types": "off",
    },
    settings: {
        "import/resolver": {
            typescript: {},
        },
    },
};
