
import { HttpStatuses, lambdaProcessError, lambdaResp, lambdaSettingsGetParameters } from "adapcon-utils-js";
import type { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import { docfy } from "./docfy";
import { updateProduct } from "@src/controllers/product/updateProduct";
import { middleware } from "@src/middleware/auth";
import { TSession } from "@src/models/Session";

export type UpdateProductParams = {
  productId: string;
  name?: string;
  description?: string;
  price?: number;
}

async function handler({
  session,
  event,
  context
}: {
  session: TSession;
  event: APIGatewayEvent;
  context: Context;
}): Promise<ProxyResult> {
  try {
    const parameters = lambdaSettingsGetParameters<UpdateProductParams>(docfy, event);

    const { email } = session;

    const product = await updateProduct({
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
