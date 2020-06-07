import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {getToken} from '../../utils/utils';
import {getAllJobPostsByLocation,getAllJobPostsByPosterId} from '../../businesslayer/BusinessLogic'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Caller event', event)
    const location = event.queryStringParameters.locationId;
    if(location){
        const result = await getAllJobPostsByLocation(location);
        getResponse(result);
    }else{
        const header = getToken(event.headers.Authorization);
        const result = await getAllJobPostsByPosterId(header);
        getResponse(result);
    }
}


  const getResponse=(result): APIGatewayProxyResult=> {
        if (result.length !== 0) {
            return {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify(result)
            }
          }else{
            return {
                statusCode: 404,
                headers: {
                  'Access-Control-Allow-Origin': '*'
                },
                body: ''
              }
          }
    }