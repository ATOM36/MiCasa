import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-ratio',
  templateUrl: './sales-ratio.component.html',
  styleUrls: ['./sales-ratio.component.scss'],
})
export class SalesRatioComponent implements OnInit {
  plotData: any;
  constructor() {}

  ngOnInit(): void {
    this.plotData = this.loadData();
  }

  loadData() {
    const res = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: 0.4,
          borderColor: '#42A5F5',
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: '#66BB6A',
        },
        {
          label: 'Third Dataset',
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: '#FFA726',
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)',
        },
      ],
    };

    return res;
  }
}
