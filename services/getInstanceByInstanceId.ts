import { DynamoDB } from "aws-sdk";
import Instance from "./Instance";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function getInstanceByInstanceId(
  InstanceId: string
): Promise<Instance | undefined> {
  const params = {
    Key: { InstanceId: InstanceId },
    TableName: "EC2_Data",
  };
  // console.log("key", params.Key);
  const { Item } = await dynamoDb.get(params).promise();

  return Item as Instance;
}
