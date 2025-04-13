
import { HttpStatuses, lambdaProcessError, lambdaResp, lambdaSettingsGetParameters } from "adapcon-utils-js";
import type { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import { docfy } from "./docfy";
import { createProduct } from "@src/controllers/product/createProduct";
import { middleware } from "@src/middleware/auth";
import { TSession } from "@src/models/Session";

export type CreateProductParams = {
  name: string;
  description: string;
  price: number;
}

async function handler(session: TSession, event: APIGatewayEvent, context: Context): Promise<ProxyResult> {
  try {
    console.log('session', session)
    const parameters = lambdaSettingsGetParameters<CreateProductParams>(docfy, event);

    const { email } = session;

    const product = await createProduct({
      ...parameters,
      email
    });

    return lambdaResp(HttpStatuses.success, product);
  } catch (err: any) {
    return lambdaProcessError({ context, err });
  }
}

module.exports = {
  handler: middleware.bind({handler}),
}
