module.exports = {
    "root": true, //多个eslint文件时，以这个为标准
    "env": {
        "node": true,
        "browser": true, //使用环境: browser/node
        "es2021": true
    },
    "extends": [
        'airbnb-base',
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": { //全局变量
        "window": true,
        "document": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "import",
        "@typescript-eslint"
    ],
    "rules": {
        'import/no-unresolved': "off",
        'import/no-extraneous-dependencies': "off",
        'import/extensions': "off",
        'import/no-cycle': "off",
        "import/no-import-module-exports": "off",
        "import/prefer-default-export": "off",
        "no-console": "off", //是否允许console.log
        "indent": [ //缩进
            2,
            4
        ],
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/ban-types": [
            "error",
            {
                "extendDefaults": true,
                "types": {
                    "{}": false
                }
            }
        ]
    }
};
