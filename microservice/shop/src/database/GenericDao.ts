import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandOutput,
  GetCommand,
  GetCommandOutput,
  DeleteCommand,
  DeleteCommandOutput,
  QueryCommand,
  QueryCommandOutput,
  UpdateCommand,
  UpdateCommandOutput,
} from "@aws-sdk/lib-dynamodb";


function generateUpdateExpression(updateValues) {
  return Object.keys(updateValues).map((key) => `#${key} = :${key}`).join(", ");
}

function generateExpressionAttributeNames(updateValues) {
  return Object.keys(updateValues).reduce((acc, key) => {
    acc[`#${key}`] = key;
    return acc;
  }, {});
}

function generateExpressionAttributeValues(updateValues) {
  return Object.keys(updateValues).reduce((acc, key) => {
    acc[`:${key}`] = updateValues[key];
    return acc;
  }, {});
}

function generateKeyConditionExpression(keys) {
  return Object.keys(keys).map((key) => `#${key} = :${key}`).join(" AND ");
}

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
  const config = {
    TableName: table,
    Item: item,
  }
  const command = new PutCommand(config)
  const response = dbDocClient.send(command)
  return response
}

export async function genericDaoUpdate(
  table: string,
  keys: object,
  updateValues: object
): Promise<UpdateCommandOutput> {
  if (!keys || Object.keys(keys).length === 0) {
    throw new Error("Keys must be provided and cannot be empty.");
  }

  const updateExpression = generateUpdateExpression(updateValues);
  const expressionAttributeNames = {
    ...generateExpressionAttributeNames(updateValues),
    ...generateExpressionAttributeNames(keys)
  };
  const expressionAttributeValues = {
    ...generateExpressionAttributeValues(updateValues),
    ...generateExpressionAttributeValues(keys)
  }
  const keyConditionExpression = generateKeyConditionExpression(keys);

  const config = {
    TableName: table,
    Key: keys,
    UpdateExpression: `SET ${updateExpression}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ConditionExpression: keyConditionExpression,
    ReturnValues: "ALL_NEW" as const,
  }

  const command = new UpdateCommand(config);
  const response = await dbDocClient.send(command);

  return response;
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

