interface Detail{
  description?: string;
  experience?: string;
  skills?:string;
}
export interface User{
  details:Detail
  email:string;
  imageUrl:string;
  locationCode:string;
  name: string;
  userId: string
}
