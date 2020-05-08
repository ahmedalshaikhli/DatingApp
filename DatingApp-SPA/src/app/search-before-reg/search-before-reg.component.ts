
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-before-reg',
  templateUrl: './search-before-reg.component.html',
  styleUrls: ['./search-before-reg.component.css']
})
export class SearchBeforeRegComponent implements OnInit {
  users: User[];

  searchTerm: string;
  user: User;
  specialistList = [
    { value: 'Otolaryngology', display: 'Otolaryngology' },
    { value: 'Nephrology', display: 'Nephrology' },
    { value: 'Sportsmedicine', display: 'Sportsmedicine' },
    { value: 'Childneurology', display: 'Childneurology' }
  ];

  genderList = [
    { value: 'male', display: 'male' },
    { value: 'female', display: 'female' }
  ];
  userParams: any = {};
  pagination: Pagination;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.gender  = 'female' ? 'male' : 'female';
    // this.userParams.city = this.user.city;
    this.userParams.specialist = 'Childneurology';
    this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender  = 'female' ? 'male' : 'female';
    // this.userParams.city = this.user.city;
    this.userParams.specialist = 'Childneurology';
    this.userParams.orderBy = 'lastActive';
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .Search(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
