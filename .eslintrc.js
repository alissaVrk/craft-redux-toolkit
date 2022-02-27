module.exports = {
    extends: ["react-app"],
    plugins: ["import"],
    settings: {
        "import/extensions": [".ts", ".tsx"],
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
            "typescript": {
                "alwaysTryTypes": true,
            }
        }
    },
    rules: {
        "@typescript-eslint/no-unused-vars": 2,
    }
}