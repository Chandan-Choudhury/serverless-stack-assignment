import AWS from "aws-sdk";
import { Queue } from "@serverless-stack/node/queue";

const sqs = new AWS.SQS();

export async function handler() {
  await sqs
    .sendMessage({
      QueueUrl: Queue.Queue.queueUrl,
      MessageBody: JSON.stringify({ invoked: true }),
    })
    .promise();

  console.log("Message queued!");

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "successful" }),
  };
}
