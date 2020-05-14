import { Component, OnInit } from '@angular/core';
import { Pharmacy } from 'src/app/_models/pharmacy';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PharmacyService } from 'src/app/_services/pharmacy.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-pharmacy-creation',
  templateUrl: './pharmacy-creation.component.html',
  styleUrls: ['./pharmacy-creation.component.css']
})
export class PharmacyCreationComponent implements OnInit {

  pharmacy: Pharmacy;
  pharmacyForm: FormGroup;
  constructor(
    private pharmacyService: PharmacyService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.pharmacyForm = this.fb.group(
      {
        name: ['', Validators.required],
        phone: ['', Validators.required],
        description:  ['', Validators.required]
      }
    );
  }

  createPharmacy() {
    if (this.pharmacyForm.valid) {
      this.pharmacy = Object.assign({}, this.pharmacyForm.value);
      this.pharmacyService.PostPharmacy(this.pharmacy).subscribe(
        () => {
          this.alertify.success('تم اضافة صيدلية جديدة');
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          window.location.reload();
          this.router.navigate(['/admin']);
        }
      );
    }
  }
}
