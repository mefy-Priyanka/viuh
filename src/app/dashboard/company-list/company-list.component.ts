import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { CompanyService } from '../../service/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  public listCompany:boolean=true;
  companyDetail: any;
  loader: boolean;
  constructor(private SharedService: SharedService,private CompanyService :CompanyService) { }

  ngOnInit() {
    this.getCompanyList();
  }
  companyCreate(){
    this.listCompany=false;
    this.SharedService.abc('companydetail');
  }
  getCompanyList(){
    this.loader=true;
    this.CompanyService.companyList(localStorage.getItem('userId')).subscribe(data=>{
    console.log(data)
    let result :any={}
    result=data;
    this.companyDetail=result.result
    console.log(this.companyDetail);
    this.loader=false;
    },
    error=>{
    console.log(error);
    this.loader=false;
    
    })
    }
}
