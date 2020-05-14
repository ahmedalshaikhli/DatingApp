import { Component, OnInit } from '@angular/core';
import { Laboratory } from 'src/app/_models/laboratory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LaboratoryService } from 'src/app/_services/laboratory.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-laboratory-creation',
  templateUrl: './laboratory-creation.component.html',
  styleUrls: ['./laboratory-creation.component.css']
})
export class LaboratoryCreationComponent implements OnInit {

  laboratory: Laboratory;
  laboratoryForm: FormGroup;
  constructor(
    private laboratoryService: LaboratoryService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.laboratoryForm = this.fb.group(
      {
        name: ['', Validators.required],
        phone: ['', Validators.required],
        description:  ['', Validators.required]
      }
    );
  }

  createLaboratory() {
    if (this.laboratoryForm.valid) {
      this.laboratory = Object.assign({}, this.laboratoryForm.value);
      this.laboratoryService.PostLaboratory(this.laboratory).subscribe(
        () => {
          this.alertify.success('تم اضافة مختبر جديدة');
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
