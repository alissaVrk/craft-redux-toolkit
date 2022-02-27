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
        "import/no-cycle": 2,
        "@typescript-eslint/no-unused-vars": 1,
        "import/no-internal-modules": [ "error", {
            "forbid": [
              "ng-connect/**", 
              "redux-root/**",
              "components/**", 
              "communication/**", 
              "?(features)/auth/!(authTestUtils)", "?(features)/auth/!(authTestUtils)/**",
              "?(features)/craft-items/!(craftItemsTestUtils)", "?(features)/craft-items/!(craftItemsTestUtils)/**",
              "?(features)/workspace/!(workspaceTestUtils)", "?(features)/workspace/!(workspaceTestUtils)/**",
            ]
          } ],
    }
}