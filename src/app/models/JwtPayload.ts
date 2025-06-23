export interface JwtPayload {
  empId: string;
  fingerCode: string;
  name: string; 
  userInfo: string;
  role: string;
}

export interface UserInfo{
  userName:string;
  firstName:string;
  lastName:string;
  email:string;
  deptCode:number;
  fingerCode:string;
  fromTime:string;
  toTime:string;
}