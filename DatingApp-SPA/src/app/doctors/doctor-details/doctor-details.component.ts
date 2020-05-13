import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/_services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  user: User;
  public id: string;
  constructor(private doctorService: DoctorService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.loadUsers();
  }
  loadUsers() {
    this.doctorService
      .getDoctor(this.id).subscribe(res => {
        this.user = res; },
        error => {
         console.log(error);
        }
      );
  }

}
