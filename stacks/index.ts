import { MyStack } from "./MyStack";
import { CronJob } from "./CronJob";
import { QueueStack } from "./QueueStack";
import { App } from "@serverless-stack/resources";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app.stack(MyStack);
  app.stack(CronJob);
  app.stack(QueueStack);
}
