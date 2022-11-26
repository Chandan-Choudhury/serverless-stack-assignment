import { Cron, StackContext } from "@serverless-stack/resources";

export function CronJob({ stack }: StackContext) {
  new Cron(stack, "Cron", {
    schedule: "rate(5 minutes)",
    job: "functions/lambda.handler",
  });
}
