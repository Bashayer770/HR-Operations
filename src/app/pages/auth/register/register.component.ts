import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { TimingPlan } from '../../../models/TimingPlan';
import { Department } from '../../../models/Department';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  loading: boolean = false
  exitAnimation: boolean = false;
  errorMessage:string = '';
  timingplan: TimingPlan[] = [];
  departments: Department[] = [];
  registerData = {
    Email: '',
    FirstName: '',
    LastName: '',
    password: '',
    Gender: 0,
    TimingCode: 0,
    DeptCode: 0,
    Role: ''
  };

    constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

    ngOnInit(): void {
      this.dataService.getTimingPlans().subscribe(c => {this.timingplan = c; console.log(c)})
      console.log(this.timingplan)
      this.dataService.getDepartments().subscribe(c => this.departments = c)
      console.log(this.departments)
  }
    onRegisterSubmit() {
    this.loading = true;
//    if (!this.registerData.image) {
//      this.errorMessage = 'Please upload a profile image.';
//      this.loading = false;
//      return;
//    }

    this.authService
      .register({
        Email: this.registerData.Email,
        FirstName: this.registerData.FirstName,
        LastName: this.registerData.LastName,
        Gender: this.registerData.Gender,
        TimingCode: this.registerData.TimingCode,
        DeptCode: this.registerData.DeptCode,
        Role: this.registerData.Role
      })
      .subscribe({
        next: (res) => {
          console.log('register Payload:', this.registerData);
          sessionStorage.setItem('token', res.token);
          // this.router.navigate(['/home']);
          this.exitAnimation = true;
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 700);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Registration failed.';
          this.loading = false;
        },
      });
  }

}
