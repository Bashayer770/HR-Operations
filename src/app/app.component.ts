import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HomeComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'HR-Opertations';
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
    
  }
}
