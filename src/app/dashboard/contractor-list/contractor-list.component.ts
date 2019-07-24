import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { CompanyService } from '../../service/company.service';


@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit {
  public listContract: boolean = true;
  loader: boolean;
  contractorDetail: any;
  constructor(private SharedService: SharedService, private CompanyService: CompanyService) { }

  ngOnInit() {
    this.getContractorList();
  }

  contractCreate() {
    this.listContract = false;
    this.SharedService.abc('contractordetail');
  }
  getContractorList() {
    this.loader = true;
    this.CompanyService.contractorList(localStorage.getItem('userId')).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.contractorDetail = result.result
      console.log(this.contractorDetail);
      this.loader = false;
    },
      error => {
        console.log(error);
        this.loader = false;

      })
  }


  view(contractor){
    let data1={
      page:'journal',
      data:contractor
    }
    this.SharedService.datatravel(data1);

    this.SharedService.abc('viewcontractor');
  }

  delete(id){

    var result = confirm("Want to delete?");
    if (result) {
    this.CompanyService.deletecontractor(id).subscribe(result=>{
    console.log(result);
    this.getContractorList()
    },
    err=>{
      console.log(err)
    })}
  }
}
