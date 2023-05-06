import pathConfig from "./path-config.json" assert { type: "json" };

export default {
  images: true,
  cloudinary: true,
  javascripts: false,
  fonts: true,
  static: true,
  svgSprite: true,
  stylesheets: true,
  workboxBuild: false,

  html: {
    collections: ["articles", "podcasts", "avatar"],
    nunjucksRender: {
      filters: {
        longDate(str, locale) {
          return new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: "long",
            day: "numeric"
          }).format(new Date(str));
        },
        transformation(s, t) {
          return s && s.replace("/upload/", `/upload/${t}/`);
        }
      }
    }
  },

  browserSync: {
    server: {
      baseDir: pathConfig.dest
    }
  },

  generate: {
    json: [{
      collection: "articles",
      concatArrays: true,
      mergeOptions: {
        edit(json) {
          return {[json.published.split("-").shift()]: [json]};
        }
      }
    }, {
      collection: "podcasts",
      concatArrays: true,
      mergeOptions: {
        edit(json) {
          return {[json.published.split("-").shift()]: [json]};
        }
      }
    }]
  },

  production: {
    rev: true
  }
};
