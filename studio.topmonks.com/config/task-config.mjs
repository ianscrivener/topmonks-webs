import pathConfig from "./path-config.json" assert { type: "json" };
import { withShared } from "../../shared/config/index.mjs";

export default withShared(
  {
    images: true,
    cloudinary: false,
    javascripts: false,
    fonts: false,
    static: true,
    svgSprite: false,
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
  },
  pathConfig
);
