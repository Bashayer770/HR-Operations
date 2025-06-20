import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API } from '../../services/index';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  userProfile: any = null;
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    this.loading = true;
    this.http.get(API.AUTH.USER_INFO).subscribe({
      next: (data) => {
        this.userProfile = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error || 'Failed to load user profile.';
        this.loading = false;
      },
    });
  }

  openPermissionsModal() {
    alert('Assign/Remove Permissions clicked (stub)');
  }

  openEditModal() {
    alert('Edit User clicked (stub)');
  }

  openDeleteModal() {
    alert('Delete User clicked (stub)');
  }
}
