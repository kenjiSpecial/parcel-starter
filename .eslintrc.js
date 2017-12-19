module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        // "prettier",
        // "eslint-plugin-prettier"
    ],
    "rules": {
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        // "prettier/prettier": "error"
    }
};
