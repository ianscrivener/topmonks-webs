/**
 * merges original config with a some extra configuration, adding support to import shared files
 */

const path = require("path");
const { pathToFileURL } = require("url");

/**
 *
 * @param {String} dirname just send __dirname
 * @param {*} config your custom config
 * @returns {Object} new config object
 */
const withShared = function (dirname, config) {
  return {
    ...config,

    html: {
      ...config.html,
      excludeFolders: ["layouts", "shared", "macros"],
      src: "html",
      nunjucksRender: {
        ...config.html.nunjucksRender,
        path: [
          path.resolve(dirname, "../src/html"),
          path.resolve(dirname, "../../shared/src") // <- add if you want to use shared html
        ]
      }
    },

    // overwritten by incoming config
    production: {
      rev: true,
      ...config.production
    },

    additionalTasks: {
      ...config.additionalTasks,
      initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
        if (config.additionalTasks && config.additionalTasks.initialize) {
          config.additionalTasks.initialize(gulp, PATH_CONFIG, TASK_CONFIG);
        }

        const { task, watch, series } = gulp;

        task("shared:watch", cb => {
          if (task.stylesheets)
            watch(
              path.resolve(dirname, "../../shared/src", "**/*.{css,scss}"),
              series("stylesheets")
            );
          watch(
            path.resolve(dirname, "../../shared/src", "**/*.{html,njk,json}"),
            series("html")
          );
          cb();
        });
      },
      development: {
        ...((config.additionalTasks && config.additionalTasks.development) ||
          {}),
        postbuild: [
          ...((config.additionalTasks &&
            config.additionalTasks.development &&
            config.additionalTasks.development.postbuild) ||
            []),
          "shared:watch"
        ]
      }
    }
  };
};

module.exports = withShared;
