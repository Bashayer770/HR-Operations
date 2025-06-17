import { Component } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../models/Attendance';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  data: Attendance[] = [];

  constructor(private attendanceService: AttendanceService){

  }

  ngOnInit() {
    this.attendanceService.getItems().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

}
