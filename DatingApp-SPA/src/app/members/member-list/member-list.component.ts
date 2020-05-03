import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  searchTerm: string;
  user: User = JSON.parse(localStorage.getItem('user'));
  specialistList = [
    { value: 'Otolaryngology', display: 'الأنف والأذن والحنجرة' },
    { value: 'Nephrology', display: 'أمراض الكلى' },
    { value: 'Sportsmedicine', display: 'الطب الرياضي' },
    { value: 'Childneurology', display: 'طب أعصاب الأطفال' }
  ];

  cityList = [
    { value: 'baghdad', display: 'بغداد' },
    { value: 'Diyala', display: 'ديالى' },
    { value: 'Erbil', display: 'أربيل' },
  ];
  genderList = [
    { value: 'male', display: 'طبيب' },
    { value: 'female', display: 'طبيبة' }
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

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.city = this.user.city;
    this.userParams.specialist = this.user.specialist;
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.city = this.user.city;
    this.userParams.specialist = this.user.specialist;
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(
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
