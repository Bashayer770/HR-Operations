import { MyLocation } from "./MyLocation";

export interface MyNode{
  serialNo: string;
  descA: string;
  descE: string;
  locCode: number;
  floor: string;
  location: MyLocation|null;
}