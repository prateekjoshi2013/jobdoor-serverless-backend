import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {getToken} from '../../utils/utils';
import {getUser} from '../../businesslayer/BusinessLogic'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Caller event', event)
        const header = getToken(event.headers.Authorization);
        const result= await getUser(header);
        return getResponse(result);
}


  const getResponse=(result)=> {
        if (result) {
            return {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify(result)
            }
          }else{
            return {
                statusCode: 200,
                headers: {
                  'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({})
              }
          }
    }