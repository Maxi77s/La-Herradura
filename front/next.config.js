// next.config.js
module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'three/examples/jsm/loaders/GLTFLoader.js': false, // Evita que Webpack lo resuelva localmente
    };
    return config;
  },
  reactStrictMode: true,
};
