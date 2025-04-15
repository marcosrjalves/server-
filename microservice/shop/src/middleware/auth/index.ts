import { error, HttpStatuses, lambdaRespError, lambdaSettingsGetParameters } from "adapcon-utils-js";
import type { APIGatewayEvent, ProxyResult, Context } from "aws-lambda";
import { docfy } from "./docfy";
import jwt from 'jsonwebtoken';

type TMiddlewareParameters = {
  authorization: string;
}

export async function middleware(event: APIGatewayEvent, context: Context): Promise<ProxyResult> {
  try {
    if(!this.handler) throw error(HttpStatuses.teaPot, 'Auth function must be called bounded to a handler');
    const secret = process.env.JWT_SECRET;

    const { authorization } = lambdaSettingsGetParameters<TMiddlewareParameters>(docfy, event);

    const parts = authorization.split(' ');
    const token = parts[1];
    const session = jwt.verify(token, secret);

    return this.handler({session, event, context});
  } catch (err: any) {
    const { message, error } = err;
    return lambdaRespError({
      statusCode: HttpStatuses.unauthorized,
      message: error || message
    })
  }

}
