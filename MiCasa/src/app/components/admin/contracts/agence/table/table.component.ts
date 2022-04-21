import { Component, OnInit } from '@angular/core';
import { ContratAgence } from '@models/api/contrat-agence';
import { AgencyContractService } from '@services/api/contracts/agency-contract.service';
import { Paginator } from 'primeng/paginator';
import { debounceTime, Subscription, tap, timeout } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  contracts: ContratAgence[] = [];
  startIndex: number = 0;
  stopIndex: number = 10;
  isLoading!: boolean;

  constructor(private _contratService: AgencyContractService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData = (): void => {
    this.isLoading = true;

    this._contratService
      .getContracts(this.startIndex, this.stopIndex)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((response$) => {
        this.contracts.concat(this.contracts, response$);
      });
  };

  loadMore(event: Paginator): void {
    event.changePageToNext(() => {
      this.startIndex = this.stopIndex;
      this.stopIndex += 10;
      this.loadData();
    });
  }
}
