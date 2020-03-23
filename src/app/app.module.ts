import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MasterComponent } from './master/master.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';
import { DetailsComponent } from './details/details.component';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: 'summary', component: MasterComponent },
  { path: 'details',      component: DetailsComponent },
  // { path: 'executions',      component: HeroDetailComponent },  
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent, MasterComponent, DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    NgbModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
