import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../services/location.service';
import type { MyLocation } from '../models/Location';
@Component({
  imports:[ReactiveFormsModule],
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
    myForm: FormGroup;

  constructor(private fb: FormBuilder, private locationService:LocationService) {
    this.myForm = this.fb.group({
      descE: [''],
      descA: ['']
    });
  }
  onSubmit() {
    console.log(this.myForm.value);
  
    let location:MyLocation = {
      id: 0,
      descA : this.myForm.value.descA,
      descE : this.myForm.value.descE
    }
    console.log(location)
    this.locationService.AddLocations(location).subscribe(result=>{})
  }
}
