import { error, HttpStatuses, lambdaRespError, lambdaSettingsGetParameters } from "adapcon-utils-js";
import type { APIGatewayEvent, ProxyResult, Context } from "aws-lambda";
import { docfy } from "./docfy";
import jwt from 'jsonwebtoken';
import { JWTSecret } from "@src/utils/secrets";

type TMiddlewareParameters = {
  authorization: string;
}

export async function middleware(event: APIGatewayEvent, context: Context): Promise<ProxyResult> {
  try {
    if(!this.handler) throw error(HttpStatuses.teaPot, 'Auth function must be called bounded to a handler');
    const jwtSecret = await JWTSecret();

    const { authorization } = lambdaSettingsGetParameters<TMiddlewareParameters>(docfy, event);

    console.log('trying to validate', authorization)
    const parts = authorization.split(' ');
    const token = parts[1];
    const session = jwt.verify(token, jwtSecret);
    console.log('validateSessionv', session)

    // console.log('teste', teste);
    return this.handler(session, event, context);
  } catch (err: any) {
    const { message, error } = err;
    return lambdaRespError({
      statusCode: HttpStatuses.unauthorized,
      message: error || message
    })
  }

}
