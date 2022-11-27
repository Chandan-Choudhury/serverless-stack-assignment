import { StackContext, AppSyncApi } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  const api = new AppSyncApi(stack, "AppSyncApi", {
    schema: "services/graphql/schema.graphql",
    dataSources: {
      instances: "functions/query.handler",
    },
    resolvers: {
      "Query    listInstances": "instances",
      "Query    getInstanceByInstanceId": "instances",
      "Query    getInstanceByName": "instances",
      "Query    getInstanceByState": "instances",
      "Query    getInstanceByType": "instances",
      "Query    getInstanceByKeyName": "instances",
      "Query    getInstanceByZone": "instances",
      "Query    getInstanceByLaunchTime": "instances",
      "Query    getInstanceByPublicIpAddress": "instances",
      "Query    getInstanceByRegion": "instances",
    },
  });

  stack.addOutputs({
    ApiUrl: api.url,
  });
}
