// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    ignores: ['src/environments/*.ts'] // ← ignora os ficheiros de ambiente
  },
  tseslint.configs.base,
  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    }
  }
]);
