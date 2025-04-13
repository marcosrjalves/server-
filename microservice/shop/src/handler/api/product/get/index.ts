
import { HttpStatuses, lambdaProcessError, lambdaResp, lambdaSettingsGetParameters } from "adapcon-utils-js";
import type { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import { docfy } from "./docfy";
import { getProduct } from "@src/controllers/product/getProduct";
import { middleware } from "@src/middleware/auth";

export type UpdateGetParams = {
  productId: string;
}

async function handler({
  event,
  context
}: {
  event: APIGatewayEvent;
  context: Context;
}): Promise<ProxyResult> {
  try {
    const parameters = lambdaSettingsGetParameters<UpdateGetParams>(docfy, event);

    const product = await getProduct({
      ...parameters,
    });

    return lambdaResp(HttpStatuses.success, product);
  } catch (err: any) {
    return lambdaProcessError({ context, err });
  }
}

module.exports = {
  handler: middleware.bind({handler}),
}
