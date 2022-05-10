import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Client } from '@models/api/client.model';
import { QueryData } from '@models/api/query-data';
import { Observable } from 'rxjs';
import { header } from '../api-header';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  /**
   * @summary Used to start a client's session
   * @param username
   * @param password
   * @returns Whether the client's credentials or an error message
   */
  login = (
    username: string,
    password: string
  ): Observable<QueryData<Client | Message>> =>
    this.http.get<QueryData<Client | Message>>(
      `${environment.apiUrl}Client/Login?username=${username}&password=${password}`,
      {
        headers: header,
      }
    );

  /**
   * @summary Ends a client's session
   * @param clientId
   * @returns A message that says `Goodbye !` or an error message.
   */
  logOut = (clientId: number): Observable<Message> =>
    this.http.get<Message>(
      `${environment.apiUrl}Client/Logout?clientId=${clientId}`,
      { headers: header }
    );

  /**
   * @summary Updates data related to a given `Client`.
   * @param client
   * @returns A message that describes the result of the operation or an error message.
   */
  modifierProfile = (client: Client): Observable<Message> =>
    this.http.put<Message>(
      `${environment.apiUrl}Client/ModifierProfile`,
      client,
      {
        headers: header,
      }
    );

  /**
   * @summary Deletes a given client and all its data.
   * @param clientId
   * @returns A message that describes the result of the operation or an error message.
   */
  supprimerCompte = (clientId: number): Observable<Message> =>
    this.http.delete<Message>(
      `${environment.apiUrl}Client/SupprimerCompte?clientId=${clientId}`,
      { headers: header }
    );

  /**
   * @summary Creates a new client.
   * @param client
   * @returns A message that describes the result of the operation or an error message.
   */
  creerCompte = (client: Client): Observable<Message> =>
    this.http.post<Message>(`${environment.apiUrl}Client/CreerCompte`, client, {
      headers: header,
    });

  /**
   * @summary Retrieves a sequence of  (stopIndex - startIndex) clients
   * @param startIndex
   * @param stopIndex
   * @returns Whether a range of clients and all of their related credentials or an error message
   */
  getClients = (
    startIndex: number,
    stopIndex: number
  ): Observable<QueryData<Client[] | Message>> =>
    this.http.get<QueryData<Client[] | Message>>(
      `${environment.apiUrl}Client/GetClients?startIndex=${startIndex}&stopIndex=${stopIndex}`,
      { headers: header }
    );

  /**
   * @summary Deactivates a given client's account.
   * @param clientId
   * @returns  A message that describes the result of the operation or an error message.
   */
  bloquerCompteClient = (clientId: number): Observable<Message> =>
    this.http.get<Message>(
      `${environment.apiUrl}Client/BloquerCompte?clientId=${clientId}`,
      { headers: header }
    );

  /**
   * @summary Activates a given client's account.
   * @param clientId
   * @returns A message that describes the result of the operation or an error message.
   */
  debloquerCompteClient = (clientId: number): Observable<Message> =>
    this.http.get<Message>(
      `${environment.apiUrl}Client/DebloquerCompteClient?clientId=${clientId}`,
      { headers: header }
    );
}
