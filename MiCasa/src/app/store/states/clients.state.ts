import { Injectable } from '@angular/core';
import { Client } from '@models/api/client.model';
import { State } from '@ngxs/store';
import { ClientService } from '@services/api/client/client.service';

@State<Client[]>({
  name: 'clients',
  defaults: [],
})
@Injectable({
  providedIn: 'root',
})
export class ClientsState {
  constructor(private service: ClientService) {}
}
