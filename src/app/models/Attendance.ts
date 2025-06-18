import { Time } from "@angular/common";

export interface Attendance{
    id: number;
    fingerCode: number;
    ioDateTime: Date;
    nodeSerialNo: string;
    isActive: boolean;
    trType: number;
}


export enum TransactionType{
    Late,
    Excuse,
    ForgotFingerPrintOut,
    ForgotFingerPrintIn,
    Absent,
}

export interface Transaction{
    transactionType:  TransactionType;
    fromTime: Time;
    toTime: Time;
    minutes: number;
}