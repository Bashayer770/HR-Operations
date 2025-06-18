import { Component } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance,Transaction } from '../../models/Attendance';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  data: Transaction[] = [];

  tableData = [
    { name: 'Alice', age: 25, job: 'Engineer' },
    { name: 'Bob', age: 30, job: 'Designer' },
    { name: 'Charlie', age: 28, job: 'Developer' }
  ];

  constructor(private attendanceService: AttendanceService){
console.log("home")
  }

  ngOnInit() {
    this.attendanceService.getTransactionItems(1,  2026,14).subscribe(data => {
      this.data = data;
// for (let index = 0; index < this.data.length; index++) {
//   const element = this.data[index];  
//   console.log(element.minutes)
// }

      console.log(this.data);
    });
  }

}
