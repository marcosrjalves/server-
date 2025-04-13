import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  DeleteCommand,
  QueryCommand,
  GetCommandOutput,
  QueryCommandOutput,
  PutCommandOutput,
  DeleteCommandOutput
} from "@aws-sdk/lib-dynamodb";

// export type TDBGet = {
//   Item?: Record<string, any>;
//   '$metadata': {
//     httpStatusCode: number;
//     requestId: string;
//     extendedRequestId: string;
//     cfId: string;
//     attempts: number;
//     totalRetryDelay: number;
//   };
// }

const db = new DynamoDBClient({
  ...(process.env.IS_OFFLINE ?
    {
      credentials: {
        accessKeyId: 'key',
        secretAccessKey: 'secret',
      },
      region: 'localhost',
      endpoint: 'http://localhost:4566'
    } : {
      region: 'us-east-1'
    }),
})

const dbDocClient = DynamoDBDocumentClient.from(db)

export async function genericDaoPut(table: string, item: object): Promise<PutCommandOutput> {
  const command = new PutCommand({
    TableName: table,
    Item: item,
  })
  return dbDocClient.send(command)
}

export async function genericDaoGet(table: string, key: object): Promise<GetCommandOutput> {
  const command = new GetCommand({
    TableName: table,
    Key: key,
  })
  const response = await dbDocClient.send(command)
  return response
}

export async function genericDaoDelete(table: string, key: object): Promise<DeleteCommandOutput> {
  const command = new DeleteCommand({
    TableName: table,
    Key: key,
  })
  return dbDocClient.send(command)
}

export async function genericDaoQuery({
  table,
  index,
  keyConditionExpression,
  expressionAttributeValues
}: {
  table: string;
  index?: string;
  keyConditionExpression: string;
  expressionAttributeValues: Record<string, any>;
}): Promise<QueryCommandOutput> {
  const command = new QueryCommand({
    TableName: table,
    IndexName: index,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  })
  return dbDocClient.send(command)
}
