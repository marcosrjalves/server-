
# Project Documentation

## How to Run This Project

This project is designed to run inside a development container with Docker CLI pre-installed. Follow the steps below to set up and run the project:

### Prerequisites
1. Ensure you have Docker installed on your host machine.
2. Install a development environment that supports dev containers, such as Visual Studio Code with the Remote - Containers extension.

### Steps to Run the Project
1. Clone the repository:
  ```bash
  git clone git@github.com:marcosrjalves/server-.git
  cd server-
  ```

2. Open the project in Visual Studio Code.
```bash
  code .
```

3. Reopen the project in the dev container:
  - Press `F1` in Visual Studio Code.
  - Select `Remote-Containers: Reopen in Container`.

4. Once the dev container is built and running, use the Docker CLI (pre-installed in the container) to manage and run the project.

5. To start the localstack application, run the following command inside the dev container:
  ```bash
  cd resources
  docker-compose up
  ```
  - This command will start the Localstack container, containing several AWS services, including DynamoDB, S3, and Lambda
  - The Localstack container will be accessible at `http://localhost:4566`.
  - Alongside with Localstack, the container runs a DynamoDb local admin page, which can be accessed at `http://localhost:8007`.

6. Install Resources dependencies
```bash
npm i
node ./bin/createSecrets.js local
```
- This command will create the secret locally, on LocalStack

7. Install and Run the Serverless Framework application
```bash
cd .. # to go back to root dir
cd microservice/shop
npm i
npm run start
```
- These commands will access the sls application root folder, install node dependencies and run the application locally.

8. Deploy application locally
- This command is needed to create the database (DynamoDB) available locally, as all local infraestructure is running inside localstack container.
- Make sure the following AWS keys and configurations are set:
```bash
# .aws/credentials
[default]
aws_access_key_id = key
aws_secret_access_key = secret

# .aws/config
[default]
region = localhost
output = json
```
- These configuration are very important for locally deploying the application. Once they are set, just run:
```bash
npm run localDeploy
```

## The easy way
All the actions described above are also configured as vs code tasks. So, you can run them using the VS Code "Run Task" command. Below, the suggested order to run all tasks:

### 1- INSTALL LOCALSTACK REQUIRED PACKAGES
### 2- INSTALL MS SHOP
### 3- LOCALSTACK DOCKER COMPOSE UP
### 4- CREATE LOCALSTACK JWT SECRET
### 5- LOCALLY DEPLOY SLS IAC ON LOCALSTACK
### 6- RUN MS SHOP

And that's it! You'll be able to run the application locally.
If you need to recreate the DynamoDB tables, I suggest you to execute the `LOCALSTACK DOCKER COMPOSE DOWN` task. This will kill the Localstack container with everything on it. After, just run the steps from `3` till the end.
