import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Agence } from '@models/api/agency';
import { Message } from '@models/api/message';
import { QueryData } from '@models/api/query-data';
import { Observable } from 'rxjs';
import { header } from '../api-header';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  constructor(private http: HttpClient) {}

  /**
   * @summary Used for login in an agency's space
   * @param username the agency's username
   * @param password the agency's password
   * @returns All data related to a given agency
   */
  logIn = (
    username: string,
    password: string
  ): Observable<QueryData<Agence | Message>> =>
    this.http.get<QueryData<Agence | Message>>(
      `${environment.apiUrl}Agence/LogIn?username=${username}&password=${password}`,
      {
        headers: header,
      }
    );

  /**
   * @summary Retrieves a sequence of  (stopIndex - startIndex) agencies
   * @param startIndex the offset of data
   * @param stopIndex the last row's index
   * @returns A sequence of agencies and all of their related data
   */
  getAgencies = (
    startIndex: number,
    stopIndex: number
  ): Observable<QueryData<Agence[] | Message>> =>
    this.http.get<QueryData<Agence[] | Message>>(
      `${environment.apiUrl}Agence/GetAgence?startIndex=${startIndex}&stopIndex=${stopIndex}`,
      { headers: header }
    );

  /**
   * @summary Updates informations related to a given agency
   * @param agency the agency with updated data
   * @returns A message that describes the operation's state
   */
  updateProfile = (agency: Agence): Observable<Message> =>
    this.http.post<Message>(
      `${environment.apiUrl}Agence/ModifierProfile`,
      agency,
      {
        headers: header,
      }
    );

  /**
   *
   * @param agency
   * @returns
   */
  creerCompte = (agency: Agence): Observable<Message> =>
    this.http.post<Message>(`${environment.apiUrl}Agence/CreerCompte`, agency, {
      headers: header,
    });

  /**
   * @summary Deletes a given agency's account
   * @param agenceId A given agency's id
   * @returns A message that describes the operation's state
   */
  supprimerCompte = (agence: Agence): Observable<Message> =>
    this.http.delete<Message>(
      `${environment.apiUrl}Agence/SupprimerCompte?agenceId=${agence.AgenceId}&email=${agence.Compte?.Mail}&name=${agence.Compte?.Nom}`,
      {
        headers: header,
      }
    );

  /**
   * @summary Blocks a given agency's account
   * @param agenceId A given agency's id
   * @returns A message that describes the operation's state
   */
  bloquerCompteAgence = (agenceId: number): Observable<Message> =>
    this.http.get<Message>(
      `${environment.apiUrl}Agence/BloquerCompteAgence?agenceId=${agenceId}`,
      {
        headers: header,
      }
    );

  /**
   * @summary Unblocks a given agency's account
   * @param agenceId A given agency's id
   * @returns A message that describes the operation's state
   */
  debloquerCompte = (agenceId: number): Observable<Message> =>
    this.http.get<Message>(`${environment.apiUrl}Agence/DebloquerCompte`, {
      headers: header,
      params: {
        agenceId: agenceId,
      },
    });

  /**
   * @summary Terminates a given agency's session
   * @param agencyId A given agency's id
   * @returns A message that describes the operation's state
   */
  logOut = (agenceId: number): Observable<Message> =>
    this.http.get<Message>(
      `${environment.apiUrl}Agence/LogOut?agenceId=${agenceId}`,
      { headers: header }
    );
}
