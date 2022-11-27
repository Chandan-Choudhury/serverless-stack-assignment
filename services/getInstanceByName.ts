import { DynamoDB } from "aws-sdk";
import Instance from "./Instance";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function getInstanceByName(
  InstanceName: string
): Promise<Instance | undefined> {
  const params = {
    TableName: "EC2_Data",
    IndexName: "InstanceName-index",
    KeyConditionExpression: "InstanceName = :InstanceName",
    ExpressionAttributeValues: {
      ":InstanceName": InstanceName,
    },
  };
  const Item: any = await dynamoDb.query(params).promise();

  return Item.Items as Instance;
}
