module.exports = {
  default: {
    require: ['features/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['@cucumber/pretty-formatter'],
    paths: ['features/**/*.feature'],
    publishQuiet: true,
    timeout: 60000
  }
};
