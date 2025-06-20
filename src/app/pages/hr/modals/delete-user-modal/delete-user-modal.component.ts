import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-user-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-user-modal.component.html',
  styleUrls: [],
})
export class DeleteUserModalComponent {
  @Input() user: any;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  onConfirm() {
    this.confirm.emit();
  }
}
