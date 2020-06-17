import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {getJobPost} from '../../businesslayer/BusinessLogic'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Caller event', event)
        const jobId = event.pathParameters.jobId;
        const result= await getJobPost(jobId);
        console.log('JobPosts:',result);
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