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
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    profile: 'nodejs-in-aws-2',
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
            cors: false,
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
            cors: false,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
