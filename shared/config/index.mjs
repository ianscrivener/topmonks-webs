import { SharedRegistry, SharedWatchTask } from "./SharedRegistry.mjs";
import projectPath from "@topmonks/blendid/gulpfile.js/lib/projectPath.mjs";

export function withShared(config, pathConfig) {
  if (!pathConfig.sharedSrc) {
    throw new Error(
      "Property pathConfig.sharedSrc is not defined, but required."
    );
  }
  return Object.assign(config, {
    registries: [new SharedRegistry(config, pathConfig)],
    additionalTasks: {
      ...config.additionalTasks,
      development: {
        ...config.additionalTasks?.development,
        postbuild: [SharedWatchTask]
          .concat(config.additionalTasks?.development?.postbuild)
          .filter(Boolean)
      }
    },
    html: config.html
      ? {
          ...config.html,
          nunjucksRender: {
            ...config.html.nunjucksRender,
            path: [
              projectPath(pathConfig.src, pathConfig.html.src),
              projectPath(pathConfig.sharedSrc)
            ]
              .concat(config.html.nunjucksRender?.path)
              .filter(Boolean)
          }
        }
      : config.html
  });
}
