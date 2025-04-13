import { SecretsManagerClient, CreateSecretCommand } from "@aws-sdk/client-secrets-manager";

const config = {
  credentials: {
    accessKeyId: 'key',
    secretAccessKey: 'secret',
  },
  region: 'localhost',
  endpoint: 'http://localhost:4566'
}

const client = new SecretsManagerClient(config);

const input = {
  Name: 'jwt/secret',
  SecretString: 'f2bh4uyb32ubsb23bdcunnc9435#35ds&sfj',
  Description: 'JWT secret for local development',
}

const command = new CreateSecretCommand(input);
const response = await client.send(command);
console.log(response);
