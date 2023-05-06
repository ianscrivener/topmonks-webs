import pathConfig from "./path-config.json" assert { type: "json" };
import { withShared } from "../../shared/config/index.mjs";

export default withShared(
  {
    javascripts: false,
    images: true,
    cloudinary: true,
    fonts: true,
    static: true,
    svgSprite: true,
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
