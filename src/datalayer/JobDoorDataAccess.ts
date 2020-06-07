import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { CreateUserRequest } from '../models/CreateUserRequest'
import { ImageUrl } from '../models/ImageUrl'
import { JobPost } from '../models/JobPost'
import {User} from '../models/User'

const XAWS = AWSXRay.captureAWS(AWS)

const jobPostsTable = process.env.JOBPOSTS_TABLE
const jobDoorUsersTable = process.env.JOBDOOR_USER_TABLE
// const profilePicBucket=
// const urlExpiration =  process.env.SIGNED_URL_EXPIRATION

// const s3 = new XAWS.S3({
//   signatureVersion: 'v4'
// })
export class JobDoorItemAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient()) {
  }

  // async deleteTodo(userId:string,todoId:string):Promise<any>{
  //   console.log('deleting items with :',todoId);
  //  try{
  //   const deleteData= await this.docClient.delete({
  //     TableName: this.todosTable,
  //     Key:{
  //       'userId': userId,
  //       'todoId': todoId
  //     }
  //   }).promise();
  //   console.log('deleting......',deleteData);
  //   return deleteData;
  //  }catch(e){
  //   console.log('deleting......',e);
  //     return e;
  //  }
  // }

  // async updateTodo(userId:string ,todoId: string,todoUpdate: TodoUpdate):Promise<any>{
  //   console.log('updating items with name :',todoUpdate.name);
  //  try{
  //   const updateData= await this.docClient.update(
  //     {
  //       TableName:this.todosTable,
  //       Key:{
  //           "userId": userId,
  //           "todoId": todoId
  //       },
  //       UpdateExpression: "set done = :done",
  //       ExpressionAttributeValues:{
  //           ":done":todoUpdate.done
  //       },
  //       ReturnValues:"UPDATED_NEW"
  //   }).promise();
  //   console.log('updated data',updateData);
  //   return updateData;
  //  }catch(e){
  //   console.log('updated data',e);
  //     return e;
  //  }
  // }

  async getAllJobPostsByLocation(location:string): Promise<JobPost[]> {
    console.log('Getting all job posts for location:',location);

    const result = await this.docClient.query({
      TableName : jobPostsTable,
      KeyConditionExpression: 'locationCode = :locationCode',
      ExpressionAttributeValues: {
          ':locationCode': location
        }

  }).promise()

    const items = result.Items
    return items as JobPost[] ;
  }

  async getAllJobPostsByPosterId(posterId:string): Promise<JobPost[]> {
    console.log('Getting all job posts for posterId:',posterId);

    const result = await this.docClient.scan({
      TableName : jobPostsTable,
      FilterExpression: 'contains(posterId, :posterId)',
      ExpressionAttributeValues: {
          ':posterId': posterId
        },

  }).promise()

    const items = result.Items
    return items as JobPost[] ;
  }


  async createUser(user: User): Promise<User> {
    await this.docClient.put({
      TableName: jobDoorUsersTable,
      Item: user
    }).promise()
    return user;
  }

  async createJobPost(jobPost: JobPost): Promise<JobPost> {
    await this.docClient.put({
      TableName: jobPostsTable,
      Item: jobPost
    }).promise()
    return jobPost;
  }

//   async generateUploadUrl(userId:string,todoId:string,imageId:string): Promise<ImageUrl> {
//     try{
//       const uploadUrl=this.getUploadUrl(imageId);
//       const updateData= await this.docClient.update(
//         {
//           TableName:this.todosTable,
//           Key:{
//               "userId": userId,
//               "todoId": todoId
//           },
//           UpdateExpression: "set attachmentUrl = :attachmentUrl",
//           ExpressionAttributeValues:{
//               ":attachmentUrl":`https://${jobPostsTable}.s3.amazonaws.com/${imageId}`
//           },
//           ReturnValues:"UPDATED_NEW"
//       }).promise();
//       console.log('updated data',updateData);
//       return Promise.resolve({uploadUrl});
//      }catch(e){
//       console.log('updated data',e);
//      }
//   }

//   getUploadUrl(imageId: string) {
//     return s3.getSignedUrl('putObject', {
//       Bucket: jobPostsTable,
//       Key: imageId,
//       Expires: urlExpiration
//     })
//   }

}



function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}
