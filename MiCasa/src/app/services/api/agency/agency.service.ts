import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Agence } from '@models/api/agency';
import { Observable } from 'rxjs';
import { header } from '../api-header';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  constructor(private http: HttpClient) {}

  logIn = (email: string, password: string): Observable<Agence> =>
    this.http.get<Agence>(
      `${environment.apiUrl}Agence/LogIn?email=${email}&password=${password}`,
      {
        headers: header,
      }
    );
}
