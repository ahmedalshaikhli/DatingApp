import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pharmacy } from '../_models/pharmacy';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
GetPharmacies() {

  return this.http.get<Pharmacy[]>(this.baseUrl + 'pharmacies');

}

PostPharmacy(pharmacy: Pharmacy) {
  return this.http.post(this.baseUrl + 'pharmacies', pharmacy);
}

getPharmacy(id): Observable<Pharmacy> {
  return this.http.get<Pharmacy>(this.baseUrl + 'pharmacies/' + id);
}

}
