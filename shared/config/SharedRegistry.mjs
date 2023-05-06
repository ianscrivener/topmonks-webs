import DefaultRegistry from "undertaker-registry";
import projectPath from "@topmonks/blendid/gulpfile.js/lib/projectPath.mjs";

export const SharedWatchTask = "shared:watch";
export class SharedRegistry extends DefaultRegistry {
  constructor(config, pathConfig) {
    super();
    this.config = config;
    this.pathConfig = pathConfig;
  }

  init({ task, series, watch }) {
    task(SharedWatchTask, done => {
      if (this.config.stylesheets) {
        watch(
          projectPath(
            this.pathConfig.sharedSrc,
            "**",
            `*.{${this.config.stylesheets.extensions}`
          ),
          series("stylesheets")
        );
      }
      if (this.config.html) {
        watch(
          projectPath(
            this.pathConfig.sharedSrc,
            "**",
            `*.{${this.config.html.extensions}`
          ),
          series("html")
        );
      }
      done();
    });
  }
}
