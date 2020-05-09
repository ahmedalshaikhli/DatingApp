import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { Hospital } from '../_models/hospital';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }


GetHospitals() {

  return this.http.get<Hospital[]>(this.baseUrl + 'hospitals');

}

PostHospitals(hospital: Hospital) {
  return this.http.post(this.baseUrl + 'hospitals', hospital);
}

getHospital(id): Observable<Hospital> {
  return this.http.get<Hospital>(this.baseUrl + 'hospitals/' + id);
}

}
