module.exports = {
  // plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    // 'stylelint-config-rational-order'
    'stylelint-config-recess-order',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-html',
    'stylelint-config-recommended'
  ],
  // overrides: [
  //   {
  //     'files': ['*.vue', '**/*.vue'],
  //     'rules': {
  //       // 'unit-allowed-list': ['em', 'rem', 's']
  //     }
  //   }
  // ],
  rules: {
    'max-line-length': 180,
    // 'unit-allowed-list': ['px', 'rpx', '%', 's', 'deg'],
    // 'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['/deep/'] }],
    // 'selector-pseudo-element-no-unknown': null,
    // 'no-invalid-position-at-import-rule': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // 'scss/comment-no-empty': null,
    'selector-class-pattern': '^[a-zA-Z_][a-zA-Z0-9_-]+$',
    // 'selector-id-pattern': '^[a-zA-Z_][a-zA-Z0-9_-]+$',
    'scss/dollar-variable-pattern': '^[a-zA-Z_-][a-zA-Z0-9_-]+$',
    // 'scss/at-mixin-pattern': '^[a-zA-Z_-][a-zA-Z0-9_-]+$',
    // 'keyframes-name-pattern': '^[a-zA-Z_][a-zA-Z0-9_-]+$',
    // 'selector-type-no-unknown': [true, { ignore: ['custom-elements', 'default-namespace'] }],
    // 'custom-property-pattern': 'c-.+|w-.+|h-.+|bdrs-.+',
    'custom-property-pattern': '^[a-zA-Z_][a-zA-Z0-9_-]+$',
    // 'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'string-quotes': 'single',
    'declaration-block-trailing-semicolon': null
  }
}
