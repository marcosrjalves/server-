
import { HttpStatuses, lambdaProcessError, lambdaResp, lambdaSettingsGetParameters } from "adapcon-utils-js";
import type { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import { docfy } from "./docfy";
import { queryProducts } from "@src/controllers/product/queryProducts";
import { middleware } from "@src/middleware/auth";

export type QueryProductParams = {
  name?: string;
  description?: string;
  price?: number;
}

async function handler({
  event,
  context
}: {
  event: APIGatewayEvent;
  context: Context;
}): Promise<ProxyResult> {
  try {
    const parameters = lambdaSettingsGetParameters<QueryProductParams>(docfy, event);

    const product = await queryProducts({
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
