module.exports = {
  extends: ['next', 'prettier'],
  plugins: ['unused-imports', 'perfectionist'],
  rules: {
    'unused-imports/no-unused-imports': 'warn',
    'perfectionist/sort-imports': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
        groups: [
          'side-effect',
          'style',
          'react',
          ['builtin', 'external', 'type'],
          ['internal-type', 'internal'],
          [
            'parent-type',
            'sibling-type',
            'index-type',
            'parent',
            'sibling',
            'index',
          ],
          'object',
          'unknown',
        ],
        'custom-groups': {
          value: {
            react: ['react', 'react-*'],
          },
          type: {
            react: 'react',
          },
        },
        'newlines-between': 'always',
        'read-tsconfig': true,
      },
    ],
  },
}
