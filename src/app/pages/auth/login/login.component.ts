import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  activeForm: 'login' | 'register' = 'login';

  exitAnimation = false;
  rememberMe = false;
  loading = false;
  errorMessage = '';

  loginData = {
    username: '',
    password: '',
  };

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
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    const savedUsername = localStorage.getItem('rememberedUsername');
    const savedPassword = localStorage.getItem('rememberedPassword');

    if (savedUsername && savedPassword) {
      this.loginData.username = savedUsername;
      this.loginData.password = savedPassword;
      this.rememberMe = true;
    }
  }

  switchTo(form: 'login' | 'register') {
    this.activeForm = form;
    this.errorMessage = '';
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

  onLoginSubmit() {
    this.loading = true;
    this.errorMessage = '';
    if (this.rememberMe) {
      localStorage.setItem('rememberedUsername', this.loginData.username);
      localStorage.setItem('rememberedPassword', this.loginData.password);
    } else {
      localStorage.removeItem('rememberedUsername');
      localStorage.removeItem('rememberedPassword');
    }

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        console.log('Login Payload:', this.loginData);
        sessionStorage.setItem('token', res.token);
        // this.router.navigate(['/home']);
        this.exitAnimation = true;
        setTimeout(() => {
          this.route.queryParamMap.subscribe((params) => {
            console.log("I'm LOGGING IN");
            let user = params.get('user')!;
            let amount = this.convertToNumber(params.get('amount')!);
            if (user && amount)
              this.router.navigate(['/transferLink'], {
                queryParams: { user: user, amount: amount },
              });
            else this.router.navigate(['/home']);
          });
        }, 700);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed.';
        this.loading = false;
      },
    });
  }

  convertToNumber(value: string): number | undefined {
    if (value != null && !isNaN(Number(value)) && value.trim() !== '')
      return Number(value);

    return undefined;
  }
}
