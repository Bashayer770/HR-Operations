import { TimingPlan } from "./TimingPlan";

export interface EmployeeData{              
  id: number;
  email: string;
  fingerCode: number;
  nameE: string;
  nameA: string;
  deptCode: number;
  timingPlan: TimingPlan;
  jobType: number;
  sex: number;
  checkLate: boolean;
  hasAllow: boolean;
  isActive: boolean;
}

// export interface TimingPlan{
//   id :number;
//   descA :string;
//   descE :string;
//   fromTime :Date;
//   toTime :Date;
//   rmdFromTime :Date;
//   rmdToTime :Date;
//   isRamadan :boolean;
// }
