import { Injectable } from '@angular/core';
import { Agence } from '@models/api/agency';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgencyStoreService {
  private _agency!: Agence;

  sessionAgency!: BehaviorSubject<Agence>;

  constructor() {
    this.sessionAgency = new BehaviorSubject(this._agency);
  }

  updateData = (agency: Agence) => (this._agency = agency);
}
