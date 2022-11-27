import { DynamoDB } from "aws-sdk";
import Instance from "./Instance";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function getInstanceByPublicIpAddress(
  InstancePublicIp: string
): Promise<Instance | undefined> {
  const params = {
    TableName: "EC2_Data",
    IndexName: "PublicIpAddress-index",
    KeyConditionExpression: "PublicIpAddress = :PublicIpAddress",
    ExpressionAttributeValues: {
      ":PublicIpAddress": InstancePublicIp,
    },
  };

  const Item: any = await dynamoDb.query(params).promise();

  return Item.Items as Instance;
}
