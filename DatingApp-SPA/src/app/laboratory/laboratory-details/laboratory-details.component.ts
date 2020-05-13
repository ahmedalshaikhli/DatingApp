import { Component, OnInit } from '@angular/core';
import { Laboratory } from 'src/app/_models/laboratory';
import { ActivatedRoute } from '@angular/router';
import { LaboratoryService } from 'src/app/_services/laboratory.service';

@Component({
  selector: 'app-laboratory-details',
  templateUrl: './laboratory-details.component.html',
  styleUrls: ['./laboratory-details.component.css']
})
export class LaboratoryDetailsComponent implements OnInit {

  laboratory: Laboratory;
  public id: string;
    constructor(private laboratoryService: LaboratoryService, private route: ActivatedRoute) { }
    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
  
      this.loadUsers();
    }
    loadUsers() {
      this.laboratoryService
        .getLaboratory(this.id).subscribe(res => {
          this.laboratory = res; },
          error => {
           console.log(error);
          }
        );
    }
}
