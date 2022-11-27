import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function listInstances(): Promise<
  Record<string, unknown>[] | undefined
> {
  const params = {
    TableName: "EC2_Data",
  };

  const data = await dynamoDb.scan(params).promise();

  return data.Items;
}
