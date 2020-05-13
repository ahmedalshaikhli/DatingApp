import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map, tap, catchError } from 'rxjs/operators';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  baseUrl = environment.apiUrl;
  city = '';
  specialist = '';

constructor(private http: HttpClient) { }





GetDoctors(
  page?,
  itemsPerPage?,
  userParams?,
  likesParam?
): Observable<PaginatedResult<User[]>> {
  
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
    User[]
  >();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams != null) {
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    params = params.append('specialist', userParams.specialist);
  }



  return this.http
    .get<User[]>(this.baseUrl + 'doctors', { observe: 'response', params })
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(
            response.headers.get('Pagination')
          );
        }
        return paginatedResult;
      })
    );
}

getDoctor(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'doctors/' + id);
}

}



