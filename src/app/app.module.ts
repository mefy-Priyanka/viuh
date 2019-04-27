import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
/**********************COMPONENT************************** */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FleetComponent } from './dashboard/fleet/fleet.component';
import { ContractorComponent } from './dashboard/contractor/contractor.component';
import { UserComponent } from './dashboard/user/user.component';
import { OrderComponent } from './dashboard/order/order.component';
import { ContractorcreateComponent } from './dashboard/contractorcreate/contractorcreate.component';
import { InviteComponent } from './dashboard/invite/invite.component';
/*****************************SERVICE****************/
import { UserService } from './service/user.service';
import { SharedService } from './service/shared.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    DashboardComponent,
    FleetComponent,
    ContractorComponent,
    UserComponent,
    OrderComponent,
    ContractorcreateComponent,
    InviteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
