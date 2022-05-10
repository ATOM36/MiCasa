import { Component, OnInit } from '@angular/core';
import { ContratAgence } from '@models/api/contrat-agence';
import { AgencyContractService } from '@services/api/contracts/agency-contract.service';
import { Paginator } from 'primeng/paginator';
import { count, scan, tap } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  startIndex: number = 0;
  stopIndex: number = 10;
  recordsNumber = 0;
  isLoading!: boolean;
  contracts: ContratAgence[] = [];
  columns = ['ContratId', 'AgenceId', 'IsActive', 'DateCreation'];

  constructor(private _contratService: AgencyContractService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    this._contratService
      .getContracts(this.startIndex, this.stopIndex)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe(
        (response) => (this.contracts = this.contracts.concat(response.Data))
      );
    this.recordsNumber = this.contracts.length;
  }

  loadBackupData(stop: number): void {
    this.isLoading = true;

    this._contratService
      .getContracts(0, stop)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe(
        (response) => (this.contracts = this.contracts.concat(response.Data))
      );
    this.recordsNumber = this.contracts.length;
  }

  loadMore(event: Paginator): void {
    event.changePageToNext(() => {
      this.startIndex = this.stopIndex;
      this.stopIndex += 10;
      this.loadData();
    });
  }
}
