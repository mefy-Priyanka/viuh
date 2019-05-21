import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
/**********************COMPONENT************************** */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { SidenavComponent } from './sidenav/sidenav.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module'
// import { FleetComponent } from './dashboard/fleet/fleet.component';
import { ContractorComponent } from './dashboard/contractor/contractor.component';
// import { UserComponent } from './dashboard/user/user.component';
// import { OrderComponent } from './dashboard/order/order.component';
// import { ContractorcreateComponent } from './dashboard/contractorcreate/contractorcreate.component';
import { InviteComponent } from './dashboard/invite/invite.component';
// import { CreatecontractorComponent } from './createcontractor/createcontractor.component';
// import { CompanycreateComponent } from './dashboard/companycreate/companycreate.component';
// import { AccountComponent } from './dashboard/account/account.component';
import { RouterModule, Routes } from '@angular/router';
/*****************************SERVICE****************/
import { UserService } from './service/user.service';
import { SharedService } from './service/shared.service';
// import { JournalComponent } from './journal/journal.component';
// import { ContactlistComponent } from './contactlist/contactlist.component';
// import { ContactComponent } from './dashboard/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
 { path: 'login', component: LoginComponent }, 
//  { path: 'sidenav', component: SidenavComponent },

 { 
   path: 'dashboard',
   loadChildren: './dashboard/dashboard.module#DashboardModule'

}
 
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // SidenavComponent,
    // DashboardComponent,
    // FleetComponent,
    ContractorComponent,
    // UserComponent,
    // OrderComponent,
    // ContractorcreateComponent,
    InviteComponent,
    // JournalComponent,
    // ContactlistComponent,
    // ContactComponent,
    // AccountComponent,
    // CreatecontractorComponent,
    // CompanycreateComponent,

  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:'toast-top-right',
      preventDuplicates:true
    }) // ToastrModule added
  ],
  exports: [ RouterModule ],
  providers: [UserService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
