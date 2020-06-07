import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import {getToken} from '../../utils/utils'
import { CreateJobPostRequest } from '../../models/CreateJobPostRequest'
import { createJobPost } from '../../businesslayer/BusinessLogic'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newUserDetails: CreateJobPostRequest = JSON.parse(event.body)

//Implement creating a new JobPost item
  console.log('Processing event: ', event)
  const authorization = event.headers.Authorization
  const jwtToken = getToken(authorization);
  try{
    const newUser= await createJobPost(newUserDetails,jwtToken);
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
  }catch(err){
    return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          item: err
        })
      }
  }

}
