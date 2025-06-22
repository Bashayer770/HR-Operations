import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { API } from '../../../services/index';
import { RegisterComponent } from '../../auth/register/register.component';
import { EmployeeData } from '../../../models/Employee';
import { EditUserModalComponent } from '../modals/edit-user-modal/edit-user-modal.component';
import { DeleteUserModalComponent } from '../modals/delete-user-modal/delete-user-modal.component';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RegisterComponent,
    EditUserModalComponent,
    DeleteUserModalComponent,
  ],
  templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  userToEdit: any = null;
  userToDelete: any = null;
  loading = false;
  error: string | null = null;
  filters = {
    name: '',
    fingerCode: '',
  };
  showRegisterModal = false;
  showEditModal = false;
  showDeleteModal = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.http.get<EmployeeData[]>(API.EMPLOYEES).subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error || 'فشل تحميل المستخدمين';
        this.loading = false;
      },
    });
  }

  filteredUsers() {
    return this.users.filter((user) => {
      const name = (user.nameE || user.NameE || '').toLowerCase();
      const fingerCode = (user.fingerCode || '').toString();

      return (
        (!this.filters.name ||
          name.includes(this.filters.name.toLowerCase())) &&
        (!this.filters.fingerCode ||
          fingerCode.includes(this.filters.fingerCode))
      );
    });
  }

  selectUser(user: any) {
    if (this.selectedUser === user) {
      this.selectedUser = null;
    } else {
      this.selectedUser = user;
    }
  }

  editUser(user: any) {
    this.userToEdit = { ...user };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.userToEdit = null;
  }

  saveUser(updatedUser: any) {
    console.log('Saving user:', updatedUser);
    // Here you would typically call a service to update the user on the backend
    // For now, let's just update the local list
    const index = this.users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
    this.closeEditModal();
  }

  addUser() {
    this.showRegisterModal = true;
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
  }

  softDeleteUser(user: any) {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  confirmDelete() {
    if (!this.userToDelete) return;
    console.log('Deleting user:', this.userToDelete);
    // Here you would typically call a service to soft delete the user
    // For now, let's just filter them out of the local list
    this.users = this.users.filter((u) => u.id !== this.userToDelete.id);
    this.closeDeleteModal();
  }
}
