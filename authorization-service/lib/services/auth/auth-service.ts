import { APIGatewayAuthorizerResult } from 'aws-lambda';

import { tokenService } from 'lib/services/token';

export function verifyToken(token: string): { login: string; password: string; valid: boolean } {
  const { login, password } = tokenService.parseBasic(token);
  const realPassword = process.env[login];

  console.log(login);
  console.log(password);

  return {
    login,
    password,
    valid: password && realPassword === password,
  };
}

// Help function to generate an IAM policy
export function generatePolicy(principalId: string, effect: string, resource: string): APIGatewayAuthorizerResult {
  const result: APIGatewayAuthorizerResult = {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };

  return result;
}
