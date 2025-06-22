import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import {
  Attendance,
  Transaction,
  TransactionType,
} from '../../models/Attendance';
import { CommonModule, DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../models/JwtPayload';
import { ChatbotComponent } from '../../Components/chatbot/chatbot.component';
import { AuthService } from '../../services/auth.service';
import { TimingPlan, EmployeeData } from '../../models/Employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, DatePipe, ChatbotComponent],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent implements OnInit {
  data: Transaction[] = [];
  usedMinutes: number = 0;
  totalMinutes: number = 720;
  remainingMinutes: number = 720;
  decode = (): JwtPayload => {
    let token = sessionStorage.getItem('token');
    if (token) {
      console.log(token);
      return jwtDecode<JwtPayload>(token);
    }
    let jwt: JwtPayload = { empId: '', fingerCode: '', name: '' };
    return jwt;
  };

  tableData = [
    { name: 'Alice', age: 25, job: 'Engineer' },
    { name: 'Bob', age: 30, job: 'Designer' },
    { name: 'Charlie', age: 28, job: 'Developer' },
  ];

  userName: string | null = null;
  timingPlan: TimingPlan | null = null;

  summary = [
    {
      title: 'إجمالي الدقائق',
      value: this.totalMinutes,
      icon: 'time',
    },
    {
      title: 'الدقائق المستخدمة',
      value: this.usedMinutes,
      icon: 'time-check',
    },
    {
      title: 'الدقائق المتبقية',
      value: this.remainingMinutes,
      icon: 'time-left',
    },
  ];

  constructor(
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService
  ) {
    console.log('home');
  }

  TransactionTypeLabels: Record<TransactionType, string> = {
    [TransactionType.Late]: 'تأخير',
    [TransactionType.Absent]: 'غياب',
    [TransactionType.Excuse]: 'استأذان',
    [TransactionType.ForgotFingerPrintIn]: 'نسيان بصمة دخول',
    [TransactionType.ForgotFingerPrintOut]: 'نسيان بصمة خروج',
  };
  ngOnInit(): void {
    const token = sessionStorage.getItem('token') ?? '';
    const decodedToken: JwtPayload = jwtDecode(token);
    this.attendanceService
      .getTransactionItems(
        Number(decodedToken.empId),
        new Date().getFullYear(),
        new Date().getMonth() + 1
      )
      .subscribe((res: Transaction[]) => {
        this.data = res;
        this.usedMinutes = res.reduce((acc, curr) => acc + curr.minutes, 0);
        this.remainingMinutes = 720 - this.usedMinutes;
      });

    this.employeeService
      .getEmployeeById(Number(decodedToken.empId))
      .subscribe((employee: EmployeeData) => {
        this.userName = employee.nameA;
        this.timingPlan = employee.timingPlan;
      });
  }

  convertTimeStringToDate(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, seconds);
    return now;
  }
}
