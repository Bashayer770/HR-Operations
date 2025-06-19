export interface TimingPlan {
  id: number;
  descA: string;
  descE: string;
  fromTime: string;      // ISO 8601 time string, e.g. "13:30:00"
  toTime: string;
  rmdFromTime: string;
  rmdToTime: string;
  isRamadan: boolean;
}