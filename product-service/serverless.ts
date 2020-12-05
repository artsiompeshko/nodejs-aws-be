/* eslint-disable no-template-curly-in-string */
import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    profile: 'nodejs-in-aws-3',
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    getProductsList: {
      handler: 'handlers/getProductsList.handler',
      events: [
        {
          http: {
            method: 'get',
            path: '/products',
            cors: true,
          },
        },
      ],
    },
    getProductById: {
      handler: 'handlers/getProductById.handler',
      events: [
        {
          http: {
            method: 'get',
            path: '/products/{id}',
            cors: true,
          },
        },
      ],
    },
    createProduct: {
      handler: 'handlers/createProduct.handler',
      events: [
        {
          http: {
            method: 'post',
            path: '/products',
            cors: true,
            request: {
              schema: {
                'application/json': '${file(request-schema/create-product.json)}',
              },
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
