import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {getToken} from '../../utils/utils';
import {getAllJobPostsByLocation,getAllJobPostsByPosterId,getAllJobPostsByCandidateId} from '../../businesslayer/BusinessLogic'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Caller event', event)
    const location = event.queryStringParameters.locationId;
    const userType = event.queryStringParameters.userType;

    if(location){
        const result = await getAllJobPostsByLocation(location);
        return getResponse(result);
    }else{
        const header = getToken(event.headers.Authorization);
        let result=null;
        if(userType==='company'){
            result= await getAllJobPostsByPosterId(header);
        }else{
            result= await getAllJobPostsByCandidateId(header);
        }
        return getResponse(result);
    }
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