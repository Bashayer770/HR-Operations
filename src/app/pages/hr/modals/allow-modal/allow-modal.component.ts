import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-allow-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './allow-modal.component.html',
  styleUrls: [],
})
export class AllowModalComponent {
  @Input() user: any;
  @Input() allows: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  selectedAllow: any = null;

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  onSave() {
    this.save.emit(this.selectedAllow);
  }
}
