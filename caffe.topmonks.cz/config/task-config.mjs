import pathConfig from "./path-config.json" assert { type: "json" };
import { withShared } from "../../shared/config/index.mjs";

export default withShared(
  {
    images: true,
    javascripts: false,
    fonts: true,
    static: true,
    svgSprite: true,
    stylesheets: true,
    workboxBuild: false,
    cloudinary: {
      manifest: "posters.json"
    },

    html: {
      collections: ["events", "posters"]
    },

    browserSync: {
      server: {
        baseDir: pathConfig.dest
      }
    },

    generate: {
      json: [
        {
          collection: "events",
          concatArrays: true,
          mergeOptions: {
            edit(json) {
              return { [json.sessionNumber]: json };
            }
          }
        }
      ]
    },

    production: {
      rev: true
    }
  },
  pathConfig
);
