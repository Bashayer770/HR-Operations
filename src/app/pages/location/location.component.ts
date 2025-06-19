import { Component } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { MyLocation } from '../../models/Location';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-location',
  imports: [ModalComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
constructor (private locationService: LocationService){}

data: MyLocation[] = [];


ngOnInit() {
    this.locationService.getLocations().subscribe(result => {
      console.log(result)
      this.data = result;
    });
  }


showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  Delete(id:number){
    this.locationService.DeleteLocations(id).subscribe(result => {
    });
  }

}
