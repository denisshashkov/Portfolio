module.exports = {
  stories: ["../src/admin/components/**/*.stories.js"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.(p|post|)css$/,
      use: ["vue-style-loader", "css-loader", "postcss-loader"],
    });

    config.module.rules.push({
      test: /\.pug$/,
      use: ["pug-plain-loader"],
    });


    return config;
  },
};

