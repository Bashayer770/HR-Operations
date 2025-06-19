import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  @Output() close = new EventEmitter<void>();

  openPermissionsModal() {
    // Stub for permissions modal
    alert('Assign/Remove Permissions clicked (stub)');
  }

  openEditModal() {
    // Stub for edit modal
    alert('Edit User clicked (stub)');
  }

  openDeleteModal() {
    // Stub for delete modal
    alert('Delete User clicked (stub)');
  }
}
