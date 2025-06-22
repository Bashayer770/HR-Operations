import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NodeService } from '../../services/node.service';
import { MyNode } from '../../models/MyNode';
import { MyLocation } from '../../models/MyLocation';
import { LocationService } from '../../services/location.service';
import { uniqueIdValidator } from './custom-validators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-node',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './node.component.html',
  styleUrl: './node.component.css',
})
export class NodeComponent implements OnInit {
  nodes: MyNode[] = [];
  filteredNodes: MyNode[] = [];
  myForm: FormGroup;
  isVisible = false;
  isEditMode = false;
  currentNodeId: string | null = null;
  locations: MyLocation[] = [];
  filters = {
    serialNo: '',
  };

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private nodeService: NodeService
  ) {
    this.myForm = this.fb.group({
      serialNo: ['', Validators.required, uniqueIdValidator(this.nodeService)],
      descE: ['', Validators.required],
      descA: ['', Validators.required],
      locCode: ['', Validators.required],
      floor: ['', Validators.required],
    });
    this.locationService.getLocations().subscribe({
      next: (res) => (this.locations = res),
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {
    this.loadNodes();
  }

  loadNodes() {
    this.nodeService.getNodes().subscribe({
      next: (res) => {
        this.nodes = res;
        this.applyFilters();
      },
      error: (err) => console.error(err),
    });
  }

  applyFilters() {
    this.filteredNodes = this.nodes.filter((node) => {
      const serialNo = (node.serialNo || '').toLowerCase();
      return serialNo.includes(this.filters.serialNo.toLowerCase());
    });
  }

  openAddModal() {
    this.isVisible = true;
    this.isEditMode = false;
    this.myForm.reset();
    this.currentNodeId = null;
    this.myForm.get('serialNo')?.enable();
  }

  openEditModal(node: MyNode) {
    this.isVisible = true;
    this.isEditMode = true;
    this.myForm.patchValue(node);
    this.currentNodeId = node.serialNo;
    this.myForm.get('serialNo')?.disable();
  }

  close() {
    this.isVisible = false;
    this.myForm.reset();
  }

  onSubmit() {
    if (!this.isVisible) return;

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const node: MyNode = {
      serialNo: this.currentNodeId ?? this.myForm.value.serialNo,
      descE: this.myForm.value.descE,
      descA: this.myForm.value.descA,
      locCode: this.myForm.value.locCode,
      floor: this.myForm.value.floor,
      location: null,
    };

    if (this.isEditMode) {
      this.nodeService.updateNodes(node).subscribe(() => {
        this.loadNodes();
        this.close();
      });
    } else {
      this.nodeService.addNodes(node).subscribe(() => {
        this.loadNodes();
        this.close();
      });
    }
  }

  deleteNode(id: string) {
    if (confirm('Are you sure you want to delete this node?')) {
      this.nodeService.deleteNodes(id).subscribe(() => {
        this.loadNodes();
      });
    }
  }
}
