
import { HttpStatuses, lambdaProcessError, lambdaResp, lambdaSettingsGetParameters } from "adapcon-utils-js";
import type { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import { docfy } from "./docfy";
import { CreateUser } from "@src/controllers/user/createUser"

export type CreateUserParams = {
  email: string;
  name: string;
  password: string;
}

export async function handler(event: APIGatewayEvent, context: Context): Promise<ProxyResult> {
  try {
    const parameters = lambdaSettingsGetParameters<CreateUserParams>(docfy, event);

    const { email, name, password } = parameters;
    const user = await CreateUser({ email, name, password });

    return lambdaResp(HttpStatuses.success, user);
  } catch (err: any) {
    return lambdaProcessError({ context, err });
  }
}
