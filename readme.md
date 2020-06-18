<p class="has-line-data" data-line-start="0" data-line-end="1">…SERVERLESS-DEPLOYMENT-LOG…



prateek@prateek-ubuntu:~/Dev/jobdoor$ sls deploy -v
Serverless: Using configuration:
{
  “webpackConfig”: “./webpack.config.js”,
  “includeModules”: true,
  “packager”: “npm”,
  “packagerOptions”: {},
  “keepOutputDirectory”: false
}
Serverless: Removing /home/prateek/Dev/jobdoor/.webpack
Serverless: Bundling with Webpack…
Time: 1971ms
Built at: 06/17/2020 10:06:36 PM
                                   Asset      Size  Chunks                   Chunk Names
      src/lambda/auth/auth0Authorizer.js  2.15 KiB       0  [emitted]        src/lambda/auth/auth0Authorizer
  src/lambda/auth/auth0Authorizer.js.map  8.16 KiB       0  [emitted] [dev]  src/lambda/auth/auth0Authorizer
          src/lambda/http/applyForJob.js  7.87 KiB       1  [emitted]        src/lambda/http/applyForJob
      src/lambda/http/applyForJob.js.map  25.3 KiB       1  [emitted] [dev]  src/lambda/http/applyForJob
        src/lambda/http/createJobPost.js  7.75 KiB       2  [emitted]        src/lambda/http/createJobPost
    src/lambda/http/createJobPost.js.map  25.2 KiB       2  [emitted] [dev]  src/lambda/http/createJobPost
           src/lambda/http/createUser.js  7.89 KiB       3  [emitted]        src/lambda/http/createUser
       src/lambda/http/createUser.js.map  25.4 KiB       3  [emitted] [dev]  src/lambda/http/createUser
        src/lambda/http/deleteJobPost.js  7.68 KiB       4  [emitted]        src/lambda/http/deleteJobPost
    src/lambda/http/deleteJobPost.js.map  24.8 KiB       4  [emitted] [dev]  src/lambda/http/deleteJobPost
          src/lambda/http/editJobPost.js  7.82 KiB       5  [emitted]        src/lambda/http/editJobPost
      src/lambda/http/editJobPost.js.map  25.1 KiB       5  [emitted] [dev]  src/lambda/http/editJobPost
        src/lambda/http/getCandidates.js  7.69 KiB       6  [emitted]        src/lambda/http/getCandidates
    src/lambda/http/getCandidates.js.map  24.8 KiB       6  [emitted] [dev]  src/lambda/http/getCandidates
           src/lambda/http/getJobPost.js  7.68 KiB       7  [emitted]        src/lambda/http/getJobPost
       src/lambda/http/getJobPost.js.map  24.8 KiB       7  [emitted] [dev]  src/lambda/http/getJobPost
          src/lambda/http/getJobPosts.js  7.84 KiB       8  [emitted]        src/lambda/http/getJobPosts
      src/lambda/http/getJobPosts.js.map  25.5 KiB       8  [emitted] [dev]  src/lambda/http/getJobPosts
    src/lambda/http/getUploadImageUrl.js  7.68 KiB       9  [emitted]        src/lambda/http/getUploadImageUrl
src/lambda/http/getUploadImageUrl.js.map  24.7 KiB       9  [emitted] [dev]  src/lambda/http/getUploadImageUrl
              src/lambda/http/getUser.js  7.75 KiB      10  [emitted]        src/lambda/http/getUser
          src/lambda/http/getUser.js.map  25.1 KiB      10  [emitted] [dev]  src/lambda/http/getUser
Entrypoint src/lambda/auth/auth0Authorizer = src/lambda/auth/auth0Authorizer.js src/lambda/auth/auth0Authorizer.js.map
Entrypoint src/lambda/http/getJobPosts = src/lambda/http/getJobPosts.js src/lambda/http/getJobPosts.js.map
Entrypoint src/lambda/http/createUser = src/lambda/http/createUser.js src/lambda/http/createUser.js.map
Entrypoint src/lambda/http/getUser = src/lambda/http/getUser.js src/lambda/http/getUser.js.map
Entrypoint src/lambda/http/createJobPost = src/lambda/http/createJobPost.js src/lambda/http/createJobPost.js.map
Entrypoint src/lambda/http/getJobPost = src/lambda/http/getJobPost.js src/lambda/http/getJobPost.js.map
Entrypoint src/lambda/http/deleteJobPost = src/lambda/http/deleteJobPost.js src/lambda/http/deleteJobPost.js.map
Entrypoint src/lambda/http/getCandidates = src/lambda/http/getCandidates.js src/lambda/http/getCandidates.js.map
Entrypoint src/lambda/http/getUploadImageUrl = src/lambda/http/getUploadImageUrl.js src/lambda/http/getUploadImageUrl.js.map
Entrypoint src/lambda/http/applyForJob = src/lambda/http/applyForJob.js src/lambda/http/applyForJob.js.map
Entrypoint src/lambda/http/editJobPost = src/lambda/http/editJobPost.js src/lambda/http/editJobPost.js.map
 [0] ./src/utils/utils.ts 314 bytes {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} [built]
 [2] external “jsonwebtoken” 42 bytes {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} [built]
 [3] ./src/businesslayer/BusinessLogic.ts + 1 modules 11 KiB {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} [built]
     | ./src/businesslayer/BusinessLogic.ts 2.68 KiB [built]
     | ./src/datalayer/JobDoorDataAccess.ts 8.34 KiB [built]
 [6] external “source-map-support/register” 42 bytes {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} [built]
 [9] ./src/lambda/auth/auth0Authorizer.ts 1.83 KiB {0} [built]
[10] ./src/lambda/http/getJobPosts.ts 1.06 KiB {8} [built]
[11] ./src/lambda/http/createUser.ts 1.04 KiB {3} [built]
[12] ./src/lambda/http/getUser.ts 810 bytes {10} [built]
[13] ./src/lambda/http/createJobPost.ts 711 bytes {2} [built]
[14] ./src/lambda/http/getJobPost.ts 543 bytes {7} [built]
[15] ./src/lambda/http/deleteJobPost.ts 549 bytes {4} [built]
[16] ./src/lambda/http/getCandidates.ts 561 bytes {6} [built]
[17] ./src/lambda/http/getUploadImageUrl.ts 576 bytes {9} [built]
[18] ./src/lambda/http/applyForJob.ts 990 bytes {1} [built]
[19] ./src/lambda/http/editJobPost.ts 819 bytes {5} [built]
    + 5 hidden modules
Serverless: Fetch dependency graph from /home/prateek/Dev/jobdoor/package.json
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: Package lock found - Using locked versions
Serverless: Packing external modules: jsonwebtoken@^8.5.1, source-map-support@^0.5.10, middy@^0.36.0, uuid@^8.1.0, aws-xray-sdk@^3.0.1
Serverless: Package took [5956 ms]
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: INFO: Runtime dependency ‘aws-sdk’ found in devDependencies. It has been excluded automatically.
Serverless: Copy modules: /home/prateek/Dev/jobdoor/.webpack/service [454 ms]
Serverless: Prune: /home/prateek/Dev/jobdoor/.webpack/service [2120 ms]
Serverless: Run scripts: /home/prateek/Dev/jobdoor/.webpack/service [1 ms]
Serverless: Zip service: /home/prateek/Dev/jobdoor/.webpack/service [2359 ms]
Serverless: Packaging service…
Serverless: Remove /home/prateek/Dev/jobdoor/.webpack
Serverless: Tracing DISABLED for function “jobdoor-dev-Auth”
Serverless: Tracing DISABLED for function “jobdoor-dev-GetJobPosts”
Serverless: Tracing DISABLED for function “jobdoor-dev-CreateUser”
Serverless: Tracing DISABLED for function “jobdoor-dev-GetUser”
Serverless: Tracing DISABLED for function “jobdoor-dev-CreateJobPost”
Serverless: Tracing DISABLED for function “jobdoor-dev-GetJobPost”
Serverless: Tracing DISABLED for function “jobdoor-dev-DeleteJobPost”
Serverless: Tracing DISABLED for function “jobdoor-dev-GetCandidates”
Serverless: Tracing DISABLED for function “jobdoor-dev-GetImageUploadUrl”
Serverless: Tracing DISABLED for function “jobdoor-dev-ApplyForJob”
Serverless: Tracing DISABLED for function “jobdoor-dev-EditJobPost”
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading artifacts…
Serverless: Uploading service jobdoor.zip file to S3 (2.05 MB)…
Serverless: Validating template…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - jobdoor-dev
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - CreateUserLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - ApplyForJobLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RequestValidator - ApiGatewayMethodUserPostValidator
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Model - ApiGatewayMethodUserPostApplicationJsonModel
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RequestValidator - ApiGatewayMethodJobpostEditPutValidator
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RequestValidator - ApiGatewayMethodJobpostPutValidator
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - CreateJobPostLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - AuthLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RequestValidator - ApiGatewayMethodUserPostValidator
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RequestValidator - ApiGatewayMethodJobpostEditPutValidator
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RequestValidator - ApiGatewayMethodJobpostPutValidator
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Model - ApiGatewayMethodUserPostApplicationJsonModel
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - CreateUserLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::RequestValidator - ApiGatewayMethodUserPostValidator
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - DeleteJobPostLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::RequestValidator - ApiGatewayMethodJobpostPutValidator
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::RequestValidator - ApiGatewayMethodJobpostEditPutValidator
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Model - ApiGatewayMethodUserPostApplicationJsonModel
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - ApplyForJobLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Model - ApiGatewayMethodJobpostPutApplicationJsonModel
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RequestValidator - ApiGatewayMethodJobpostPostValidator
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - AuthLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - CreateJobPostLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - GetUserLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Model - ApiGatewayMethodJobpostPutApplicationJsonModel
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RequestValidator - ApiGatewayMethodJobpostPostValidator
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - GetJobPostsLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - DeleteJobPostLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - GetJobPostLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Model - ApiGatewayMethodJobpostEditPutApplicationJsonModel
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - EditJobPostLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::RequestValidator - ApiGatewayMethodJobpostPostValidator
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Model - ApiGatewayMethodJobpostPutApplicationJsonModel
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - GetCandidatesLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - GetUserLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Model - ApiGatewayMethodJobpostEditPutApplicationJsonModel
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - GetJobPostLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Model - ApiGatewayMethodJobpostEditPutApplicationJsonModel
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - GetJobPostsLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - EditJobPostLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - GetCandidatesLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Model - ApiGatewayMethodJobpostPostApplicationJsonModel
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - GetImageUploadUrlLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Model - ApiGatewayMethodJobpostPostApplicationJsonModel
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Model - ApiGatewayMethodJobpostPostApplicationJsonModel
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - GetImageUploadUrlLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodUserPost
CloudFormation - UPDATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodJobpostEditPut
CloudFormation - UPDATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodJobpostPut
CloudFormation - UPDATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodUserPost
CloudFormation - UPDATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodJobpostEditPut
CloudFormation - UPDATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodJobpostPut
CloudFormation - UPDATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodJobpostPost
CloudFormation - UPDATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodJobpostPost
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1592445993018
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1592445993018
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1592445993018
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - jobdoor-dev
CloudFormation - DELETE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1592439278816
CloudFormation - DELETE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1592439278816
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - jobdoor-dev
Serverless: Stack update finished…
Service Information
service: jobdoor
stage: dev
region: us-east-1
stack: jobdoor-dev
resources: 101
api keys:
  None
endpoints:
  GET - <a href="https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobposts">https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobposts</a>
  POST - <a href="https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/user">https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/user</a>
  GET - <a href="https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/user">https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/user</a>
  POST - <a href="https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobpost">https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobpost</a>
  GET - <a href="https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobpost/%7BjobId%7D">https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobpost/{jobId}</a>
  DELETE - <a href="https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobpost/%7BjobId%7D">https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobpost/{jobId}</a>
  GET - <a href="https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/candidates">https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/candidates</a>
  GET - <a href="https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/imageurl">https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/imageurl</a>
  PUT - <a href="https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobpost">https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobpost</a>
  PUT - <a href="https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobpost/edit">https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev/jobpost/edit</a>
functions:
  Auth: jobdoor-dev-Auth
  GetJobPosts: jobdoor-dev-GetJobPosts
  CreateUser: jobdoor-dev-CreateUser
  GetUser: jobdoor-dev-GetUser
  CreateJobPost: jobdoor-dev-CreateJobPost
  GetJobPost: jobdoor-dev-GetJobPost
  DeleteJobPost: jobdoor-dev-DeleteJobPost
  GetCandidates: jobdoor-dev-GetCandidates
  GetImageUploadUrl: jobdoor-dev-GetImageUploadUrl
  ApplyForJob: jobdoor-dev-ApplyForJob
  EditJobPost: jobdoor-dev-EditJobPost
layers:
  None

Stack Outputs
AuthLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:654050453449:function:jobdoor-dev-Auth:77
GetImageUploadUrlLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:654050453449:function:jobdoor-dev-GetImageUploadUrl:31
GetJobPostsLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:654050453449:function:jobdoor-dev-GetJobPosts:74
GetCandidatesLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:654050453449:function:jobdoor-dev-GetCandidates:36
ApplyForJobLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:654050453449:function:jobdoor-dev-ApplyForJob:47
GetUserLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:654050453449:function:jobdoor-dev-GetUser:20
DeleteJobPostLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:654050453449:function:jobdoor-dev-DeleteJobPost:8
ServerlessDeploymentBucketName: jobdoor-dev-serverlessdeploymentbucket-1xkd2xp8f4jey
EditJobPostLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:654050453449:function:jobdoor-dev-EditJobPost:6
CreateUserLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:654050453449:function:jobdoor-dev-CreateUser:56
CreateJobPostLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:654050453449:function:jobdoor-dev-CreateJobPost:56
ServiceEndpoint: <a href="https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev">https://mj3vigvo30.execute-api.us-east-1.amazonaws.com/dev</a>
GetJobPostLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:654050453449:function:jobdoor-dev-GetJobPost:16

Serverless: Removing old service artifacts from S3…
Serverless: Run the “serverless” command to setup monitoring, troubleshooting and testing.
prateek@prateek-ubuntu:~/Dev/jobdoor$</p>
