import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Administrateur } from '@models/api/administrator';
import { Observable } from 'rxjs';
import { header } from '../api-header';
import { Message } from '@models/api/message';

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
  logIn = (username: string, password: string): Observable<Administrateur> =>
    this.http.get<Administrateur>(
      `${environment.apiUrl}Administrateur/LogIn?username=${username}&password=${password}`,
      {
        headers: header,
      }
    );

  /**
   * @summary Updates informations related to a given administrator
   * @param administrator the administrator with updated data
   * @returns A message that describes the operation's state
   */
  updateProfile = (administrator: Administrateur): Observable<Message> =>
    this.http.post<Message>(
      `${environment.apiUrl}Administrateur/ModifierProfil?administrateurId=${administrator.AdministratorId}`,
      administrator,
      {
        headers: header,
      }
    );

  /**
   * @summary Deletes a given administrator's account
   * @param administrateurId A given administrator's id
   * @returns A message that describes the operation's state
   */
  deleteAccount = (administrateurId: number): Observable<Message> =>
    this.http.post<Message>(
      `${environment.apiUrl}administrator/SupprimerCompte?administrateurId=${administrateurId}`,
      {
        headers: header,
      }
    );

  /**
   * @summary Terminates a given administrator's session
   * @param administratorId A given administrator's id
   * @returns A message that describes the operation's state
   */
  logOut(administratorId: number): Message {
    let response: Message;
    try {
      sessionStorage.removeItem(`a-${administratorId}`);
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

  //? ********************************* OPERATIONS RELATED TO AGENCIES *********************************

  /**
   * @summary Blocks the specified agency's account
   * @param agenceId A given agency's id
   * @returns A message that describes the operation's state
   */
  blockAgency = (agenceId: number): Observable<Message> =>
    this.http.post<Message>(
      `${environment.apiUrl}Administrateur/BloquerCompteAgence?agenceId=${agenceId}`,
      { headers: header }
    );
}
