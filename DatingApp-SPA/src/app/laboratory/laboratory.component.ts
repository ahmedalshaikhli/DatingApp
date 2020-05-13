import { Component, OnInit } from '@angular/core';
import { Laboratory } from '../_models/laboratory';
import { LaboratoryService } from '../_services/laboratory.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})
export class LaboratoryComponent implements OnInit {

  laboratories: Laboratory[];
  constructor(
    private laboratoryService: LaboratoryService) { }

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.laboratoryService
      .GetLaboratories().subscribe(res => {
        this.laboratories = res; },
        error => {
         console.log(error);
        }
      );
  }
}
