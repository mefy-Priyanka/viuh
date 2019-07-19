import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { UserService } from 'src/app/service/user.service';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-paymentvoucherlist',
  templateUrl: './paymentvoucherlist.component.html',
  styleUrls: ['./paymentvoucherlist.component.css']
})
export class PaymentvoucherlistComponent implements OnInit {


  voucherlist:any=[];
  constructor(private SharedService: SharedService,private userService: UserService,  private companyService: CompanyService,) {
  
  }

  ngOnInit() {
    this.getvoucherlist()
  }

  getvoucherlist(){
    console.log(localStorage.getItem('SuperAdmin'))
    this.companyService.getpayvoucher(localStorage.getItem('SuperAdmin')).subscribe(data => {

      let result: any = {}
      result = data;
      this.voucherlist = result.result
      console.log(this.voucherlist);
    },
      error => {
        console.log(error);

      })
  }
  add(){
    this.SharedService.abc('paymentvoucher')
  }
}
