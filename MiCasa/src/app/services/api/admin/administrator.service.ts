import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Administrateur } from '@models/api/administrator';
import { Observable } from 'rxjs';
import { header } from '../api-header';
import { Message } from '@models/api/message';
import { QueryData } from '@models/api/query-data';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  constructor(private http: HttpClient) {}

  //? ********************************* BASIC OPERATIONS *********************************

  /**
   * @summary Used for login in an administrator's space
   * @param email the administrator's email
   * @param password the administrator's password
   * @returns All data related to a given administrator
   */
  logIn = (
    username: string,
    password: string
  ): Observable<QueryData<Administrateur | Message>> =>
    this.http.get<QueryData<Administrateur | Message>>(
      `${environment.apiUrl}Administrateur/LogIn?username=${username}&password=${password}`,
      { headers: header }
    );

  /**
   * @summary Updates informations related to a given administrator
   * @param administrator the administrator with updated data
   * @returns A message that describes the operation's state
   */
  updateProfile = (administrator: Administrateur): Observable<Message> =>
    this.http.post<Message>(
      `${environment.apiUrl}Administrateur/ModifierProfile`,
      administrator,
      { headers: header }
    );

  /**
   * @summary Deletes a given administrator's account
   * @param administrateurId A given administrator's id
   * @returns A message that describes the operation's state
   */
  deleteAccount = (administrateurId: number): Observable<Message> =>
    this.http.post<Message>(
      `${environment.apiUrl}administrator/SupprimerCompte?administrateurId=${administrateurId}`,
      { headers: header }
    );

  /**
   * @summary Terminates a given administrator's session
   * @param administratorId A given administrator's id
   * @returns A message that describes the operation's state
   */
  logOut = (administratorId: number): Observable<Message> =>
    this.http.get<Message>(
      `${environment.apiUrl}Administrateur/LogOut?adminId=${administratorId}`,
      { headers: header }
    );

  /**
   * @summary Creates a new `Administrateur` account.
   * @param admin The administrator that will be registered
   * @returns A message that describes the operation's state
   */
  createAccount = (admin: Administrateur): Observable<Message> =>
    this.http.post<Message>(
      `${environment.apiUrl}Administrateur/CreerCompte`,
      admin,
      {
        headers: header,
      }
    );
}
