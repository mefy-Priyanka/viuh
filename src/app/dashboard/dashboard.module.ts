import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes, RouterLink } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from 'angular2-text-mask';
import { DashboardComponent } from "./dashboard.component";
import { AccountComponent } from './account/account.component';
import { FleetComponent } from './fleet/fleet.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';
import { CompanycreateComponent } from './companycreate/companycreate.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
// import { ContactComponent } from '../dashboard/contact/contact.component';
import { MaprouteComponent } from './maproute/maproute.component';
import { ContractorListComponent } from './contractor-list/contractor-list.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { ContactlistComponent } from '../contactlist/contactlist.component';
import { JournalComponent } from '../journal/journal.component';
import { JournalistComponent } from './journalist/journalist.component';
import { ContactDriverComponent } from './contact-driver/contact-driver.component';
import { BankComponent } from './bank/bank.component';
import { ConsignmentComponent } from './consignment/consignment.component';
import { PeriodComponent } from './period/period.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ContactemployeeComponent } from './contactemployee/contactemployee.component';
import { ContactvendorComponent } from './contactvendor/contactvendor.component';
import { ContactcustomerComponent } from './contactcustomer/contactcustomer.component';
import { PaymentreceivedComponent } from './paymentreceived/paymentreceived.component';
import { BillComponent } from './bill/bill.component';
import { PaymentmadeComponent } from './paymentmade/paymentmade.component';
import { DestinationComponent } from './destination/destination.component';
import { WorkorderComponent } from './workorder/workorder.component';
import { PetrolformComponent } from './petrolform/petrolform.component';
import { TenderComponent } from './tender/tender.component';
import { BanktransferComponent } from './banktransfer/banktransfer.component';
import { CreatecontractorComponent } from './createcontractor/createcontractor.component';
import { MainComponent } from './main/main.component';
import { PaymentvoucherComponent } from './paymentvoucher/paymentvoucher.component';
import { JournalviewComponent } from './journalview/journalview.component';
import { FleetdetailComponent } from './fleetdetail/fleetdetail.component';
import { InvoiceviewComponent } from './invoiceview/invoiceview.component';
import { BilldetailComponent } from './billdetail/billdetail.component';
import { PaymentvoucherlistComponent } from './paymentvoucherlist/paymentvoucherlist.component';
// import { ExpenseComponent } from './expense/expense.component';
// import { EmployeeComponent } from './employee/employee.component';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';
import { Petrolform2Component } from './petrolform2/petrolform2.component';
import { ViewdriverComponent } from './viewdriver/viewdriver.component';
import { ViewcontractorComponent } from './viewcontractor/viewcontractor.component';
import { PetrolformviewComponent } from './petrolformview/petrolformview.component';
import { PetrolformvoucherlistComponent } from './petrolformvoucherlist/petrolformvoucherlist.component';
import { RateComponent } from './rate/rate.component';
import { CompanyeditComponent } from './companyedit/companyedit.component';

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children: [
            { path: "", redirectTo: "", pathMatch: "full" },
            { path: "account", component: AccountComponent },
            { path: "fleet", component: FleetComponent },
            { path: "user", component: UserComponent },
            { path: "order", component: OrderComponent },
            { path: "company", component: CompanycreateComponent },
            { path: "contact", component: CompanyListComponent },
            { path: "route", component: MaprouteComponent },
            { path: "expensses", component: InvoiceComponent },
            { path: "creatcontractor", component: CreatecontractorComponent },



        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        TextMaskModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AccountComponent,
        DashboardComponent,
        FleetComponent,
        UserComponent,
        CreatecontractorComponent,
        OrderComponent,
        CompanycreateComponent,
        // ContactComponent,
        InvoicelistComponent,
        SidenavComponent,
        MaprouteComponent,
        ContractorListComponent,
        CompanyListComponent,
        ContactlistComponent,
        JournalComponent,
        JournalistComponent,
        ContactDriverComponent,
        BankComponent,
        ConsignmentComponent,
        PeriodComponent,
        InvoiceComponent,
        ContactemployeeComponent,
        ContactvendorComponent,
        ContactcustomerComponent,
        PaymentreceivedComponent,
        BillComponent,
        PaymentmadeComponent,
        DestinationComponent,
        WorkorderComponent,
        PetrolformComponent,
        TenderComponent,
        BanktransferComponent,
        MainComponent,
        PaymentvoucherComponent,
        JournalviewComponent,
        FleetdetailComponent,
        InvoiceviewComponent,
        BilldetailComponent,
        PaymentvoucherlistComponent,
        Petrolform2Component,
        // ExpenseComponent,
        // EmployeeComponent
        ViewdriverComponent,
        ViewcontractorComponent,
        PetrolformviewComponent,
        PetrolformvoucherlistComponent,
        CompanyeditComponent,

    ]
})
export class DashboardModule { }
