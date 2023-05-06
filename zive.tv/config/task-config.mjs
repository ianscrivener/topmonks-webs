import pathConfig from "./path-config.json" assert { type: "json" };
import { withShared } from "../../shared/config/index.mjs";

export default withShared(
  {
    images: true,
    cloudinary: false,
    fonts: true,
    static: true,
    svgSprite: true,
    javascripts: false,
    esbuild: true,
    stylesheets: true,
    workboxBuild: false,

    html: {
      collections: ["caffe", "czpodcast"],
      nunjucksRender: {
        globals: {
          currentYear: new Date().getFullYear()
        },
        filters: {
          year() {
            return new Date().getFullYear();
          }
        }
      }
    },

    browserSync: {
      server: {
        baseDir: pathConfig.dest
      }
    },

    production: {
      rev: false
    }
  },
  pathConfig
);
