module.exports = {
  root: true,
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly'
  },
  env: {
    browser: true,
    es2021: true,
    node: true
    // commonjs: true,
    // amd: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['html', 'eslint-plugin-prettier', 'prettier'],
  extends: [
    '@vue/standard',
    '@vue/typescript/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential'
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁用 debugger
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁用 console
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    'vue/html-self-closing': 'off', // 执行自闭合的风格
    'vue/max-attributes-per-line': [
      // 强制每行属性的最大数量
      'warn',
      {
        singleline: {
          max: 5
        },
        multiline: {
          max: 1
        }
      }
    ],
    'vue/singleline-html-element-content-newline': 'off', // 要求单行元素的内容前后有一个换行符
    'vue/attributes-order': [
      'error',
      {
        alphabetical: true
      }
    ]
  }
}
