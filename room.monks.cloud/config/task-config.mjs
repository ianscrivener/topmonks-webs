import pathConfig from "./path-config.json" assert { type: "json" };
import { withShared } from "../../shared/config/index.mjs";

export default withShared(
  {
    images: false,
    cloudinary: false,
    fonts: true,
    static: true,
    svgSprite: false,
    javascripts: false,
    esbuild: true,
    stylesheets: true,
    workboxBuild: false,
    html: true,

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
