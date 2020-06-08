import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { CreateUserRequest } from '../models/CreateUserRequest'
import { ImageUrl } from '../models/ImageUrl'
import { JobPost } from '../models/JobPost'
import {User} from '../models/User'
import { ApplyForJobRequest } from '../models/ApplyForJobRequest'

// const XAWS = AWSXRay.captureAWS(AWS)

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

  async updateJobPost(candidateId: string,applyForJobRequest:ApplyForJobRequest):Promise<any>{
    const {jobId,locationCode}=applyForJobRequest
    console.log('updating items with jobId ',jobId,'for candidateId',candidateId);
   try{
    const updateData= await this.docClient.update(
      {

        TableName: jobPostsTable,
        Key: { jobId ,locationCode},
        UpdateExpression: "SET #attrName = list_append(#attrName, :candidateId)",
        ExpressionAttributeNames: { "#attrName" : "candidateIds" },
        ExpressionAttributeValues: { ":candidateId": [candidateId] },
        ReturnValues:"UPDATED_NEW"
    }).promise();
    console.log('updated data',updateData);
    return updateData;
   }catch(e){
    console.log('updated data',e);
      return e;
   }
  }

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
    console.log(result);
    const items = result.Items
    return items as JobPost[] ;
  }

  async getAllJobPostsByCandidateId(candidateId:string): Promise<JobPost[]> {
    console.log('Getting all job posts for candidateId:',candidateId);

    const result = await this.docClient.scan({
      TableName : jobPostsTable,
      FilterExpression: 'contains(candidateIds, :candidateId)',
      ExpressionAttributeValues: {
          ':candidateId': candidateId
        },

  }).promise()

  console.log(result);
    const items = result.Items
    return items as JobPost[] ;
  }


  async getCandidates(jobId:string): Promise<User[]> {
    console.log('Getting  job post for jobId:',jobId);

    const jobPosts = await this.docClient.scan({
      TableName : jobPostsTable,
      FilterExpression: 'jobId =:jobId',
      ExpressionAttributeValues: {
          ':jobId': jobId
        },

  }).promise()
  if(jobPosts.Items.length>0){
      const jobPost=jobPosts.Items[0];
      const candidateIds=jobPost.candidateIds
      const argList=candidateIds.map((c,ind)=>`:c${ind}`).join(',');
      console.log('filterExpression',argList);
      const expAttr={};
      for(let i=0;i<candidateIds.length;i++){
        expAttr[`:c${i}`]=candidateIds[i];
      }
      console.log(expAttr);
      const result= await this.docClient.scan({
        TableName : jobDoorUsersTable,
        FilterExpression: `userId IN( ${argList} )`,
        ExpressionAttributeValues:expAttr,

    }).promise()

    console.log(result);
    const items = result.Items
    return items as User[] ;
  }

}



  async createUser(user: User): Promise<User> {
    await this.docClient.put({
      TableName: jobDoorUsersTable,
      Item: user
    }).promise()
    return user;
  }

  async createJobPost(jobPost: JobPost): Promise<JobPost> {
    console.log("JobPost",jobPost);
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

  return new AWS.DynamoDB.DocumentClient()
}
