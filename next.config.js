const webpack = require("webpack");
// const withImages = require('next-images')
module.exports = {
  reactStrictMode: true,
};
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
};
// module.exports = withImages()
module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};
