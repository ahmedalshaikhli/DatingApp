import { Component, OnInit } from '@angular/core';
import { Hospital } from '../_models/hospital';
import { HospitalService } from '../_services/hospital.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {
  hospitals: Hospital[];
  constructor(
    private hospitalService: HospitalService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.hospitalService
      .GetHospitals().subscribe(res => {
        this.hospitals = res; },
        error => {
         console.log(error);
        }
      );
  }
}
