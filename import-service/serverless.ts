/* eslint-disable no-template-curly-in-string */
import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'import-service',
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
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:PutObject',
        Resource: 'arn:aws:s3:::arsiompeshkonodejsinaws2-product-import',
      },
    ],
  },
  functions: {
    importProductsFile: {
      handler: 'handlers/importProductsFile.handler',
      events: [
        {
          http: {
            method: 'get',
            path: '/import',
            cors: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
