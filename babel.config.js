// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
//     plugins: ['react-native-reanimated/plugin']
//   };
// };

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};

// const pak = require('../package.json');

// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     [
//       'module-resolver',
//       {
//         extensions: ['.tsx', '.ts', '.js', '.json'],
//         ...
//       }
//     ],
//     'react-native-reanimated/plugin' // PUT IT HERE
//   ]
// };
