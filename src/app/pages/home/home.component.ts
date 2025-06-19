import { Component } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import {
  Attendance,
  Transaction,
  TransactionType,
} from '../../models/Attendance';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, DatePipe],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  data: Transaction[] = [];
  usedMinutes: number = 0;
  remainingMinutes: number = 0;

  tableData = [
    { name: 'Alice', age: 25, job: 'Engineer' },
    { name: 'Bob', age: 30, job: 'Designer' },
    { name: 'Charlie', age: 28, job: 'Developer' },
  ];

  constructor(private attendanceService: AttendanceService) {
    console.log('home');
  }

  TransactionTypeLabels: Record<TransactionType, string> = {
    [TransactionType.Late]: 'تأخير',
    [TransactionType.Absent]: 'غياب',
    [TransactionType.Excuse]: 'استأذان',
    [TransactionType.ForgotFingerPrintIn]: 'نسيان بصمة دخول',
    [TransactionType.ForgotFingerPrintOut]: 'نسيان بصمة خروج',
  };
  ngOnInit() {
    this.attendanceService.getTransactionItems(1, 2026, 5).subscribe((result) => {
      console.log(result);
      this.data = result;
      this.usedMinutes = result.reduce((sum, item) => sum + item.minutes, 0);
      this.remainingMinutes = 720 - this.usedMinutes;
    });
  }

  convertTimeStringToDate(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, seconds);
    return now;
  }
}
