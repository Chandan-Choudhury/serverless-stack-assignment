import { DynamoDB } from "aws-sdk";
import Instance from "./Instance";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function getInstanceByKeyName(
  InstanceKeyName: string
): Promise<Instance | undefined> {
  const params = {
    TableName: "EC2_Data",
    IndexName: "KeyName-index",
    KeyConditionExpression: "KeyName = :KeyName",
    ExpressionAttributeValues: {
      ":KeyName": InstanceKeyName,
    },
  };

  const Item: any = await dynamoDb.query(params).promise();

  return Item.Items as Instance;
}
