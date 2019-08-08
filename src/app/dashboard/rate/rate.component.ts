import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../service/company.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  contactlist: any=[];

  constructor(private formBuilder: FormBuilder, private SharedService: SharedService, private userService: UserService, private CompanyService: CompanyService, private toastr: ToastrService) { }

  ngOnInit() {
    this.customerList()
  }
  customerList() {
    let data={
      id:localStorage.getItem('SuperAdmin'),
      contact_type:'customer'
    }
    this.CompanyService.getcustomer(data).subscribe(data => {
     
      let result: any = {}
      result = data;
      this.contactlist = result.result
      console.log(this.contactlist);
    },
      error => {
        console.log(error);

      })
  }

}
