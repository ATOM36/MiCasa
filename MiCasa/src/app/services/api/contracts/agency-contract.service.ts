import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { ContratAgence } from '@models/api/contrat-agence';
import { Message } from '@models/api/message';
import { Observable } from 'rxjs';
import { header } from '../api-header';

@Injectable({
})
export class AgencyContractService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param contratId
   * @returns
   */
  activateContract = (contratId: number): Observable<Message> =>
    this.http.get<Message>(
      `${environment.apiUrl}ContratAgence/ActivateContract/${contratId}`,
      {
        headers: header,
      }
    );

  /**
   *
   * @param contrat
   * @returns
   */
  createContract = (contrat: ContratAgence): Observable<Message> =>
    this.http.post<Message>(
      `${environment.apiUrl}ContratAgence/CreateContract`,
      contrat,
      {
        headers: header,
      }
    );

  /**
   *
   * @returns
   */
  getContracts = (start: number, stop: number): Observable<ContratAgence[]> =>
    this.http.get<ContratAgence[]>(
      `${environment.apiUrl}ContratAgence/SelectRange?start=${start}&end=${stop}`,
      {
        headers: header,
      }
    );

  /**
   *
   * @param contratId
   * @returns
   */
  getContract = (contratId: number): Observable<ContratAgence> =>
    this.http.get<ContratAgence>(
      `${environment.apiUrl}ContratAgence/Select/${contratId}`,
      {
        headers: header,
      }
    );

  /**
   *
   * @param contrat
   * @returns
   */
  updateContract = (contrat: ContratAgence): Observable<Message> =>
    this.http.post<Message>(
      `${environment.apiUrl}ContratAgence/Update/${contrat.ContratId}`,
      contrat,
      {
        headers: header,
      }
    );

}
