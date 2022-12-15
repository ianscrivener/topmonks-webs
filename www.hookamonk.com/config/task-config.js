const pathConfig = require("./path-config.json");
const createSharedTaskConfig = require("../../shared/config/createSharedTaskConfig");

const config = createSharedTaskConfig(__dirname, {
  images: false,
  cloudinary: false,
  javascripts: false,
  fonts: false,
  static: true,
  svgSprite: false,
  stylesheets: false,
  workboxBuild: false,

  html: false,

  browserSync: {
    server: {
      baseDir: pathConfig.dest
    }
  },

  production: {
    rev: false
  }
});

module.exports = config;
