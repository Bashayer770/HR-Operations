import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../../services/index';
import { TimingPlan } from '../../../../models/TimingPlan';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user-modal.component.html',
  styleUrls: [],
})
export class EditUserModalComponent implements OnInit {
  @Input() user: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  editedUser: any = {};
  timingPlans: TimingPlan[] = [];
  nonallowTimingPlans:TimingPlan[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.editedUser = { ...this.user };
    this.fetchTimingPlans();
  }

  fetchTimingPlans() {
    this.http.get<any[]>(API.GET_TIME_PLANS_NON_ALLOW).subscribe({
      next: (data) => {
        this.nonallowTimingPlans = data;
      },
      error: (err) => {
        console.error('Failed to load timing plans', err);
      },
    });

     this.http.get<any[]>(API.GET_TIMING_PLAN).subscribe({
      next: (data) => {
        this.timingPlans = data;
      },
      error: (err) => {
        console.error('Failed to load timing plans', err);
      },
    });
  }

  onOverlayClick(event: MouseEvent) {    
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  onSave() {
    this.save.emit(this.editedUser);
  }

  getTimeAsDate(time: string): Date {
    const today = new Date();
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, seconds);
  }


}
