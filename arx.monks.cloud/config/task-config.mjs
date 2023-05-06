import pathConfig from "./path-config.json" assert { type: "json" };
import { withShared } from "../../shared/config/index.mjs";

export default withShared(
  {
    images: true,
    cloudinary: true,
    fonts: true,
    static: true,
    svgSprite: true,
    javascripts: false,
    stylesheets: true,
    workboxBuild: false,

    generate: {
      json: [
        {
          collection: "news",
          mergeOptions: {
            startObj: [],
            concatArrays: true,
            edit: x => [{ perex: x.body.split("\n").shift(), ...x }]
          }
        },
        {
          collection: "investments",
          mergeOptions: {
            startObj: [],
            concatArrays: true
          }
        },
        {
          collection: "team",
          mergeOptions: {
            startObj: [],
            concatArrays: true
          }
        }
      ],
      html: [
        {
          collection: "news",
          template: "shared/news-entry.njk",
          route: x => `news/${x.date.replace("T00:00:00.000Z", "")}/index.html`
        }
      ],
      redirects: [
        {
          collection: "news",
          host: "https://www.arxequity.com",
          route: x => [
            x.originalUrl.replace("https://www.arxequity.com/", ""),
            `/news/${x.date.replace("T00:00:00.000Z", "")}/`
          ]
        }
      ]
    },

    html: {
      collections: ["images", "investments", "news", "team"]
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
