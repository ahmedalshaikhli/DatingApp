import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HospitalService } from 'src/app/_services/hospital.service';
import { Hospital } from 'src/app/_models/hospital';
import { PharmacyService } from 'src/app/_services/pharmacy.service';
import { Pharmacy } from 'src/app/_models/pharmacy';
import { Laboratory } from 'src/app/_models/laboratory';
import { LaboratoryService } from 'src/app/_services/laboratory.service';
import { User } from 'src/app/_models/user';
import { DoctorService } from 'src/app/_services/doctor.service';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { AdminService } from 'src/app/_services/admin.service';




@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class AdminPanelComponent implements OnInit {
  hospitals: Hospital[];
  pharmacies: Pharmacy[];
  laboratories: Laboratory[];
  users: User[];
  rowData: any;

  
  registerMode = true;
  selectedUserTab = 1;
   tabs = [
     {
       name: 'الاطباء',
       key: 1,
       active: true
     },
      {
      name: 'المستشفيات',
      key: 2,
      active: false
    },
    {
      name: 'الصيدليات',
      key: 3,
      active: false
    },
    {
      name: 'المختبرات',
      key: 4,
      active: false
    }
   ];
  alertify: any;



  constructor(private http: HttpClient,
              private hospitalService: HospitalService,
              private pharmacyService: PharmacyService,
              private laboratoryService: LaboratoryService,
              private adminService: AdminService) {}



  ngOnInit() {
    this.GetHospitals();
    this.GetPharmacies();
    this.GetLaboratory();
    this.getUsersWithRoles()
  }


  // GetDoctors() {
  //   this.doctorService
  //     .GetDoctors(
  //       this.pagination.currentPage,
  //       this.pagination.itemsPerPage,
  //       this.userParams
  //     )
  //     .subscribe(
  //       (res: PaginatedResult<User[]>) => {
  //         this.users = res.result;
  //         this.pagination = res.pagination;
  //       },
  //       error => {
  //         this.alertify.error(error);
  //       }
  //     );
  // }
  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(
      (users: User[]) => {
        this.users = users;
        this.rowData = this.users;
      },
      error => {
        console.log(error);
      }
    );
  }

  GetHospitals() {
    this.hospitalService
      .GetHospitals().subscribe(res => {
        this.hospitals = res; },
        error => {
         console.log(error);
        }
      );
  }

  GetPharmacies() {
    this.pharmacyService
      .GetPharmacies().subscribe(res => {
        this.pharmacies = res; },
        error => {
         console.log(error);
        }
      );
  }

  GetLaboratory() {
    this.laboratoryService
      .GetLaboratories().subscribe(res => {
        this.laboratories = res; },
        error => {
         console.log(error);
        }
      );
  }






  tabChange(selectedTab) {
    console.log('### tab change');
    this.selectedUserTab = selectedTab.key;
    for (const tab of this.tabs) {
        if (tab.key === selectedTab.key) {
          tab.active = true;
        } else {
          tab.active = false;
        }
    }
  }

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
