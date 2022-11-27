import { DynamoDB } from "aws-sdk";
import Instance from "./Instance";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function getInstanceByLaunchTime(
  InstanceLaunchTime: string
): Promise<Instance | undefined> {
  const params = {
    TableName: "EC2_Data",
    IndexName: "LaunchTime-index",
    KeyConditionExpression: "LaunchTime = :LaunchTime",
    ExpressionAttributeValues: {
      ":LaunchTime": InstanceLaunchTime,
    },
  };

  const Item: any = await dynamoDb.query(params).promise();

  return Item.Items as Instance;
}
