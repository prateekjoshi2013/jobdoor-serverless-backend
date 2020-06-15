import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import {generateUploadUrl} from '../../businesslayer/BusinessLogic'
import { getToken } from '../../utils/utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const authorization = event.headers.Authorization
  const jwtPayload=getToken(authorization)
  const imageUrl= await generateUploadUrl(jwtPayload)
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id { uploadUrl :}
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(imageUrl)
  }
}
