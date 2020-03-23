import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
const fin = window["fin"];;


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  title = 'findesk';

  columnDefs = [
    { field: 'athlete' },
    { field: 'country', hide: true },
    { field: 'sport', hide: true },
    { field: 'year', filter: 'number', filterParams: { newRowsAction: 'keep' } },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },

  ];
  defaultColDef: {
    filter: true,
    sortable: true
  };

  rowData: any;
  gridApi: any;
  gridColumnApi: any;

  constructor(private http: HttpClient) {

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


  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = '';
    var maxToShow = 5;
    selectedRows.forEach(function (selectedRow, index) {
      if (index >= maxToShow) {
        return;
      }
      if (index > 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    fin.desktop.InterApplicationBus.publish("order", selectedRowsString)
  }

  openExecutions = () => {
    fin.Window.create({
      url: "http://lvh.me:4200/details",
      name: "Executions",
      frame: true,
      autoShow: true,
      defaultWidth: 300,
      defaultHeight: 300
    });
  }



  openClientDetails = () => {
    fin.Window.create({
      url: "http://lvh.me:4200/details",
      name: "ClientDetails",
      frame: true,
      autoShow: true,
      defaultWidth: 300,
      defaultHeight: 300
    });
  }
}