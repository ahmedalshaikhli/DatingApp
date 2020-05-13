import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Laboratory } from '../_models/laboratory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
GetLaboratories() {

  return this.http.get<Laboratory[]>(this.baseUrl + 'laboratories');

}

PostLaboratory(laboratory: Laboratory) {
  return this.http.post(this.baseUrl + 'laboratories', laboratory);
}

getLaboratory(id): Observable<Laboratory> {
  return this.http.get<Laboratory>(this.baseUrl + 'laboratories/' + id);
}

}
