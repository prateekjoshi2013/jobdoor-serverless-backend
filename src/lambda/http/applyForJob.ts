import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { updateJobPostApply } from '../../businesslayer/BusinessLogic'
import { ApplyForJobRequest } from '../../models/ApplyForJobRequest'
import { getToken } from '../../utils/utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("processing event:",event);
  const applyForJobRequest: ApplyForJobRequest = JSON.parse(event.body);
  const authorization = event.headers.Authorization
  const jwtPayload=getToken(authorization);
  try{
    await updateJobPostApply(jwtPayload,applyForJobRequest);
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

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  return undefined
}
