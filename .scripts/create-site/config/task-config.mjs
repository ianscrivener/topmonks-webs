import pathConfig from "./path-config.json" assert { type: "json" };
import { withShared } from "../../shared/config/index.mjs";

export default withShared({
  images: true,
  icons: true,
  cloudinary: true,
  fonts: true,
  static: true,
  svgSprite: true,
  javascripts: false,
  esbuild: true,
  stylesheets: true,
  workboxBuild: false,

  html: {
    collections: []
  },

  browserSync: {
    server: {
      baseDir: pathConfig.dest
    }
  },

  production: {
    rev: true
  }
});
