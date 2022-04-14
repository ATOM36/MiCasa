import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Agence } from '@models/api/agency';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgenceSignalRService {
  public agencySubject: BehaviorSubject<Agence[]>;
  private agencies!: Agence[];
  public data: any;

  private hubConnection!: HubConnection;

  constructor() {
    this.agencySubject = new BehaviorSubject(this.agencies);
  }

  startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/chart')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.error(err));
  };

  addTransfertChartDataListener = () => {
    this.hubConnection.on('transfertchartdata', (data) => {
      this.data = data;
      console.log(data);
    });
  };
}
