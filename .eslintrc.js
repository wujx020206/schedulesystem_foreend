// eslint-disable-next-line no-undef
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:vue/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        allowImportExportEverywhere: true
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // 关闭名称校验
        'vue/multi-word-component-names': "off"
    }
}
