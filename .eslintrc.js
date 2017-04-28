module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "react/jsx-uses-vars": [2],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [0],
        "no-unused-vars": [0],
    }
};