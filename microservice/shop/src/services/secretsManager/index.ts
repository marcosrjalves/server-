import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const config = {
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
}

const client = new SecretsManagerClient(config);

export async function getSecretValue(secretName: string): Promise<string> {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);

  if (response.SecretString) {
    return response.SecretString;
  } else {
    throw new Error('Secret not found');
  }
}
