import pathConfig from "./path-config.json" assert { type: "json" };
import { withShared } from "../../shared/config/index.mjs";

export default withShared(
  {
    images: true,
    cloudinary: true,
    fonts: true,
    static: true,
    svgSprite: true,
    stylesheets: true,
    workboxBuild: false,

    html: {
      collections: ["images"]
    },

    javascripts: {
      modules: {
        "new-age": "new-age.js"
      }
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
