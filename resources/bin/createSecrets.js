import { SecretsManagerClient, CreateSecretCommand, UpdateSecretCommand, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import 'dotenv/config';

const [stage] = process.argv.slice(2);

if (!stage) {
  console.error('Please provide a stage argument (e.g., hml, prd or local)');
  process.exit(1);
}

const config = {}
switch (stage) {
  case 'hml':
  case 'prd':
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
    config.region = 'us-east-1';
    break;

  case 'local':
    config.credentials = {
      accessKeyId: 'key',
      secretAccessKey: 'secret',
    }
    config.region = 'localhost';
    config.endpoint = 'http://localhost:4566';
    break;

  default:
    console.error('Invalid stage argument. Use hml, prd or local.');
    process.exit(1);
}

const client = new SecretsManagerClient(config);

const secretName = `${stage}/jwt/secret`;
const input = {
  Name: secretName,
  SecretString: (stage === 'prd' || stage === 'hml') ? process.env.JWT_SECRET : 'f2bh4uyb32ubsb23bdcunnc9435#35ds&sfj',
  Description: 'JWT secret for local development',
}

let shouldCreate = false;
try {
  const searchCommand = new GetSecretValueCommand({ SecretId: secretName });
  const searchResponse = await client.send(searchCommand);
  shouldCreate = !!searchResponse.SecretString;
} catch (error) {
  console.log('Error fetching secret:', error);
}


if (shouldCreate) {
  const updateCommand = new UpdateSecretCommand({
    SecretId: secretName,
  });
  const response = await client.send(updateCommand);
  console.log(response);
} else {
  const command = new CreateSecretCommand(input);
  const response = await client.send(command);
  console.log(response);
}

