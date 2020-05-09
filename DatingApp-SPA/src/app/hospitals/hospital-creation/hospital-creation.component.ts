import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/_models/hospital';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/_services/hospital.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-hospital-creation',
  templateUrl: './hospital-creation.component.html',
  styleUrls: ['./hospital-creation.component.css']
})
export class HospitalCreationComponent implements OnInit {
  hospital: Hospital;
  hospitalForm: FormGroup;
  constructor(
    private hospitalService: HospitalService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.hospitalForm = this.fb.group(
      {
        name: ['', Validators.required],
        phone: ['', Validators.required],
        numberOfDoctors:  ['', Validators.required],
        description:  ['', Validators.required]
      }
    );
  }

  register() {
    if (this.hospitalForm.valid) {
      this.hospital = Object.assign({}, this.hospitalForm.value);
      this.hospitalService.PostHospitals(this.hospital).subscribe(
        () => {
          this.alertify.success('Registration succesful');
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          // this.router.navigate(['/hospitals']);
        }
      );
    }
  }
}
