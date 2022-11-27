import { DynamoDB } from "aws-sdk";
import Instance from "./Instance";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function getInstanceByState(
  InstanceState: string
): Promise<Instance | undefined> {
  const params = {
    TableName: "EC2_Data",
    IndexName: "InstanceState-index",
    KeyConditionExpression: "InstanceState = :InstanceState",
    ExpressionAttributeValues: {
      ":InstanceState": InstanceState,
    },
  };

  const Item: any = await dynamoDb.query(params).promise();

  return Item.Items as Instance;
}
