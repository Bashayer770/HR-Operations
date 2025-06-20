import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user-modal.component.html',
  styleUrls: [],
})
export class EditUserModalComponent {
  @Input() user: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  editedUser: any = {};

  ngOnInit() {
    this.editedUser = { ...this.user };
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  onSave() {
    this.save.emit(this.editedUser);
  }
}
