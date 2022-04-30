import { Injectable } from '@angular/core';
import { Client } from '@models/api/client.model';
import { State } from '@ngxs/store';
import { ClientService } from '@services/api/client/client.service';

@State<Client>({
  name: 'client',
  defaults: undefined,
})
@Injectable({
  providedIn: 'root',
})
export class ClientState {
  constructor(private service: ClientService) {}
}
