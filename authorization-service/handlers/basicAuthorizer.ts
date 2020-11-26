import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayTokenAuthorizerHandler,
  APIGatewayAuthorizerResult,
} from 'aws-lambda';
import { authService } from 'lib/services/auth';

import 'source-map-support/register';

export async function basicAuthorizer(event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> {
  console.info('Executing lambda', event);

  try {
    const { authorizationToken, methodArn } = event;

    console.info('Verifying token', authorizationToken);

    const { valid, login } = await authService.verifyToken(authorizationToken);

    if (!valid) {
      return authService.generatePolicy(login, 'Deny', methodArn);
    }

    return authService.generatePolicy(login, 'Allow', methodArn);
  } catch (e) {
    console.error(e);

    return authService.generatePolicy(event.authorizationToken, 'Deny', event.methodArn);
  }
}

export const handler: APIGatewayTokenAuthorizerHandler = async (
  event: APIGatewayTokenAuthorizerEvent,
): Promise<APIGatewayAuthorizerResult> => {
  return basicAuthorizer(event);
};
