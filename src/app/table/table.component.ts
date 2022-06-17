import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  getArray: any = [];

  constructor() {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.getArray = JSON.parse(localStorage.getItem('data')!);
    this.getArray.sort((a: any, b: any) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }
  delete(i: any) {
    for (i = 0; i < this.getArray.length; i++) {
      if (this.getArray[i]) {
        this.getArray.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('data', JSON.stringify(this.getArray));
  }
}
