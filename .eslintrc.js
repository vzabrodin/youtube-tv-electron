module.exports = {
    "extends": "standard",
    "rules": {
        "semi": ["error", "always"],
        "no-tabs": 0,
        "indent": ["error", 4],
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }]
    }
};