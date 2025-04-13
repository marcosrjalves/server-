
import { HttpStatuses, lambdaProcessError, lambdaResp, lambdaSettingsGetParameters } from "adapcon-utils-js";
import type { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import { docfy } from "./docfy";
import { deleteProduct } from "@src/controllers/product/deleteProduct";
import { middleware } from "@src/middleware/auth";

export type DeleteProductParams = {
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
    const parameters = lambdaSettingsGetParameters<DeleteProductParams>(docfy, event);

    const product = await deleteProduct({
      ...parameters
    });

    return lambdaResp(HttpStatuses.success, product);
  } catch (err: any) {
    return lambdaProcessError({ context, err });
  }
}

module.exports = {
  handler: middleware.bind({handler}),
}
