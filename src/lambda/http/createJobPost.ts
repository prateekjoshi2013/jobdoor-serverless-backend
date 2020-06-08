import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import {getToken} from '../../utils/utils'
import { CreateJobPostRequest } from '../../models/CreateJobPostRequest'
import { createJobPost } from '../../businesslayer/BusinessLogic'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newJobPostDetails: CreateJobPostRequest = JSON.parse(event.body)

//Implement creating a new JobPost item
  console.log('Processing event: ', event)
  const authorization = event.headers.Authorization
  const jwtToken = getToken(authorization);
        const newUser= await createJobPost(newJobPostDetails,jwtToken);
        return {
            statusCode: 201,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
              item: newUser
            })
          }

  }
