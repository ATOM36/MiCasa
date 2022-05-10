import { Component, OnInit } from '@angular/core';
import { Client } from '@models/api/client.model';
import { Message } from '@models/api/message';
import { QueryData } from '@models/api/query-data';
import { ClientService } from '@services/api/client/client.service';
import { getSweetAlert } from '@utility/js-libraries';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { count, tap, map } from 'rxjs';

var Swal = getSweetAlert();

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [MessageService],
})
export class TableComponent implements OnInit {
  clients!: Client[];

  startIndex: number = 0;
  stopIndex: number = 10;
  recordsNumber!: number;

  isLoading: boolean = true;
  isSuccess: boolean = false;

  columns = [
    'ClientId',
    'Compte.Nom',
    'Compte.Mail',
    'Compte.NumeroTelephone',
    'Compte.DateInscription',
    'Compte.IsBlocked',
  ];

  constructor(
    private service: ClientService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  loadData = () =>
    this.service
      .getClients(this.startIndex, this.stopIndex)
      .pipe(
        tap((data) => (this.isSuccess = data.State)),
        tap((data) => (this.isLoading = false)),

        tap(() => (this.recordsNumber = this.clients?.length))
      )
      .subscribe((response) => {
        if (this.isSuccess) this.clients = response.Data as Client[];
      });

  loadMoreData = (event: Paginator) => null;

  displayErrorMessage = (message: string) =>
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      html: `<p>${message}</p>`,
    });
}
