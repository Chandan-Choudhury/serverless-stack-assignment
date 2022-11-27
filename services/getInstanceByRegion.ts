import { DynamoDB } from "aws-sdk";
import Instance from "./Instance";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function getInstanceByRegion(
  InstanceRegion: string
): Promise<Instance | undefined> {
  const params = {
    TableName: "EC2_Data",
    IndexName: "InstanceRegion-index",
    KeyConditionExpression: "InstanceRegion = :InstanceRegion",
    ExpressionAttributeValues: {
      ":InstanceRegion": InstanceRegion,
    },
  };

  const Item: any = await dynamoDb.query(params).promise();

  return Item.Items as Instance;
}
