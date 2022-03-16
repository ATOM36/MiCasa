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
  logIn = (username: string, password: string): Observable<QueryData<Agence>> =>
    this.http.get<QueryData<Agence>>(
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
  ): Observable<QueryData<Agence[]>> =>
    this.http.get<QueryData<Agence[]>>(
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
      `${environment.apiUrl}Agence/ModifierProfil?agenceId=${agency.AgenceId}`,
      agency,
      {
        headers: header,
      }
    );

  /**
   * @summary Deletes a given agency's account
   * @param agenceId A given agency's id
   * @returns A message that describes the operation's state
   */
  supprimerCompte = (agenceId: number): Observable<Message> =>
    this.http.delete<Message>(
      `${environment.apiUrl}Agency/SupprimerCompte?agenceId=${agenceId}`,
      {
        headers: header,
      }
    );

  bloquerCompteAgence = (agenceId: number): Observable<Message> =>
    this.http.put<Message>(
      `${environment.apiUrl}Agency/BloquerCompteAgence?agenceId=${agenceId}`,
      {
        headers: header,
      }
    );

  /**
   * @summary Terminates a given agency's session
   * @param agencyId A given agency's id
   * @returns A message that describes the operation's state
   */
  logOut(agencyId: number): Message {
    let response: Message;
    try {
      sessionStorage.removeItem(`a-${agencyId}`);
      response = {
        Content: 'A la prochaine fois sur MiCasa',
        State: true,
      };

      return response;
    } catch (error) {
      response = {
        Content: 'Erreur lors de la déconnexion',
        State: false,
      };
    }
    return response;
  }
}
