
const path = require('path');

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
	"plugins": [
      [require.resolve('babel-plugin-module-resolver'), {
		    "root": "./src",
        "alias": {
          "Components": "./src/components",
          "Screens": "./src/screens",
          "Features": "./src/features",
          "Utils": "./src/utils",
          "With": "./src/with",
          "State": "./src/state",
        }
      }]
    ]
  };
};