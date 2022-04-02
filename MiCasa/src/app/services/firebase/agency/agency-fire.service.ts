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
import { firstValueFrom, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgencyFireService {
  private agencyCollection!: Observable<Agence[]>;
  private agency!: Observable<Agence>;

  constructor(private _firestore: Firestore) {}

  /**
   * @summary Gets all related data to agencies registered in the system
   * @returns A sequence of agencies
   */
  getAllAgencies(): Observable<Agence[]> {
    const $data = collection(this._firestore, 'Agency');
    this.agencyCollection = collectionData($data, {
      idField: 'id',
    }) as Observable<Agence[]>;

    return this.agencyCollection;
  }

  /**
   * @summary Used by an agency to create a session
   * @param $email the agency's email
   * @param $password the agency's password
   * @returns All data related to a specific agency
   */
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
   * @summary Registers a new agency in the system
   * @param $agency A collection a data to insert into the database
   * @returns Generated data by `Firebase` for the given agency's instance
   */
  registerAgency($agency: Agence) {
    const $agencyCollectionRef = collection(this._firestore, 'Agency');
    return addDoc($agencyCollectionRef, $agency);
  }

  /**
   * @summary Deletes an agency's account
   * @param $agency A collection of data used to reference a given agency
   * @returns `Promise<void>` that can be used to display a message depending on the success
   * or failure of the opereation
   */
  delete($agency: Agence): Promise<void> {
    const $ref = doc(this._firestore, `Agency/${$agency.id}`);
    return deleteDoc($ref);
  }

  /**
   * @summary Updates `public` data related to a given agency.
   * @param $agency A collection of data that will be set as values for the specified agency
   * @returns `Promise<void>` that can be used to display a message depending on the success
   * or failure of the opereation
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
   * @summary Prevents an agency from performing operations
   * @param $id The `Firebase reference` of the agency
   * @returns `Promise<void>` that can be used to display a message depending on the success
   * or failure of the opereation
   */
  blockAgency($id: string) {
    const $ref = doc(this._firestore, `Agency/${$id}`);
    return updateDoc($ref, { IsBlocked: 1 });
  }

  /**
   * @summary Allows an agency to perform operations again
   * @param $id The `Firebase reference` of the agency
   * @returns `Promise<void>` that can be used to display a message depending on the success
   * or failure of the opereation
   */
  unblockAgency($id: string) {
    const $ref = doc(this._firestore, `Agency/${$id}`);
    return updateDoc($ref, { IsBlocked: 0 });
  }
}
