import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Agence } from '@models/api/agency';
import {
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  where,
  orderBy,
} from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { filter, firstValueFrom, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgencyFireService {
  private agencyCollection!: Observable<Agence[]>;
  private agency!: Observable<Agence>;

  constructor(private _firestore: Firestore) {}

  /**
   *
   * @returns
   */
  getAllAgencies(): Observable<Agence[]> {
    const $data = collection(this._firestore, 'Agency');
    this.agencyCollection = collectionData($data, {
      idField: 'id',
    }) as Observable<Agence[]>;

    return this.agencyCollection;
  }

  logIn($email: string, $password: string): Observable<Agence> {
    // Retrieving the whole agency collection
    const $ref = collection(this._firestore, 'Agency');
    const $data = collectionData($ref, {
      idField: 'id',
    }) as Observable<Agence[]>;
    let $result: any;

    // Filtering the array to find corresponding agency
    firstValueFrom($data).then(($response) => {
      $result = $response.find(
        ($agency) => $agency.Mail === $email && $agency.Password === $password
      );
    });

    return $result as Observable<Agence>;
  }

  /**
   *
   * @param $agency
   * @returns
   */
  registerAgency($agency: Agence) {
    const $agencyCollectionRef = collection(this._firestore, 'Agency');
    return addDoc($agencyCollectionRef, $agency);
  }

  /**
   *
   * @param $agency
   * @returns
   */
  delete($agency: Agence) {
    const $ref = doc(this._firestore, `Agency/${$agency.id}`);
    return deleteDoc($ref);
  }

  /**
   *
   * @param $agency
   * @returns
   */
  update($agency: Agence) {
    const $ref = doc(this._firestore, `Agency/${$agency.id}`);
    return updateDoc($ref, {
      Nom: $agency.Nom,
      Mail: $agency.Mail,
      NumeroTelephone: $agency.NumeroTelephone,
      Latitude: $agency.Latitude,
      Longitude: $agency.Longitude,
      Adresse: $agency.Adresse,
    });
  }

  /**
   *
   * @param $id
   * @returns
   */
  blockAgency($id: string) {
    const $ref = doc(this._firestore, `Agency/${$id}`);
    return updateDoc($ref, { IsBlocked: 1 });
  }

  /**
   *
   * @param $id
   * @returns
   */
  unblockAgency($id: string) {
    const $ref = doc(this._firestore, `Agency/${$id}`);
    return updateDoc($ref, { IsBlocked: 0 });
  }
}
