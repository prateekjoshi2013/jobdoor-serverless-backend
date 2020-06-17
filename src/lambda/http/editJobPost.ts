import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { editJobPost } from '../../businesslayer/BusinessLogic'
import { UpdateJobPostRequest } from '../../models/UpdateJobPostRequest'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("processing event:",event);
  const updateJobPostRequest: UpdateJobPostRequest = JSON.parse(event.body);
  try{
    await editJobPost(updateJobPostRequest);
    return {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
        })
      }
  }catch(e){
    return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
        })
      }
  }
}
