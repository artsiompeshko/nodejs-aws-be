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
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
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
      SQS_URL: {
        Ref: 'catalogItemsQueue',
      },
      SNS_ARN_URL: {
        Ref: 'createProductTopic',
      },
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'S3:ListBucket',
        Resource: 'arn:aws:s3:::arsiompeshkonodejsinaws2-product-import',
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: 'arn:aws:s3:::arsiompeshkonodejsinaws2-product-import/*',
      },
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: {
          'Fn::GetAtt': ['catalogItemsQueue', 'Arn'],
        },
      },
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: {
          Ref: 'createProductTopic',
        },
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
            authorizer: {
              name: 'basicAuthorizer',
              arn: 'arn:aws:lambda:eu-west-1:610505153162:function:authorization-service-dev-basicAuthorizer',
              type: 'token',
              resultTtlInSeconds: 0,
            },
          },
        },
      ],
    },
    importFileParser: {
      handler: 'handlers/importFileParser.handler',
      events: [
        {
          s3: {
            bucket: 'arsiompeshkonodejsinaws2-product-import',
            event: 's3:ObjectCreated:*',
            rules: [
              {
                prefix: 'uploaded',
                suffix: '',
              },
            ],
            existing: true,
          },
        },
      ],
    },
    catalogBatchProcess: {
      handler: 'handlers/catalogBatchProcess.handler',
      events: [
        {
          sqs: {
            arn: {
              'Fn::GetAtt': ['catalogItemsQueue', 'Arn'],
            },
            batchSize: 5,
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue',
        },
      },
      createProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic',
        },
      },
      createTopicSubscriptuion: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'peshkoartembsu@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'createProductTopic',
          },
        },
      },
      createTopicSubscriptuionLyon: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'artsiom_peshko@epam.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'createProductTopic',
          },
          FilterPolicy: {
            title: ['Lyon'],
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
