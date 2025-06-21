import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { MyLocation } from '../../models/MyLocation';

@Component({
  selector: 'app-location',
  imports:[ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent implements OnInit {
  locations: MyLocation[] = [];
  myForm: FormGroup;
  isVisible = false;
  isEditMode = false;
  currentLocationId: number | null = null;

  constructor(private fb: FormBuilder, private locationService: LocationService) {
    this.myForm = this.fb.group({
      descE: ['', Validators.required],
      descA: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations() {
    this.locationService.getLocations().subscribe({
      next: (res) => this.locations = res,
      error: (err) => console.error(err),
    });
  }

  openAddModal() {
    this.isVisible = true;
    this.isEditMode = false;
    this.myForm.reset();
    this.currentLocationId = null;
  }

  openEditModal(location: MyLocation) {
    this.isVisible = true;
    this.isEditMode = true;
    this.myForm.patchValue(location);
    this.currentLocationId = location.id;
  }

  close() {
    this.isVisible = false;
    this.myForm.reset();
  }

  onSubmit() {
    if(!this.isVisible)
      return;

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const location: MyLocation = {
      id: this.currentLocationId ?? 0,
      descE: this.myForm.value.descE,
      descA: this.myForm.value.descA,
    };

    if (this.isEditMode) {
      this.locationService.updateLocations(location).subscribe(() => {
        this.loadLocations();
        this.close();
      });
    } else {
      this.locationService.addLocations(location).subscribe(() => {
        this.loadLocations();
        this.close();
      });
    }
  }

  deleteLocation(id: number) {
    if (confirm('Are you sure you want to delete this location?')) {
      this.locationService.deleteLocations(id).subscribe(() => {
        this.loadLocations();
      });
    }
  }
}
