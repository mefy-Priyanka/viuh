import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FleetComponent } from './dashboard/fleet/fleet.component';
import { ContractorComponent } from './contractor/contractor.component';
import { ContractorcreateComponent } from './contractorcreate/contractorcreate.component';
import { ContractoruserComponent } from './contractoruser/contractoruser.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './dashboard/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    DashboardComponent,
    FleetComponent,
    ContractorComponent,
    ContractorcreateComponent,
    ContractoruserComponent,
    UserComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
