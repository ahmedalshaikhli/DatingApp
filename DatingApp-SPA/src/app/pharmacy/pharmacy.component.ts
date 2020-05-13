import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../_models/pharmacy';
import { PharmacyService } from '../_services/pharmacy.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {

  pharmacies: Pharmacy[];
  constructor(
    private pharmacyService: PharmacyService) { }

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.pharmacyService
      .GetPharmacies().subscribe(res => {
        this.pharmacies = res; },
        error => {
         console.log(error);
        }
      );
  }
}
