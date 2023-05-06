import pathConfig from "./path-config.json" assert { type: "json" };
import { withShared } from "../../shared/config/index.mjs";

export default withShared(
  {
    images: true,
    cloudinary: true,
    javascripts: false,
    fonts: true,
    static: true,
    svgSprite: true,
    stylesheets: true,
    workboxBuild: false,

    html: {
      collections: ["images"]
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
