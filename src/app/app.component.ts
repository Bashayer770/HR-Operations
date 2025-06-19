import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar *ngIf="!isLoginPage"></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  isLoginPage = false;

  constructor(private router: Router) {
    // Subscribe to router events to update isLoginPage
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isLoginPage = event.url === '/login';
        }
      });
  }
}
