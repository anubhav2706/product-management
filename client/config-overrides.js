const {
  addDecoratorsLegacy,
  override,
  disableEsLint
} = require("customize-cra");

// module.exports = {
//   webpack: override(addDecoratorsLegacy(), disableEsLint()),
//   devServer: overrideDevServer(addDecoratorsLegacy(), disableEsLint())
// };

module.exports = override(
  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),

  // disable eslint in webpack
  disableEsLint()
);
