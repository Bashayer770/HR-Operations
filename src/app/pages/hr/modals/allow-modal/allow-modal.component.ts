import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimingPlan } from '../../../../models/TimingPlan';

@Component({
  selector: 'app-allow-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './allow-modal.component.html',
  styleUrls: [],
})
export class AllowModalComponent {
  @Input() user: any;
  @Input() allows: TimingPlan[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  selectedAllow: any = null;
  fromDate: string = '';
  toDate: string = '';
  loading: boolean = false;

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  onSave() {
    if (!this.selectedAllow || !this.fromDate || !this.toDate) {
      return;
    }

    this.loading = true;
    this.save.emit({
      selectedAllow: this.selectedAllow,
      fromDate: this.fromDate,
      toDate: this.toDate,
    });
  }
}
