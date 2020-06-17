import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { CreateUserRequest } from '../models/CreateUserRequest'
import { ImageUrl } from '../models/ImageUrl'
import { JobPost } from '../models/JobPost'
import {User} from '../models/User'
import { ApplyForJobRequest } from '../models/ApplyForJobRequest'
import {UpdateJobPostRequest} from '../models/UpdateJobPostRequest'

const XAWS = AWSXRay.captureAWS(AWS)
const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const userIndex= process.env.JOBDOOR_USER_ID_INDEX;
const jobPostsTable = process.env.JOBPOSTS_TABLE
const jobDoorUsersTable = process.env.JOBDOOR_USER_TABLE
const imageBucket=process.env.IMAGES_S3_BUCKET;
const expiration=process.env.SIGNED_URL_EXPIRATION;
const jobPostsIndexTable=process.env.JOBPOSTS_POST_ID_INDEX;
// const urlExpiration =  process.env.SIGNED_URL_EXPIRATION

// const s3 = new XAWS.S3({
//   signatureVersion: 'v4'
// })
export class JobDoorItemAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient()) {
  }


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

  async editJobPost(request:UpdateJobPostRequest):Promise<any>{
    const {jobId,locationCode,jobDescription}= request;
    console.log('updating items with jobId ',jobId,'for location',locationCode);
   try{
    const updateData= await this.docClient.update(
      {

        TableName: jobPostsTable,
        Key: { jobId ,locationCode},
        UpdateExpression: "SET jobDescription = :jobDescription",
        ExpressionAttributeValues: { ":jobDescription": jobDescription },
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
    console.log('result:',result)
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
  console.log("jobPosts",jobPosts);
  if(jobPosts.Items.length>0){
      const jobPost=jobPosts.Items[0];
      const candidateIds=jobPost.candidateIds
      if(candidateIds.length>0){
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
 return [] as User[];
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

async generateUploadUrl(userId:string,picId:string): Promise<ImageUrl> {
  console.log("upload url for user id",userId);
  try{
    const uploadUrl=await this.getUploadUrl(picId);
    const user=await this.getUser(userId);
    const updateData= await this.docClient.update(
      {
        TableName:jobDoorUsersTable,
        Key:{
            "userId": userId,
            "locationCode": user.locationCode
        },
        UpdateExpression: "set imageUrl = :imageUrl",
        ExpressionAttributeValues:{
            ":imageUrl":`https://${imageBucket}.s3.amazonaws.com/${picId}`
        },
        ReturnValues:"UPDATED_NEW"
    }).promise();
    console.log('updated data',updateData);
    return Promise.resolve({uploadUrl});
   }catch(e){
    console.log('updated data',e);
   }
}

getUploadUrl(imageId: string) {
  return s3.getSignedUrl('putObject', {
    Bucket: imageBucket,
    Key: imageId,
    Expires: parseInt(expiration)
  })
}

async getUser(userId:string): Promise<User> {
  console.log('Getting  user for userId:',userId);

  const result = await this.docClient.query({
    TableName: jobDoorUsersTable,
    IndexName: userIndex,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
        ":userId": userId
    }
}).promise()

 if(result.Items.length>0){
  const items = result.Items[0]
  return items as User
 }else{
   return {} as User;
 }
}

async deleteJobPost(jobId:string): Promise<any>{
    const jobPost= await this.getJobPost(jobId);
    if(jobPost.locationCode!==undefined){
      const data=await this.docClient.delete({
        TableName:jobPostsTable,
        Key:{
            "jobId": jobPost.jobId,
            "locationCode": jobPost.locationCode
        },
      }).promise();
      return data;
    }
    return {};
}

async getJobPost(jobId:string): Promise<JobPost> {
  console.log('Getting  job for jobId:',jobId);

  const result = await this.docClient.query({
    TableName: jobPostsTable,
    IndexName: jobPostsIndexTable,
    KeyConditionExpression: "jobId = :jobId",
    ExpressionAttributeValues: {
        ":jobId": jobId
    }
}).promise()

 if(result.Items.length>0){
  const items = result.Items[0]
  return items as JobPost
 }else{
   return {} as JobPost;
 }
}

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
