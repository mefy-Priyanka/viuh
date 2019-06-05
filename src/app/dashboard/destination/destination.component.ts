import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { SharedService } from '../../service/shared.service';
import { CompanyService } from '../../service/company.service';
@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destinationDetail=[];
  public destinationForm: FormGroup;
  constructor(private SharedService: SharedService,private formBuilder: FormBuilder, private CompanyService: CompanyService) { }

  ngOnInit() {
    this.saveForm();
  }
  saveForm(){
    this.CompanyService.destination(localStorage.getItem('SuperAdmin')).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.destinationDetail = result.result
      console.log(this.destinationDetail);
      // this.loader = false;
    },
      error => {
        console.log(error);
        // this.loader = false;

      })
  }


}
