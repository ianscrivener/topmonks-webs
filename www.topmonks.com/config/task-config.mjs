import pathConfig from "./path-config.json" assert { type: "json" };
import { withShared } from "../../shared/config/index.mjs";

export default withShared(
  {
    javascripts: false,
    images: true,
    cloudinary: false,
    fonts: true,
    static: true,
    svgSprite: true,
    stylesheets: true,
    workboxBuild: false,

    html: {
      collections: ["team"]
    },

    browserSync: {
      server: {
        baseDir: pathConfig.dest
      }
    },

    production: {
      rev: true
    },

    generate: {
      json: [
        {
          collection: "team",
          mergeOptions: {
            edit(json) {
              return { members: { [json.id]: json } };
            }
          }
        }
      ]
    }
  },
  pathConfig
);
