import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../../../services/attendance.service';
import { Transaction, TransactionType } from '../../../../models/Attendance';
import { EmployeeData } from '../../../../models/Employee';

@Component({
  selector: 'app-attendance-details-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './attendance-details-modal.component.html',
  styleUrls: ['./attendance-details-modal.component.css'],
})
export class AttendanceDetailsModalComponent implements OnInit {
  @Input() user!: EmployeeData;
  @Output() close = new EventEmitter<void>();

  transactions: Transaction[] = [];
  loading = false;
  error: string | null = null;

  TransactionTypeLabels: Record<TransactionType, string> = {
    [TransactionType.Late]: 'تأخير',
    [TransactionType.Absent]: 'غياب',
    [TransactionType.Excuse]: 'استأذان',
    [TransactionType.ForgotFingerPrintIn]: 'نسيان بصمة دخول',
    [TransactionType.ForgotFingerPrintOut]: 'نسيان بصمة خروج',
  };

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    if (this.user) {
      this.fetchTransactions();
    }
  }

  fetchTransactions() {
    this.loading = true;
    this.attendanceService.getTransactionItems(this.user.id, 2025, 6).subscribe({
      next: (data: Transaction[]) => {
        this.transactions = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'فشل تحميل بيانات الحضور';
        this.loading = false;
        console.error(err);
      },
    });
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  convertTimeStringToDate(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, seconds);
    return now;
  }
}
