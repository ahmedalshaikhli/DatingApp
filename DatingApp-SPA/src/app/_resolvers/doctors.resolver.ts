import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DoctorService } from '../_services/doctor.service';

@Injectable()
export class DoctorsResolverB implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 10;
 
  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.doctorService
      .GetDoctors(this.pageNumber, this.pageSize, null)
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}