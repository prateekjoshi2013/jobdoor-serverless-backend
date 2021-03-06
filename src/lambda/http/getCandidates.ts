import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {getCandidates} from '../../businesslayer/BusinessLogic'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Caller event', event)
    const postId = event.queryStringParameters.postId;
        const result= await getCandidates(postId);
        console.log('candidates:',result);
        return getResponse(result);
}

const getResponse=(result)=> {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(result)
        }
}