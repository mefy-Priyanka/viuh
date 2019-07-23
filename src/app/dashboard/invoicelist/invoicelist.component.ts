import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { UserService } from 'src/app/service/user.service';
import { CompanyService } from 'src/app/service/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.css']
})
export class InvoicelistComponent implements OnInit {
  invoicelists: any;
  amount = 0;
  description = '';
  id: any;
  userdata:any;
  firstaccountid: any;
  constructor(private userService: UserService,  private SharedService :SharedService, private companyService: CompanyService,private toastr: ToastrService,) { }

  ngOnInit() {
    this.invoicelist();
  }


  invoicelist() {
    console.log(localStorage.getItem('SuperAdmin'))
    this.companyService.getinvoice(localStorage.getItem('SuperAdmin')).subscribe(data => {

      let result: any = {}
      result = data;
      this.invoicelists = result.result
      console.log(this.invoicelists);
    },
      error => {
        console.log(error);

      })
  }
  add(){
    this.SharedService.abc('invoice')
  }
  view(invoice){
    let data1={
      page:'journal',
      data:invoice
    }
    this.SharedService.datatravel(data1);

    this.SharedService.abc('invoiceview');
  }
}

