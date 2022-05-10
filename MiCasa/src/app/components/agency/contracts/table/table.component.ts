import { Component, OnInit } from '@angular/core';
import { ContratClient } from '@models/api/contrat-client';
import { Store } from '@ngxs/store';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  contracts: ContratClient[] = [];

  columns: string[] = ['ContratId', 'ClientId', 'IsActive', 'DateCreation'];

  isLoading!: boolean;

  recordsNumber!: number;

  constructor(private _store: Store) {}

  ngOnInit(): void {}

  initState = () =>
    (this.contracts = this._store.selectSnapshot<ContratClient[]>(
      (state) => state.clientContracts
    ));

  loadMore = (event: Paginator) => null;
}
