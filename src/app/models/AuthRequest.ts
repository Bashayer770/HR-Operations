export interface RegisterRequest {
  Email: string;
  FirstName: string;
  LastName: string;
  Password: string;
  Gender: number;
  TimingCode: number;
  DeptCode: number;
  Role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
