import { StackContext, Queue, Api } from "@serverless-stack/resources";

export function QueueStack({ stack }: StackContext) {
  const queue = new Queue(stack, "Queue", {
    consumer: "functions/lambda.handler",
  });

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [queue],
      },
    },
    routes: {
      "POST /": "functions/queue.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
