
import { HttpStatuses, lambdaProcessError, lambdaResp, lambdaSettingsGetParameters } from "adapcon-utils-js";
import type { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import { docfy } from "./docfy";
import { Login } from "@src/controllers/session/login"

export interface TLoginUserParams {
  email: string;
  password: string;
}

export async function handler(event: APIGatewayEvent, context: Context): Promise<ProxyResult> {
  try {
    const parameters = lambdaSettingsGetParameters<TLoginUserParams>(docfy, event);

    const { email, password } = parameters;
    const user = await Login({ email, password });

    return lambdaResp(HttpStatuses.success, user);
  } catch (err: any) {
    return lambdaProcessError({ context, err });
  }
}
