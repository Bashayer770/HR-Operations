import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { API } from '../../../services/index';
import { RegisterComponent } from '../../auth/register/register.component';
import { EmployeeData } from '../../../models/Employee';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterComponent],
  templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  loading = false;
  error: string | null = null;
  filters = {
    department: '',
    username: '',
    name: '',
  };
  showRegisterModal = false;

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
      const dept = (user.deptCode || user.DeptCode || '').toString();
      const username = (user.userName || user.UserName || '').toLowerCase();
      const name = (user.nameE || user.NameE || '').toLowerCase();
      return (
        (!this.filters.department || dept.includes(this.filters.department)) &&
        (!this.filters.username ||
          username.includes(this.filters.username.toLowerCase())) &&
        (!this.filters.name || name.includes(this.filters.name.toLowerCase()))
      );
    });
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }

  editUser(user: any) {
    // Open edit modal or form
  }

  addUser() {
    this.showRegisterModal = true;
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
  }

  softDeleteUser(user: any) {
    // Call API to soft delete
  }
}
