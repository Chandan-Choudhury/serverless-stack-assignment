import { DynamoDB } from "aws-sdk";
import Instance from "./Instance";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function getInstanceByType(
  InstanceType: string
): Promise<Instance | undefined> {
  const params = {
    TableName: "EC2_Data",
    IndexName: "InstanceType-index",
    KeyConditionExpression: "InstanceType = :InstanceType",
    ExpressionAttributeValues: {
      ":InstanceType": InstanceType,
    },
  };

  const Item: any = await dynamoDb.query(params).promise();

  return Item.Items as Instance;
}
