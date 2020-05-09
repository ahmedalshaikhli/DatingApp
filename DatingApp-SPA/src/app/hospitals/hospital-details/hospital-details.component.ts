import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/_models/hospital';
import { Observable } from 'rxjs';
import { HospitalService } from 'src/app/_services/hospital.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css']
})
export class HospitalDetailsComponent implements OnInit {
hospital: Hospital;
public id: string;

  constructor(private hospitalService: HospitalService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.loadUsers();
  }
  loadUsers() {
    this.hospitalService
      .getHospital(this.id).subscribe(res => {
        this.hospital = res; },
        error => {
         console.log(error);
        }
      );
  }

}
