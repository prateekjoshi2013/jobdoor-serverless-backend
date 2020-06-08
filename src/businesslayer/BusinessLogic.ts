import { JobDoorItemAccess } from '../datalayer/JobDoorDataAccess'
import { CreateUserRequest } from '../models/CreateUserRequest'
import { parseJwtToken } from '../utils/utils'
import { JobPost } from '../models/JobPost'
import { User } from '../models/User'
import { CreateJobPostRequest } from '../models/CreateJobPostRequest'
import { v4 as uuidv4 } from 'uuid';
import { ApplyForJobRequest } from '../models/ApplyForJobRequest'

const  itemAccess=new JobDoorItemAccess();

export async function getAllJobPostsByLocation(locationId:string): Promise<JobPost[]> {
  return itemAccess.getAllJobPostsByLocation(locationId)
}

export async function getAllJobPostsByPosterId(jwtToken:string): Promise<JobPost[]> {
    const jwtPayload = parseJwtToken(jwtToken);
    return itemAccess.getAllJobPostsByPosterId(jwtPayload.sub)
  }

export async function getAllJobPostsByCandidateId(jwtToken:string): Promise<JobPost[]> {
    const jwtPayload = parseJwtToken(jwtToken);
    return itemAccess.getAllJobPostsByCandidateId(jwtPayload.sub)
  }

export async function getCandidates(postId:string): Promise<User[]> {
    return itemAccess.getCandidates(postId)
  }

// export async function deleteTodo(jwtToken:string,todoId:string): Promise<any> {
//   const userId = parseUserId(jwtToken)
//   return todoItemAccess.deleteTodo(userId,todoId)
// }

export async function updateJobPostApply(jwtToken:string, applyForJobRequest: ApplyForJobRequest): Promise<any> {
  const jwtPayload = parseJwtToken(jwtToken)
  return itemAccess.updateJobPost(jwtPayload.sub,applyForJobRequest);
}

// export async function generateUploadUrl(jwtToken:string, todoId:string): Promise<ImageUrl> {
//   const userId = parseUserId(jwtToken)
//   const imageId = uuid.v4();
//   return todoItemAccess.generateUploadUrl(userId,todoId,imageId)
// }

export async function createUser(
  createUserRequest: CreateUserRequest,
  jwtToken: string
): Promise<User> {
    const newUserIdentifierDetails = parseJwtToken(jwtToken)
    const {locationCode,experience,skills,description, userType}=createUserRequest
    const details=userType==='company'?{description}:{experience,skills};
    const newUser ={
        userId:newUserIdentifierDetails.sub,
        name:newUserIdentifierDetails.name,
        imageUrl:newUserIdentifierDetails.picture,
        locationCode,
        email:newUserIdentifierDetails.email,
        userType,
        details
      }
  console.log("details",details);
  return  itemAccess.createUser(newUser);
}


export async function createJobPost(
    createJobPostRequest: CreateJobPostRequest,
    jwtToken: string
  ): Promise<JobPost> {
     const jobId=uuidv4();
      const userDetails = parseJwtToken(jwtToken)
      const {locationCode,jobDescription}=createJobPostRequest
      const newJobPost ={
          posterId:userDetails.sub,
          posterName:userDetails.name,
          locationCode,
          jobDescription,
          jobId,
          candidateIds:[]
        }
    console.log("details",newJobPost);
    return  itemAccess.createJobPost(newJobPost);
  }