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

export interface TimingPlan{
  id :number;
  DescA :string;
  DescE :string;
  FromTime :Date;
  ToTime :Date;
  RmdFromTime :Date;
  RmdToTime :Date;
  IsRamadan :boolean;
}
