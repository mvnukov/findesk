import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

const fin = window["fin"];;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  title = 'findesk';

  columnDefs = [
    {field: 'athlete'},
    {field: 'country',  hide: true},
    {field: 'sport', hide: true},
    {field: 'year', filter: 'number', filterParams: {newRowsAction: 'keep'}},
    {field: 'gold', aggFunc: 'sum'},
    {field: 'silver', aggFunc: 'sum'},
    {field: 'bronze', aggFunc: 'sum'},

  ];
  defaultColDef: {
    filter: true,
    sortable: true
  };

  rowData: any;
  gridApi: any;
  gridColumnApi: any;
  received: any;

  constructor(private http: HttpClient, private ref: ChangeDetectorRef) {

  }

  onGridReady(params) {
    console.log("Grid Ready");
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      getRows(params) {
        console.log(JSON.stringify(params.request, null, 1));

        fetch('http://lvh.me:4000/olympicWinners/', {
          method: "post",
          body: JSON.stringify(params.request),
          headers: { "Content-Type": "application/json; charset=utf-8" }
        })
          .then(httpResponse => httpResponse.json())
          .then(response => {
            params.successCallback(response.rows, response.lastRow);
          })
          .catch(error => {
            console.error(error);
            params.failCallback();
          })
      }
    };

    this.gridApi.setServerSideDatasource(datasource);

    fin.desktop.InterApplicationBus.subscribe("*", "order", (message, uuid, name) => {
      this.received = message;
      this.ref.detectChanges();
  });

  }



}