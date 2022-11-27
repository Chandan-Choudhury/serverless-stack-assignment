import { DynamoDB } from "aws-sdk";
import Instance from "./Instance";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function getInstanceByZone(
  InstanceZone: string
): Promise<Instance | undefined> {
  const params = {
    TableName: "EC2_Data",
    IndexName: "AvailabilityZone-index",
    KeyConditionExpression: "AvailabilityZone = :AvailabilityZone",
    ExpressionAttributeValues: {
      ":AvailabilityZone": InstanceZone,
    },
  };

  const Item: any = await dynamoDb.query(params).promise();

  return Item.Items as Instance;
}
