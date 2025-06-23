import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { API } from '../../../services/index';
import { RegisterComponent } from '../../auth/register/register.component';
import { EmployeeData, TimingPlan } from '../../../models/Employee';
import { TimingPlanService } from '../../../services/timing-plan.service';
import { EmployeeService } from '../../../services/employee.service';
import { EditUserModalComponent } from '../modals/edit-user-modal/edit-user-modal.component';
import { DeleteUserModalComponent } from '../modals/delete-user-modal/delete-user-modal.component';
import { AddUserModalComponent } from '../modals/add-user-modal/add-user-modal.component';
import { AttendanceDetailsModalComponent } from '../modals/attendance-details-modal/attendance-details-modal.component';
import { AllowModalComponent } from '../modals/allow-modal/allow-modal.component';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RegisterComponent,
    EditUserModalComponent,
    DeleteUserModalComponent,
    AttendanceDetailsModalComponent,
    AllowModalComponent,
  ],
  templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent implements OnInit {
  users: EmployeeData[] = [];
  timingPlans: TimingPlan[] = [];
  selectedUser: EmployeeData | null = null;
  userToEdit: EmployeeData | null = null;
  userToDelete: EmployeeData | null = null;
  userForAttendance: EmployeeData | null = null;
  userForAllow: EmployeeData | null = null;
  loading = false;
  error: string | null = null;
  filters = {
    name: '',
    fingerCode: '',
  };
  showRegisterModal = false;
  showEditModal = false;
  showDeleteModal = false;
  showAttendanceModal = false;
  showAllowModal = false;
  allows: any[] = [];

  constructor(
    private http: HttpClient,
    private timingPlanService: TimingPlanService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.fetchUsers();
    this.fetchTimingPlans();
    this.fetchAllows();
  }

  fetchUsers() {
    this.loading = true;
    this.http.get<EmployeeData[]>(API.EMPLOYEES).subscribe({
      next: (data: EmployeeData[]) => {
        this.users = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error || 'فشل تحميل المستخدمين';
        this.loading = false;
      },
    });
  }

  fetchTimingPlans() {
    this.timingPlanService.getTimingPlans().subscribe({
      next: (data: TimingPlan[]) => {
        this.timingPlans = data;
      },
      error: (err: any) => {
        console.error('Failed to load timing plans', err);
      },
    });
  }

  fetchAllows() {
    this.http.get<any[]>(API.GET_EMPLOYEE_ALLOWS).subscribe({
      next: (data: any[]) => {
        this.allows = data;
      },
      error: (err: any) => {
        console.error('Failed to load allows', err);
      },
    });
  }

  onTimingPlanChange(user: EmployeeData, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newPlanId = Number(selectElement.value);
    const newTimingPlan = this.timingPlans.find((p) => p.id === newPlanId);
    if (newTimingPlan) {
      const updatedUser = { ...user, timingPlan: newTimingPlan };
      this.employeeService.updateEmployee(updatedUser).subscribe({
        next: () => {
          // Optionally refresh the user data or update the local object
          const index = this.users.findIndex((u) => u.id === user.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
        },
        error: (err: any) => {
          console.error('Failed to update timing plan', err);
          // Optionally, revert the change in the UI
        },
      });
    }
  }

  filteredUsers() {
    return this.users.filter((user) => {
      const name = (user.nameE || '').toLowerCase();
      const fingerCode = (user.fingerCode || '').toString();

      return (
        (!this.filters.name ||
          name.includes(this.filters.name.toLowerCase())) &&
        (!this.filters.fingerCode ||
          fingerCode.includes(this.filters.fingerCode))
      );
    });
  }

  selectUser(user: EmployeeData) {
    if (this.selectedUser === user) {
      this.selectedUser = null;
    } else {
      this.selectedUser = user;
    }
  }

  editUser(user: EmployeeData) {
    this.userToEdit = { ...user };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.userToEdit = null;
  }

  saveUser(updatedUser: EmployeeData) {
    console.log('Saving user:', updatedUser);
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

  softDeleteUser(user: EmployeeData) {
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
    this.users = this.users.filter((u) => u.id !== this.userToDelete!.id);
    this.closeDeleteModal();
  }

  openAttendanceModal(user: EmployeeData) {
    this.userForAttendance = user;
    this.showAttendanceModal = true;
  }

  closeAttendanceModal() {
    this.showAttendanceModal = false;
    this.userForAttendance = null;
  }

  openAllowModal(user: EmployeeData) {
    this.userForAllow = user;
    this.showAllowModal = true;
  }

  closeAllowModal() {
    this.showAllowModal = false;
    this.userForAllow = null;
  }

  onAllowSave(selectedAllow: any) {
    console.log(
      'Selected Allow:',
      selectedAllow,
      'for user:',
      this.userForAllow
    );
    this.closeAllowModal();
  }
}
